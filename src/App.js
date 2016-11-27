import React, { Component } from 'react';
import TerminalWindow from './components/TerminalWindow';
var QUESTIONS = require('./data/questions.js').questions;

var myData = JSON.parse(localStorage.getItem("tachyonsQuiz")) || { score:0, log:[], questions:[] };

class App extends Component {
  render() {
    return (
      <div className="vh-100 pa4 mw7 center">
        <h1 className="f5 mv4 sans-serif">Are you a Tachyons Pro?</h1>
        <p className="f5 mt4 mb5 sans-serif">Learn Tachyons by memorizing the class names. <a href="http://tachyons.io" target="_blank">What is Tachyons?</a></p>

        <TerminalWindow questions={ QUESTIONS } myData={ myData } />

      </div>
    );
  }
}


export default App;
