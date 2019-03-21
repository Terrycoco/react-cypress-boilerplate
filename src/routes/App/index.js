import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'


export default class TodoApp extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }


  render () {
    return (
      <Router>
        <div>
           App Started!
        </div>
      </Router>
    )
  }
}
