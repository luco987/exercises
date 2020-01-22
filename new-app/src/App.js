import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { todos } from "./todos.json";
import TodoForm from "./components/TodoForm";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos
    };
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  handleAddTodo(todo) {
    this.setState({
      todos: [...this.state.todos, todo]
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
        <div className="col-md-4">
          <div className="card mt-4">
            <div className="card-header text-center">
              <h3>{todo.title}</h3>
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
        <img src={logo} className="App-logo" alt="logo" />
        <TodoForm onAddTodo={this.handleAddTodo} />
      </div>
    );
  }
}

export default App;
