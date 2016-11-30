import React, { Component } from 'react';
import TerminalWindow from './components/TerminalWindow';
var QUESTIONS = require('./data/questions.js').questions;

var myData = JSON.parse(localStorage.getItem("tachyonsQuiz")) || { score:0, log:[], questions:[] };

class App extends Component {
  render() {
    return (
      <div className="vh-100 pa4 mw7 center">
        <h1 className="f5 mt3 mb4 sans-serif">Are you a Tachyons Pro?</h1>
        <p className="f5 mt4 mb5 sans-serif">Learn Tachyons by memorizing the class names. <a href="http://tachyons.io" target="_blank" className="blue">What is Tachyons?</a></p>

        <TerminalWindow questions={ QUESTIONS } myData={ myData } />

        <p className="f6 mt5 sans-serif">See an error? <a href="https://github.com/mkwng/tachyons-quiz" target="_blank" className="blue">Submit an issue</a></p>
        <p className="f6 sans-serif">Say hi on Twitter: <a href="https://twitter.com/mkwng/" target="_blank" className="blue" >@mkwng</a></p>

      </div>
    );
  }
}


export default App;
