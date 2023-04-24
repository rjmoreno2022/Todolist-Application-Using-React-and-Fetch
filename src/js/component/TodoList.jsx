import React, { useState, useEffect } from 'react';

//create your first component
export const TodoList = () => {
	const [inputValue, setInputValue] = useState('');
	const [tasks, setTasks] = useState([]);
	const [taskCount, setTaskCount] = useState(0);

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
			title: inputValue,
		};
		setTasks([...tasks, newTask]);
		setInputValue("");
		setTaskCount(taskCount + 1);
	};

	const deleteTask = (indexItem) => {
		const filteredTasks = tasks.filter(task => task.id !== indexItem );
		setTasks(filteredTasks);
		setTaskCount(taskCount - 1);

	};

	return (
		<div className="" style={{ minWidth: "30rem" }}>
			<h1 className='text-center title mt-3' >todos</h1>
			<ul className="list-group mb-4">
				<li className="list-group-item d-flex ">
					<input 
						className='inputTask'
						type="text" 
						onChange={e => setInputValue(e.target.value)} 
						onKeyUp={AddTask} value={inputValue} 
					/>
				</li>
				{tasks.map((task) => (
					<li key={task.id} className="d-flex justify-content-between ps-5 list-group-item taskItem">
						<span className='fs-5'>{task.title}</span>
						{/* <button>Delete</button> */}
						<button onClick={() => deleteTask(task.id)} className='btn btn-outline-light deleteBtn'>X</button>
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