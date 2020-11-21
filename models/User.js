/** @format */

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
		required: true,
		unique: true,
	},
	legalIssue: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	timezone: {
		type: String,
	},
	apptOne: {
		type: String,
		required: true,
	},
	apptTwo: {
		type: String,
		required: true,
	},
	apptThree: {
		type: String,
		required: true,
	},

	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model("user", UserSchema);
