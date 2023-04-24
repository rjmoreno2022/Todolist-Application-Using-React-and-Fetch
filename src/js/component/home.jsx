import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { TodoList }  from "./TodoList.jsx" ;

//create your first component
const Home = () => {
	return (
		<>
			<div className="d-flex justify-content-center px-5 mainDiv">
				<TodoList/>
			</div>
		</>
	);
};

export default Home;
