import React, { Component } from "react";
import "./App.css";
import { todos } from "./todos.json";
import TodoForm from "./components/TodoForm";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos,
      disabled: true
    };
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  handleAddTodo(todo) {
    this.setState({
      todos: [...this.state.todos, todo]
    });
  }

  componentDidMount() {
    this.setState({
      title: this.state.todos.title
    });
  }

  handleImput(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
    console.log(value, name);
  }

  handleModifyTodo() {
    this.setState({
      disabled: false
    });
  }
  handleAceptTodo(index, e) {
    var todos = [...this.state.todos];
    const { value } = e.target;
    todos[index].title = value;
    this.setState({
      disabled: true,
      todos
    });
  }

  handleRemoveTodo(index) {
    if (window.confirm("Are you sure want to delete it?")) {
      this.setState({
        todos: this.state.todos.filter((e, i) => {
          return i !== index;
        })
      });
    }
  }

  render() {
    const todos = this.state.todos.map((todo, index) => {
      return (
        <div key={index} className="col-md-4">
          <div className="card mt-4">
            <div className="card-header text-center">
              <input
                type="text"
                name="title"
                onChange={this.handleImput.bind(this)}
                disabled={this.state.disabled}
                defaultValue={this.state.todos.title}
              ></input>
              <span className="badge badge-pill badge-danger ml-2">
                {todo.priority}
              </span>
            </div>
            <div className="card-body">
              <p>{todo.description}</p>
              <p>{todo.responsible}</p>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={this.handleRemoveTodo.bind(this, index)}
              >
                Delete
              </button>
              <button
                className={
                  this.state.disabled ? "btn btn-danger ml-2" : "d-none"
                }
                onClick={this.handleModifyTodo.bind(this)}
              >
                Modify
              </button>
              <button
                className={
                  this.state.disabled ? "d-none" : "btn btn-danger ml-2"
                }
                onClick={this.handleAceptTodo.bind(this, index)}
              >
                Acept
              </button>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <a className="text-white">
            Task
            <span className="badge badge-pill badge-light ml-2">
              {this.state.todos.length}
            </span>
          </a>
        </nav>
        <div className="container">
          <div className="row mt-4">{todos}</div>
        </div>
        <TodoForm onAddTodo={this.handleAddTodo} />
      </div>
    );
  }
}

export default App;
