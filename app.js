class App extends React.Component{
	constructor(){
		super();
		this.state = {
			todos:[
	            {text: 'learn angular', done: false, id: 1},
	            {text: 'write the content for the next module', done: false, id: 2},
	            {text: 'buy cheese', done: false, id: 3},
	            {text: 'buy milk', done: false, id: 4}
			],
			searchString: '',
			key: 'all',
			completed: true,

		}
		this.onSearchInput = this.onSearchInput.bind(this);
		this.onBtnClick = this.onBtnClick.bind(this);
		this.onCheck = this.onCheck.bind(this);
		this.onClearBtn = this.onClearBtn.bind(this);
		this.valueSelector = this.valueSelector.bind(this);
	}
	/* Sorting Todos Method */
	valueSelector(event){
		this.setState({
		    key: event.target.value
		})
		console.log(this.state.key);
	}
	
	/* Checkbox Method */
	onCheck(event, todoId){
		let key = todoId;
		for(let i = 0; i < this.state.todos.length; i++){
			if (key === this.state.todos[i].id){
				key = i;	
				break;
			}
		}
		console.log(key);

		var stateCopy = Object.assign({}, this.state);
		stateCopy.todos[key].done = event.target.checked;
		this.setState(stateCopy);
	}

//FIGURE THIS SHIT OUT//
//Need to grab a refernce for tasks that match criteria, but how? IDFK//
	onClearBtn(event){
		let todos = this.state.todos;
		let remove = this.state.completed;
		let holder = [];

		for(let i = 0; i < this.state.todos.length; i++){
			if (remove === this.state.todos[i].done){
				this.state.todos.splice(i, 1)
				i--;
			}
		}
		this.setState({
			todos: todos	
		})
		
	// 	todos = todos.filter((todo)=>{
	// 		if (todo.done === true){
	// 			return todo.done;
	// 		}
	// 	}
	// )


		// for(let i = 0; i < this.state.todos.length; i++){
		// if (remove === this.state.todos[i].done){
		// 	todos = todos.filter((todo)=>{
		// 	})
		// 	return todo.done;
		// }
		// this.setState({
		// todos: this.state.todos.splice(i)
	// })
	// }

		console.log('click');
  }

	/* Add Button Method */
	onBtnClick(event, text){
		event.preventDefault();
		this.state.todos.push({
			text,
			done: false,
			id: this.state.todos.length + 1
		})
		console.log(text);
		this.setState({
		todos: this.state.todos,
		searchString: ''
		})
	}

	/* Searchbox Method */
	onSearchInput(event){
		console.log("New Search: " + event.target.value);
		this.setState({
			searchString: event.target.value
		})
	}
	render(){
		return(
			<div className="container">
				<Header />
				<br/>
				<Form onSearchInput={this.onSearchInput}
						onBtnClick={this.onBtnClick} />
						<br/>
				<FullList list={this.state.todos} 
						  onCheck={this.onCheck}
						  isDone={this.state.ifDone}
						  onClearBtn={this.onClearBtn}
						  keyz={this.state.key} />
				<Footer onClearBtn={this.onClearBtn}
						list={this.state.todos}
						valueSelector={this.valueSelector} />
				</div>
		)
	}
}

function Header(){
	return (<h1 className="text-center">To-Do List</h1>);
}

class Form extends React.Component{

	render(){
		return(
			<form onSubmit={(e) => { this.props.onBtnClick(e, this.refs.createInput.value);this.refs.createInput.value=''; }}>
				<div className="input-group">
					<span className="input-group-btn">
						<button className="btn btn-primary" type="submit">Add</button>
					</span>
					<input className="form-control" placeholder="Add a ToDo" ref="createInput" onChange={this.props.onSearchInput} />
				</div>
			</form>
		)
	}
}


class FullList extends React.Component {
	constructor(){
		super();
	}
	render(){
		let listToRender = this.props.list;
		let key = this.props.keyz;
		console.log(key);
	
		if (key === 'complete'){
			listToRender = listToRender.filter((todo)=>{
				return todo.done;
			})
		}
		 else if (key === 'active'){
			listToRender = listToRender.filter((todo) =>{
				return !todo.done;
			})
		}
		

		listToRender = listToRender.map((list) => {
		return <List onCheck={this.props.onCheck} onClearBtn={this.props.onClearBtn} text={list.text} id={list.id} done={list.done}/>
		})

		return(
			<div ClassName="List">
			{listToRender}

			</div>
		)
	}
}

class List extends React.Component {
	
	render(){
		return(
			<ul className="list-group">
				<li className="list-group-item">
					 <input type="checkbox" checked={this.props.done} onChange={(e) => {this.props.onCheck(e, this.props.id)}} value="on" /> 
					<label style={ {textDecoration: this.props.done ? 'line-through' : 'none', 
					color: this.props.done ? 'grey' : 'black'} }>{this.props.text}</label>
				</li>
			</ul>
		)
	}
}

class Footer extends React.Component {
	render(){


		return(
			<div className="footer">
			<select onChange={this.props.valueSelector}>
				<option value="all">all</option>
				<option value="active">active</option>
				<option value="complete">complete</option>
			</select>

			<button className="pull-right btn btn-primary" onClick={this.props.onClearBtn}>Clear Complete</button>
			<br/>
			<p className="credits">Created By: Zayd</p>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));