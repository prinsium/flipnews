import './App.css';
import Navbar from './components/Navbar';
import React, { Component } from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
  state ={progress:0}

  setProgress = (progress) => {
   this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
        color='#ff0000'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
        <Route exact path='/' element={<News setProgress={this.setProgress} key="general" pageSize={21} country="in" category="general"/>}/>
        <Route exact path='/general' element={<News setProgress={this.setProgress} key="general" pageSize={21} country="in" category="general"/>}/>
        <Route exact path='/business' element={<News setProgress={this.setProgress} key="business" pageSize={21} country="in" category="business"/>}/>
        <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key="entertainment" pageSize={21} country="in" category="entertainment"/>}/>
        <Route exact path='/sports' element={<News setProgress={this.setProgress} key="sports" pageSize={21} country="in" category="sports"/>}/>
        <Route exact path='/health' element={<News setProgress={this.setProgress} key="health" pageSize={21} country="in" category="health"/>}/>
        <Route exact path='/science' element={<News setProgress={this.setProgress} key="science" pageSize={21} country="in" category="science"/>}/>
        <Route exact path='/technology' element={<News setProgress={this.setProgress} key="technology" pageSize={21} country="in" category="technology"/>}/>
        </Routes>
        </Router>
      </div>
    )
  }
}