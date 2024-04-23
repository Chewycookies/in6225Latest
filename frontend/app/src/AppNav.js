import React, { Component } from "react";
import {Nav, NavItem, NavbarBrand, Navbar} from "reactstrap";
import { NavLink} from "react-router-dom";

class AppNav extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md" style={{paddingLeft: '20px'}}>
          <NavbarBrand href="/">Expense Tracker Application <label style={{fontSize: '10px'}}>Powered by Aiman</label></NavbarBrand>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/expenses">
                  Expenses
                </NavLink>
              </NavItem>
              
            </Nav>
          
        </Navbar>
      </div>
    );
  }
}

export default AppNav;
