import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Table,
  Container,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import './App.css';

import AppNav from "./AppNav";

class Expenses extends Component {
  emptyItem = {
    id: null,
    expensedate: new Date(),
    description: "",
    location: "",
    category: { id: 1, name: "Travel"},
  };

  constructor(props) {
    super(props);

    this.state = {
      idCount: null,
      date: new Date(),
      isLoading: true,
      Expenses: [],
      Categories: [],
      item: this.emptyItem,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  async handleSubmit(event) {
    const item = this.state.item;
    item.id = null;
    event.preventDefault();
    await fetch(`/api/expenses`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    window.location.reload()
    
    this.props.history.push("/expenses");
  }

  handleChange(event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    let item = { ...this.state.item }
    if(name === "category"){
      const id = event.target.options[event.target.selectedIndex].id
      value = { id: id, name: value}
    }
    
    item[name] = value;
    this.setState({ item });
    console.log(item);
  }

  handleDateChange(date) {
    let item = { ...this.state.item };
    item.expensedate = date;
    this.setState({ item });
  }

  async remove(id) {
    await fetch(`/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedExpenses = [...this.state.Expenses].filter((i) => i.id !== id);
      this.setState({ Expenses: updatedExpenses });
    });
  }

  async componentDidMount() {
    const response = await fetch("/api/categories");
    const body = await response.json();
    this.setState({ Categories: body, isLoading: false });

    const responseExp = await fetch("/api/expenses");
    const bodyExp = await responseExp.json();
    this.setState({ Expenses: bodyExp, isLoading: false });
  }

  render() {
    const title = <h3 className="title">Add Expense</h3>;
    const { Categories } = this.state; 
    const { Expenses, isLoading } = this.state;

    if (isLoading) return <div>Loading......</div>;

    let optionList = Categories.map((category) => (
      <option id={category.id}>{category.name}</option>
    ));

    let rows = Expenses.map((expense) => (
      <tr key={expense.id}>
        <td>{expense.description}</td>
        <td>{expense.location}</td>
        <td>
          <Moment date={expense.expensedate} format="DD/MM/YYYY" />
        </td>
        <td>{expense.category.name}</td>
        <td>
          <Button
            size="sm"
            color="danger"
             className="button-custom"
            onClick={() => this.remove(expense.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));

    return (
      <div>
        <AppNav></AppNav>
        <Container className="parent-container">
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup className="col-md-4 mb-3">
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                onChange={this.handleChange}
                autoComplete="name"
              ></Input>
            </FormGroup>

            <FormGroup className="col-md-4 mb-3">
              <Label for="category">Category</Label>
              <select name="category" onChange={this.handleChange}>{optionList}</select>
            </FormGroup>

            <FormGroup className="col-md-4 mb-3">
              <Label for="category">Description</Label>
              <Input
                onChange={this.handleChange}
                type="text"
                name="description"
                id="description"
              ></Input>
            </FormGroup>

            <FormGroup className="col-md-4 mb-3">
              <Label for="city">Date</Label>
              <DatePicker
                selected={this.state.item.expensedate}
                onChange={this.handleDateChange}
              />
            </FormGroup>

            <FormGroup className="col-md-4 mb-3">
              <Label for="location">Location</Label>
              <Input type="text" onChange={this.handleChange} name="location" id="location"></Input>
            </FormGroup>

            <FormGroup>
              <Button className="button-custom" color="primary" type="submit">
                Save
              </Button>{" "}
              <Button className="button-custom" color="secondary" tag={Link} to="/">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>{" "}
        <Container className="parent-container">
          <h3 className="title">Expense List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">Description</th>
                <th width="10%">Location</th>
                <th> Date</th>
                <th> Category</th>
                <th width="10%">Action</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Expenses;
