import React from "react";

const listItemGen = () => { 
	return (
		<li className="list-group-item d-flex w-100 justify-content-between">
			list item 1
			<span type="button">X</span>
		</li>
	)}


const ToDoGen = () => {
	return (
		<div className="row justify-content-center">
			<div className="col-4">
			<h1 className="mt-5 text-center">todo list</h1>
			<ul className="shadow list-group mt-3">
				{listItemGen()}
				{listItemGen()}
				{listItemGen()}
				{listItemGen()}
				{listItemGen()}
				{listItemGen()}
			</ul>
			</div>
		</div>
	);
};

export default ToDoGen;
