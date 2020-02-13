import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { fetchUsers } from './actions'

function App(props) {
  
  useEffect(() => {
    props.fetchUsers()
  }, [])
  
  console.log(props)
  
  return (
    <div className="App">
      
      {/* {props.users.map(user => {
        <h1></h1>
      })} */}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    error: state.error,
    users: state.users
  }
}

export default connect(mapStateToProps, {fetchUsers})(App)