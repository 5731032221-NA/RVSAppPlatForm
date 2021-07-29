import React, { Component } from "react";
import User from "./TestUser";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../middleware/action";

export class UserList extends Component {
  constructor(props) {
    super(props);
    this.props.getUserList();
    this.state = {
      allUsers: [],
    };
  }
  render() {
    this.state.allUsers = this.props.userFromList;
    // const allUsers = this.props.userFromList;
    // console.log("allUsers", allUsers);
    let lists = (
      <div>
        <h1>data not found</h1>
      </div>
    );
    if (this.state.allUsers.length !== 0) {
      console.log("allUsers", this.state.allUsers);
      lists = this.state.allUsers.map((item) => (
        <div key={item.id}>
          <User data={item} />
        </div>
      ));
    }
    return (
      <div>
        <h1>UserList</h1>
        {lists}
        <button onClick={() => { this.state.allUsers = this.props.userFromList; }}>update</button>
      </div>
    );
  }
  componentDidMount() {
    // this.props.getUserList();
    // console.log("componentDidMount",this.props)
    
    // console.log("getAllusers", this.props);
    // this.props.getAllusers();
    // this.state.allUsers = this.props.userFromList
    // console.log("getAllusers", this.props);
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps")
  return {
    userFromList: state.reducer.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  // console.log("mapDispatchToProps")
  // return {
  //   getAllusers: () => {
  //     return dispatch(action.getUserList());
  //   },
  // };
  return bindActionCreators(Actions, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
