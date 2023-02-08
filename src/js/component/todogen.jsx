import React, { useState, useEffect } from "react";

let itemList = []

const ToDoGen = () => {

	const [text, inputText] = useState("")
	const [key, newKey] = useState(0)


	const inputVal = (event) => {
		if (event.key === "Enter") {
			let newEntry = <li key={key} className="list-group-item d-flex w-100 justify-content-between">
				{event.target.value}
				<span type="button">X</span>
				</li>	
			if (event.target.value != "") {
				console.log(key)
				itemList.push(newEntry)
				inputText(event.target.value)
				newKey(key+1)
		}
		}
	}

	const listGen = () => {
		let newItem = []
		if (itemList.length == 0) return null
		else {
			for (let i=0; i<= itemList.length-1; i++) {newItem.push(itemList[i])}
		}
		return newItem
	}

	return (
		<div className="row justify-content-center">
			<div className="col-4">
			<h1 className="mt-5 text-center">todo list</h1>
			<ul className="shadow list-group mt-3">
				<input 
					type="text" 
					className="list-group-item input-group" 
					placeholder="What do you need to do today?"
					onKeyUp={(event) => {inputVal(event)}}
				/>
				{listGen()}
			</ul>
			</div>
		</div>
	);
};

export default ToDoGen;
