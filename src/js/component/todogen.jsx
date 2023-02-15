import React, { useState, useEffect } from "react";

const ToDoGen = () => {
	const defaultVal = [{label: "sample task - delete me", done: false, id: 0}]

	const [itemList, setItemList] = useState([defaultVal]) //holds values for list entries
	const [value, setValue] = useState('') //clears text field on submit
	const [vis, setVis] = useState({id: null}) //visibility check for delete button
	
	const apiURL = 'https://assets.breatheco.de/apis/fake/todos/user/romanconstantin1'
	const fetchAPI = (props) => {
		fetch(apiURL, {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(props)
			})
	}

	useEffect(() => { //initialize new list if no list exists
		fetch(apiURL, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: "[]"
		})
	}, []);

	useEffect(() => { //update itemList state w/ backend data
		fetch(apiURL)
		.then(list => list.json())
		.then(data => {if (data === null) setItemList(defaultVal); else {
			const newList = data.map((a, index) => {
				return {...a, id: index}})
			setItemList(newList)}})
	}, []);

	const addEntry = (newEntry) => {
		const newList = [...itemList, {id: itemList.length, label: newEntry, done: false}]
		setItemList(newList)
		fetchAPI(newList)
	}

	const removeEntry = (entryId) => {
		const newList = itemList.map(a => ({...a})) //make shallow copy of the list of entries
		newList.splice((newList.findIndex(x => x.id === entryId)), 1) //remove entry according to id
		const resetList = newList.map((a, index) => {return {...a, id: index}}) //resets entry id on individual item delete
		setItemList(resetList)
		if (resetList.length == 0) {
			fetchAPI(defaultVal)
		} else {
		fetchAPI(resetList)
		}
	}
	
	const valueChange = (event) => { //controlled input
		setValue(event.target.value)
	}
	
	const clearList = () => { //reinitialize list w/ delete all tasks button
		setItemList([])
		fetch(apiURL, {
			headers: {"Content-Type": "application/json"},
			method: "DELETE"
		})
		.then(() => fetch(apiURL, {
			headers: {"Content-Type": "application/json"},
			method: "POST",
			body: "[]"
		}))
		.then(() => {alert("successfully cleared list!")})
		.then(() => fetchAPI(defaultVal))
		// 3 fetch calls in a row is a lot, right?
	}

	const taskCounter = () => {
		let mult = "s"
		let tasksLeft = "no"
		let yay = "- hooray!"
		if (itemList.length == 1) {tasksLeft = 1; mult = ""; yay = ""}
		if (itemList.length > 1) {tasksLeft = itemList.length; mult = "s"; yay = ""}

		return <li key="counter" className="list-group-item w-100">
			<small><strong>{tasksLeft}</strong> task{mult} left <strong>{yay}</strong></small>
		</li>
	}

	return (
		<div className="row justify-content-center">
			<div className="col-4">
			<h1 className="mt-5 text-center">minimalist to-do list</h1>
			<ul className="shadow d-flex list-group align-text-cente mt-3">
				<input 
					type="text"
					value={value} 
					className="list-group-item input-group"
					placeholder="What do I need to do today?"
					onChange={(event) => valueChange(event)} //continuously passes entry to a separate placeholder state
					onKeyUp={(event) => {
						if (event.key === "Enter" && event.target.value !== "") { // checks that the user has actually entered something
							addEntry(event.target.value)
							setValue('') //reset entry field to blank
						}
					}}
				/>
				{itemList.map(entry => 
					<li key={entry.id} 
					className="list-group-item d-flex w-100 justify-content-between"
					onMouseOver={() => setVis({id:(entry.id)})} //passes the entry id to the visibility check state
					onMouseLeave={() => setVis({id:null})} //reset visibility check state
					> 
					<strong><h5>{entry.label}</h5></strong>
					{entry.id === vis.id && ( //button will only exist when the visibility state & list entry id match
					<button key={entry.id} type="button" className="bg-transparent border-0"  style={{color: "#E22626"}} 
					onClick={() => {removeEntry(entry.id)}}><strong>delete</strong></button>)}
					</li>)}
				{taskCounter()}
				<li key="delete all" className="list-group-item w-100 text-center">
					<button key="delete all button" className="bg-transparent border-0" style={{color: "#E22626"}} //delete all tasks button
					onClick={() => {
						if (itemList.length != 0 && confirm("delete all tasks - are you sure?")) {clearList()}	
						else {alert("no tasks to delete!")}}}>
						<strong>delete all tasks</strong>
					</button>
				</li>
			</ul>
			</div>
		</div>
	);
};



export default ToDoGen;
