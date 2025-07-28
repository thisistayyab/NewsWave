import './App.css';

import React, {useState, Fragment } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import About from './components/About';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = (props)=> {

  const [progress, setprogress] = useState(0)

  const setProgress = () => {
    setprogress(progress)
  }
  const pagesize = 5
    return (
      <>
      <Router>
      <Fragment>
        <NavBar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        
      />
          <Routes>
          <Route exact path="/" element={<News setProgress = {setProgress}key="general" pageSize={pagesize} country= "us" category="general"/>}/>
          <Route exact path="/business" element={<News setProgress = {setProgress}key="business" pageSize={pagesize} country= "us" category="business"/>}/>
          <Route exact path="/entertainment" element={<News setProgress = {setProgress}key="entertainment" pageSize={pagesize} country= "us" category="entertainment"/>}/>
          <Route exact path="/health" element={<News setProgress = {setProgress}key="health" pageSize={pagesize} country= "us" category="health"/>}/>
          <Route exact path="/science" element={<News setProgress = {setProgress}key="science" pageSize={pagesize} country= "us" category="science"/>}/>
          <Route exact path="/sports" element={<News setProgress = {setProgress}key="sports" pageSize={pagesize} country= "us" category="sports"/>}/>
          <Route exact path="/technology" element={<News setProgress = {setProgress}key="technology" pageSize={pagesize} country= "us" category="technology"/>}/>
          <Route exact path="/about" element={<About/>}/>
          </Routes>
      </Fragment>
      </Router>
      </>
    )
}

export default App;