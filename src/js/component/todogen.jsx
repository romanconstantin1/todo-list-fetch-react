import React, { useState, useEffect } from "react";

const ToDoGen = () => {
	const defaultVal = [{id: 0, label: "sample item - delete me", done: false}]

	const [itemList, setItemList] = useState([defaultVal]) //holds values for list entries
	const [value, setValue] = useState('') //clears text field on submit
	const [vis, setVis] = useState({id: null}) //visibility check for delete button
	const apiURL = 'https://assets.breatheco.de/apis/fake/todos/user/romanconstantin1'

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
				console.log(a, index)
				return {...a, id: index}})
			setItemList(newList)}})
	}, []);

	const removeItem = (entryId) => {
		let newList = itemList.map(a => ({...a})) //make shallow copy of the list of entries
		newList.splice((newList.findIndex(x => x.id === entryId)), 1) //remove entry according to id
		setItemList(newList)
	}
	
	const valueChange = (event) => {
		setValue(event.target.value)
	}

	useEffect(() => { //update backend on new item list
		let updater;
		if (itemList.length == 0) {updater = defaultVal
		} else {updater = itemList}
		fetch(apiURL, {
		method: "PUT",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(updater)
		})
		.then(res => res.json())
		.then(data => console.log(data))
	}, [itemList])
	
	const clearList = () => { //reinitialize list w/ delete all tasks button
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
		.then(() => setItemList([]))
	}

	const taskCounter = () => {
		let mult = "s"
		let tasksLeft = "no"
		let yay = "- hooray!"
		if (itemList.length == 1) {tasksLeft = 1; mult = ""; yay = ""}
		if (itemList.length > 1) {tasksLeft = itemList.length; mult = "s"; yay = ""}

		return <li className="list-group-item w-100">
			<small><strong>{tasksLeft}</strong> task{mult} left <strong>{yay}</strong></small>
		</li>
	}

	return (
		<div className="row justify-content-center">
			<div className="col-4">
			<h1 className="mt-5 text-center">minimalist to-do list</h1>
			<ul className="shadow d-flex list-group mt-3">
				<input 
					type="text"
					value={value} 
					className="list-group-item input-group"
					placeholder="What do I need to do today?"
					onChange={(event) => valueChange(event)} //continuously passes entry to a separate placeholder state
					onKeyUp={(event) => {
						if (event.key === "Enter" && event.target.value !== "") { // checks that the user has actually entered something
							setItemList([...itemList, {id: itemList.length, label: event.target.value, done: false}]); //id is used as a key in the list item as well
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
					<strong>{entry.label}</strong>
					{entry.id === vis.id && ( //button will only exist when the visibility state & list entry id match
					<span type="button" style={{color: "#E22626"}} 
					onClick={() => {removeItem(entry.id)}}><strong>delete</strong></span>)}
					</li>)}
				{taskCounter()}
				<li className="list-group-item w-100 text-center">
					<button className="bg-transparent border-0" style={{color: "#E22626"}} //delete all tasks button
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
