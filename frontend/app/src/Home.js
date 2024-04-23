import React, { Component } from 'react';
import AppNav from './AppNav';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesCount: 0,
      expensesCount: 0
    };
  }

  async componentDidMount() {
    const response = await fetch("/api/categories/countAll");
    const catCount = await response.json();
    this.setState({ categoriesCount: catCount, isLoading: false });

    const responseExp = await fetch("/api/expenses/countAll");
    const expCount = await responseExp.json();
    this.setState({ expensesCount: expCount, isLoading: false });
  }

  render() { 
    return ( 
      <div>
        <AppNav/>
        <div style = {{
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            height : '100vh'
          }}>
            <div>
              <div>
                <h2>Welcome to Expense App</h2>
              </div>
              <div>
                <div><label>Total Categories available: {this.state.categoriesCount}</label></div>
                <div><label>Total Expenses saved: {this.state.expensesCount}</label></div>
              </div>
            </div>
        </div>
      </div>
      );
  }
}
 
export default Home;