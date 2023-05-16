const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			tasks: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			loadTasks: async () => {
				try {
					let resp = await fetch("http://assets.breatheco.de/apis/fake/todos/user/rjmore");
					let data = await resp.json();
					setStore({ tasks: data });
					const auxStore = getStore();
					console.log(auxStore.tasks);
				} catch (err) {
					console.log(err);
				}
			}
		}
	};
};

export default getState;
