import React, { useState, useEffect } from "react";
import { render } from "react-dom/cjs/react-dom.production.min";

let key = 0

const ToDoGen = () => {

	const [itemList, setItemList] = useState([]) //holds values for list entries
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
		.then(data => setItemList(data))
	}, []);

	const removeItem = (entryId) => {
		let newList = itemList.map(a => ({...a})) //make shallow copy of the list of entried
		newList.splice((newList.findIndex(x => x.id === entryId)), 1) //remove entry according to id
		setItemList(newList)
	}
	
	const valueChange = (event) => {
		setValue(event.target.value)
	}

	useEffect(() => { //update backend on new item list
		fetch(apiURL, {
		method: "PUT",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(itemList)
		})
		.then(res => res.json())
		.then(data => console.log(data))
	}, [itemList])
	
	const clearList = () => { //reinitialize list w/ delete all tasks button
		fetch(apiURL, {
			headers: {"Content-Type": "application/json"},
			method: "DELETE"
		})
		fetch(apiURL, {
			headers: {"Content-Type": "application/json"},
			method: "POST",
			body: "[]"
		})
	}

	const taskCounter = () => {
		let mult = "s"
		let tasksLeft = "no"
		let yay = "- hooray!"

		if (itemList.length == 1) {tasksLeft = 1; mult = ""; yay = ""}
		if (itemList.length > 1) {tasksLeft = itemList.length; mult = "s"; yay = ""}

		return <li className="list-group-item w-100">
			<small>{tasksLeft} task{mult} left {yay}</small>
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
							setItemList([...itemList, { label: event.target.value, done: false, id: key++}]); //id is used as a key in the list item as well
							setValue('') //reset entry field to blank
						}
					}}
				/>
				{itemList.map(entry => 
					<li key={entry.id} 
					className="list-group-item d-flex w-100 align-middle justify-content-between"
					onMouseOver={() => setVis({id:(entry.id)})} //passes the entry id to the visibility check state
					onMouseLeave={() => setVis({id:null})} //reset visibility check state
					> 
					<b>{entry.label}</b>
					{entry.id === vis.id && ( //button will only exist when the visibility state & list entry id match
					<span type="button" style={{color: "#E22626"}} onClick={() => {removeItem(entry.id)}}>delete</span>)}
					</li>)}
				{taskCounter()}
				<li className="list-group-item w-100 text-center">
					<b type="button" style={{color: "#E22626"}} //delete all tasks button
					onClick={() => {
						if (itemList.length != 0 && confirm("delete all tasks - are you sure?")) {setItemList([]), clearList()}	
						else {alert("no tasks to delete!")}						
					}}>
						delete all tasks</b>
				</li>
			</ul>
			</div>
		</div>
	);
};



export default ToDoGen;
