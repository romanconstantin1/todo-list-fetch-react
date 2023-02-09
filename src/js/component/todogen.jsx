import React, { useState, useEffect } from "react";
import { render } from "react-dom/cjs/react-dom.production.min";

let key = 0

const ToDoGen = () => {

	const [listOfEntries, setItemList] = useState([])

	const removeEntry = (entryId) => {
		let newList = listOfEntries.map(a => ({...a}))
		newList.splice((newList.findIndex(x => x.id === entryId)), 1)
		setItemList(newList)
	} 

	return (
		<div className="row justify-content-center">
			<div className="col-4">
			<h1 className="mt-5 text-center">minimalist todo list</h1>
			<ul className="shadow list-group mt-3">
				<input 
					type="text" 
					className="list-group-item input-group" 
					placeholder="What do you need to do today?"
					onKeyUp={(event) => {
						if (event.key === "Enter" && event.target.value !== "") {
							setItemList([...listOfEntries, { id: key++, listItem: event.target.value }])
						}
					}}
				/>
				{listOfEntries.map(entry => 
					<li key={entry.id} className="list-group-item d-flex w-100 justify-content-between">
					{entry.listItem}
					<span type="button" onClick={() => {removeEntry(entry.id)}}>X</span>
					</li>)}
			</ul>
			</div>
		</div>
	);
};

export default ToDoGen;
