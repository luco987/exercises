import React, { Component } from "react";
import "./App.css";
import Heading from "./Heading";
import Row from "./Row";
import timeago from "timeago.js";

const timeagoInstance = timeago();
class Headings extends Component {
  render() {
    return (
      <thead className="table-success">
        <tr>
          {this.props.headings.map((heading, index) => {
            return <Heading heading={heading} key={index}></Heading>;
          })}
        </tr>
      </thead>
    );
  }
}

class Rows extends Component {
  render() {
    return (
      <tbody>
        {this.props.data.map((row, index) => {
          return <Row key={index} change={row}></Row>;
        })}
      </tbody>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  async componentDidMount() {
    const res = await fetch(
      "https://openlibrary.org/recentchanges.json?limit=10"
    );
    const data = await res.json();
    const formatData = this.formatData(data);
    this.setState({ data: formatData });
  }
  formatData(data) {
    return data.map((data, index) => {
      return {
        when: timeagoInstance.format(data.timestamp),
        who: data.author.key,
        description: data.comment
      };
    });
  }
  render() {
    return (
      <div className="container p-4">
        <h1>{this.props.title}</h1>
        <table className="table table-bordered">
          <Headings headings={this.props.headings} />
          <Rows data={this.state.data} />
        </table>
      </div>
    );
  }
}

export default App;
