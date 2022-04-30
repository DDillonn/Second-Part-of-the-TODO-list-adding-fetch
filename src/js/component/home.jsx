import React from "react";
import { useState, useEffect } from "react";

export function Home() {
	const [todoList, setTodoList] = useState([]);
	const [isShown, setIsShown] = useState({
		state: false,
		index: 0
	});

	const APIURL = "https://assets.breatheco.de/apis/fake/todos/user/DDillonn";

	const getSampleTask = () => {
		fetch(APIURL)
			.then(resp => resp.json())
			.then(newTodo => setTodoList(newTodo))
			.then(resp => console.log(resp));
	};

	const updateAPI = () => {
		fetch(APIURL, {
			method: "PUT",
			body: JSON.stringify([
				{ label: "Make the bed", done: false },
				{ label: "Walk the dog", done: false },
				{ label: "Do the replits", done: false }
			]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(response => console.log(response));
	};

	useEffect(() => {
		getSampleTask();
		updateAPI();
	}, []);

	const todo = todoList.map((item, i) => {
		return (
			<div className="repeating" key={i}>
				<li
					onMouseEnter={() => setIsShown({ state: true, index: i })}
					onMouseLeave={() => setIsShown({ state: false, index: 0 })}>
					{item.label}

					{isShown.state === true && isShown.index === i ? (
						<button onClick={() => removeItem(i)}>X</button>
					) : (
						""
					)}
				</li>
			</div>
		);
	});

	const removeItem = index => {
		const newArray = todoList.filter((item, i) => i != index);
		setTodoList(newArray);
	};

	const newTodo = onKeyDownEvent => {
		if (onKeyDownEvent.keyCode === 13) {
			let userInput = onKeyDownEvent.target.value;
			const newTodo = [...todoList, { label: userInput, done: false }];
			setTodoList(newTodo);
			onKeyDownEvent.target.value = [];
		}
	};

	return (
		<div className="box">
			<h1 className="text-center">todos</h1>
			<input
				onKeyDown={newTodo}
				type="text"
				id="fname"
				placeholder="What needs to be done?"
				name="fname"></input>
			<div>
				<ul>{todo}</ul>
				<div>
					<ul className="counter">{todo.length} item left</ul>
				</div>
			</div>
		</div>
	);
}
