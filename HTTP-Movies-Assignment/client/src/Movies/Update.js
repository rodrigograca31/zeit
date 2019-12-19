import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

export default function Update() {
	const [form, setForm] = useState({
		id: null,
		title: "",
		director: "",
		metascore: 0,
		stars: []
	});

	let { id } = useParams();
	let history = useHistory();

	useEffect(() => {
		console.log("use effect");

		fetchMovie(id);
	}, []);

	const fetchMovie = id => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then(res => {
				console.log(res.data);
				setForm(res.data);
			})
			.catch(err => console.log(err.response));
	};

	const submit = e => {
		e.preventDefault();
		console.log(
			...(Array.isArray(form.stars) === true
				? form.stars
				: form.stars.split(","))
		);

		axios
			.put(`http://localhost:5000/api/movies/${id}`, {
				...form,
				stars: [
					...(Array.isArray(form.stars) === true
						? form.stars
						: form.stars.split(","))
				]
			})
			.then(response => {
				history.push("/");
				console.log(response);
			})
			.catch(response => {
				console.log(response);
			});
	};

	const handleChange = e => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};
	return (
		<>
			{/* {JSON.stringify(form)} */}
			<form action="" onSubmit={submit}>
				<TextField
					label="Title"
					name="title"
					value={form.title}
					onChange={handleChange}
					variant="outlined"
				/>
				<br />
				<br />
				<TextField
					label="Director"
					name="director"
					value={form.director}
					onChange={handleChange}
					variant="outlined"
				/>
				<br />
				<br />
				<TextField
					label="Metascore"
					name="metascore"
					value={form.metascore}
					onChange={handleChange}
					variant="outlined"
					type="number"
				/>
				<br />
				<br />
				<TextField
					label="Stars"
					name="stars"
					value={form.stars}
					onChange={handleChange}
					variant="outlined"
					multiline
				/>
				<br />
				<br />
				<Button variant="contained" color="secondary" onClick={submit}>
					Submit
				</Button>
			</form>
		</>
	);
}
