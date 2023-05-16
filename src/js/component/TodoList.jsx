import React, { useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";
//import { Context } from "../store/appContext.js";

//create your first component
export const TodoList = () => {
	//const { store, actions } = useContext(Context);
	const [inputValue, setInputValue] = useState('');
	const [tasks, setTasks] = useState([]);
	const [existList, setexistList] = useState(false);
	const [taskCount, setTaskCount] = useState(0);

	useEffect(() => {
		createList();
	}, []);

	useEffect(() => {
		loadTasks();
	}, [existList]);

	const createList = () => {
		try {
			let restAux = fetch("http://assets.breatheco.de/apis/fake/todos/user/rjmore", {
				method: 'POST', 
				body: JSON.stringify({}),
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			}).then( res => res.json()).then( response => {
				console.log(response);
			}).catch(error => console.error(error));
			setexistList(true);
		} catch (err) {
			console.log('Looks like there was a problem: \n', err);
		}
	};

	const sleep = ms => new Promise(r => setTimeout(r, ms));

	const loadTasks = async () => {
		try {
			let count = 0;
			let newTask = null;
			let auxListTask = [];
			let resp = await fetch("http://assets.breatheco.de/apis/fake/todos/user/rjmore", {
				method: 'GET', 
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			});
			if (await resp == null) return;
			let data = await resp.json();
			if (data.length > 0) {
				data.map( x => (
					newTask = {
						id: Date.now(),
						label: x.label,
						done: false
					},
					auxListTask = [...auxListTask, newTask],
					count = count + 1,
					setTaskCount(count),
					sleep(1)
				));
				setTasks([...tasks, ...auxListTask]);
			}
			else
			{
				console.log('List Empty');
			}
			
		} catch (err) {

			console.log('Looks like there was a problem: \n', err);
		}
	};

	const AddTask = (event) => {
		if (event.keyCode != 13) {
			return;
		}
		if (inputValue == "") {
			return;
		}
		event.preventDefault();
		const newTask = {
			id: Date.now(),
			label: inputValue,
			done: false
		};

		let restAux = fetch("http://assets.breatheco.de/apis/fake/todos/user/rjmore", {
			method: 'PUT', 
			body: JSON.stringify([...tasks, newTask]),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then( res => res.json()).then( response => {
			console.log(response);
		}).catch(error => console.error(error));
		
		setTasks([...tasks, newTask]);
		setInputValue("");
		setTaskCount(taskCount + 1);
	};

	const deleteTask = (indexItem) => {
		const filteredTasks = tasks.filter(task => task.id !== indexItem );
		let restAux = fetch("http://assets.breatheco.de/apis/fake/todos/user/rjmore", {
			method: 'PUT', 
			body: JSON.stringify(filteredTasks),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then( res => res.json()).then( response => {
			console.log(response);
		}).catch(error => console.error(error));
		setTasks(filteredTasks);
		setTaskCount(taskCount - 1);
	};

	const deleteAllTask = (indexItem) => {
		let restAux = fetch("http://assets.breatheco.de/apis/fake/todos/user/rjmore", {
			method: 'DELETE', 
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then( res => res.json()).then( response => {
			console.log(response);
		}).catch(error => console.error(error));
		setTasks([]);
		setTaskCount(0);
	};

	return (
		<div className="" style={{ minWidth: "30rem" }}>
			<h1 className='text-center title mt-3' >todos</h1>
			<button onClick={() => deleteAllTask()} className='btn btn-outline-light deleteAllBtn mb-4'>DELETE ALL TASKS</button>
			<ul className="list-group mb-4">
				<li className="list-group-item d-flex ">
					<input 
						className='inputTask'
						type="text" 
						onChange={e => setInputValue(e.target.value)} 
						onKeyUp={AddTask} value={inputValue} 
					/>
				</li>
				{tasks.map( item => (
					<li key={item.id} className="d-flex justify-content-between ps-5 list-group-item taskItem">
						<span className='fs-5'>{item.label}</span>
						<button onClick={() => deleteTask(item.id)} className='btn btn-outline-light deleteBtn'>X</button>
					</li>
				))}

				<li className="list-group-item lastRow p-2">
					<span className='TaskCount'>{taskCount === 0 ? "No tasks, add a task" : taskCount + " item left"}</span>
				</li>
			</ul>
		</div>
	);
};

export default TodoList;