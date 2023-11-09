import React, { Component } from "react";
import {  BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ContactslistUI from "./components/ContactslistUI";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<ContactslistUI/>} />
            </Routes>
           </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;

