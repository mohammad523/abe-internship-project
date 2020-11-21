/** @format */

import { useState } from "react";
import "./App.css";
import axios from "axios";

const App = ({}) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		legalIssue: "",
		timezone: "",
		apptOne: "",
		apptTwo: "",
		apptThree: "",
		password: "",
		password2: "",
	});

	const register = (formData) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const body = JSON.stringify(formData);

		try {
			const res = axios.post(`http://localhost:5000/api/users`, body, config);
		} catch (err) {
			alert("error");
		}
	};

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
		password2,
	} = formData;

	const onChange = (e) => {
		// console.log("event.target.name", e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			alert("Passwords do not match");
			console.log("passwords do not match");
		} else {
			register({
				name,
				email,
				phone,
				legalIssue,
				timezone,
				apptOne,
				apptTwo,
				apptThree,
				password,
				password2,
			});
		}
	};
	return (
		<div className='widget-inner'>
			<h1
				style={{ fontWeight: 10, fontSize: "55px", color: "black" }}
				className='large text-primary'
			>
				Abe.legal
			</h1>

			<div className='widget'>
				<h2 className='lead'>Create Your Account</h2>
				<form className='form' onSubmit={(e) => onSubmit(e)}>
					<div className='form-group'>
						<input
							className='text-field'
							type='text'
							placeholder='Name'
							name='name'
							value={name}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className='form-group'>
						<input
							className='text-field'
							type='email'
							placeholder='Email Address'
							value={email}
							name='email'
							onChange={(e) => onChange(e)}
						/>

						<small className='form-text'></small>
					</div>
					<div className='form-group'>
						<input
							className='text-field'
							type='phone'
							placeholder='Phone Number'
							value={phone}
							name='phone'
							onChange={(e) => onChange(e)}
						/>

						<small className='form-text'></small>
					</div>
					<div className='form-group'>
						<input
							className='text-field'
							type='legalIssue'
							placeholder='Legal Issue'
							value={legalIssue}
							name='legalIssue'
							onChange={(e) => onChange(e)}
						/>
					</div>
					<br />
					<div>
						<h4>Please choose your time zone</h4>
						<br />
						<select
							name='timezone_offset'
							id='timezone-offset'
							class='span5'
							value={timezone}
						>
							<option value='-09:00'>(GMT -09:00) Alaska AKST</option>
							<option value='-08:00'>(GMT -08:00) Los Angeles PST</option>
							<option value='-07:00'>(GMT -07:00) Salt Lake City MST</option>
							<option value='-06:00'>(GMT -06:00) Chicago CST</option>
							<option value='-05:00'>(GMT -05:00) New York EST</option>
							...
						</select>
						<h5>Choose 3 possible dates for a meeting</h5>
						<input
							className='text-field'
							type='datetime-local'
							placeholder='First Appointment Time'
							name='apptOne'
							value={apptOne}
							onChange={(e) => onChange(e)}
						/>
					</div>

					<div>
						<input
							className='text-field'
							type='datetime-local'
							placeholder='Second Appointment Time'
							name='apptTwo'
							value={apptTwo}
							onChange={(e) => onChange(e)}
						/>
					</div>

					<div className='form-group'>
						<input
							className='text-field'
							type='datetime-local'
							placeholder='Third Appointment Time'
							name='apptThree'
							value={apptThree}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<br />

					<div className='form-group'>
						<input
							className='text-field'
							type='password'
							placeholder='Password'
							name='password'
							value={password}
							onChange={(e) => onChange(e)}
						/>
					</div>

					<div className='form-group'>
						<input
							className='text-field'
							type='password'
							placeholder='Confirm Password'
							name='password2'
							value={password2}
							onChange={(e) => onChange(e)}
						/>
					</div>

					<input
						style={{ width: "90%" }}
						type='submit'
						className='btn '
						value='Register'
					/>
				</form>
			</div>
		</div>
	);
};

export default App;
