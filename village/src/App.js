import React, { Component } from 'react';
import axios from "axios";
import { Route, Link } from 'react-router-dom';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount = () => {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res=> this.setState( { smurfs : res.data } ) )
      .catch(err=> console.log(err) )
  }

  addSmurf = (newSmurf) => {
    axios
      .post("http://localhost:3333/smurfs", newSmurf)
      .then(res => {
        const smurfs = res.data;
        this.setState({ smurfs }); })
      .catch(err => console.log(err))
  }

  handleDelete = (id) => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        const smurfs = res.data;
        this.setState({smurfs}) })
      .catch(err => console.lot(err));
  }

  // <Route exact path="/" component={Header} />
  render() {
    const { smurfs } = this.state;
    return (
      <div className="App">
        <SmurfForm addSmurf={this.addSmurf}/>
        <Smurfs smurfs={smurfs} handleDelete={this.handleDelete}/>
        {/* <Route exact path='/' component={Header} />
        <Route path='/smurfs' component={SmurfForm} />
        <Route path='/smurfs' render={props => (<Smurfs {...props} smurfs={this.state.smurfs} />)} /> */}
      </div>
    );
  }
}

export default App;
