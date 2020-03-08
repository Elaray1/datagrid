import React, { Component } from 'react'

import setUsersAction from "../actions/actionUsers"
import { connect } from "react-redux"

class Table extends Component {

  renderUsers(user, index) {
    const tdInfo = user.map((el, i) => <td key={i}>{el}</td>)
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        {tdInfo}
      </tr>
    )
  }

  componentDidMount() {
  this.props.setUsersInfo()
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Premium account</th>
            <th>Position</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    )
  }

}

function mapStateToProps(state) {
  return {
    leha: state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUsersInfo: () => {
      dispatch(setUsersAction());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
