import React, { useState, useEffect, useContext } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { TodoList }  from "./TodoList.jsx" ;
import injectContext from "../store/appContext.js";

//create your first component
const Home = () => {


	return (
		<>
			<div className="d-flex justify-content-center px-5 mainDiv">
				<TodoList />
			</div>
		</>
	);
};

export default injectContext(Home);
