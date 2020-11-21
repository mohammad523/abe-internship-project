/** @format */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");

const User = require("../../models/User");

//@route   POST api/users
//@desc    register users
//@access  Public

router.post(
	"/",
	[
		// these functions use express validator to check if the info is valid
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check("phone", "Please enter a phone number"),
		check("legalIssue", "please enter a legalIssue"),
		check("apptOne", "Please enter at least one appointment time"),
		check(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({ min: 6 }),
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// 400 means bad request
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			name,
			email,
			phone,
			legalIssue,
			timezone,
			apptOne,
			apptTwo,
			apptThree,
			password,
		} = req.body;

		try {
			// see if user exists
			let user = await User.findOne({ email });
			if (user) {
				res.status(400).json({ errors: [{ msg: "user already exists" }] });
			}

			user = new User({
				name,
				email,
				phone,
				legalIssue,
				timezone,
				apptOne,
				apptTwo,
				apptThree,
				password,
			});
			// encrypt password

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();
			// return json web token

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
			res.send("user registered");
		} catch (error) {
			console.error(error.message);
			res.status(500).send("server error");
		}
	}
);

module.exports = router;
