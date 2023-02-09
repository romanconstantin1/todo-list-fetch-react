import React, { useState, useEffect } from "react";
import { render } from "react-dom/cjs/react-dom.production.min";

let key = 0

const ToDoGen = () => {

	const [listOfEntries, setItemList] = useState([])

	return (
		<div className="row justify-content-center">
			<div className="col-4">
			<h1 className="mt-5 text-center">todo list</h1>
			<ul className="shadow list-group mt-3">
				<input 
					type="text" 
					className="list-group-item input-group" 
					placeholder="What else do you need to do today?"
					onKeyUp={(event) => {
						if (event.key === "Enter" && event.target.value !== "") {
							setItemList([...listOfEntries, { id: key++, entry: event.target.value }])
						}
					}}
				/>
				{listOfEntries.map(entry => 
					<li key={entry.id} className="list-group-item d-flex w-100 justify-content-between">
					{entry.entry}
					<span type="button">X</span>
					</li>)}
			</ul>
			</div>
		</div>
	);
};

export default ToDoGen;
