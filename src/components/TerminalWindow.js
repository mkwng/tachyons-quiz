import React from 'react';
import StyleQuestionBlock from './StyleQuestionBlock.js';
import StyleQuestionLog from './StyleQuestionLog.js';

var _ = require('lodash');
var jQuery = require('jquery');


const TerminalWindowHeader = (...props) => {
  const classes = 'absolute top-0 left-0 w-100 h2 bg-light z-1';
  return (
    <div className={ classes }>
      <span className="w1 h1 br-100 bg-lighter dib mv2 mr1 ml2"></span>
      <span className="w1 h1 br-100 bg-lighter dib mv2 mh1"></span>
      <span className="w1 h1 br-100 bg-lighter dib mv2 mh1"></span>
    </div>
  );
}

var TerminalWindowFooter = React.createClass({
  clickReset: function() {
    this.props.reset();
  },
  render: function() {
    const classes = "absolute bottom-0 left-0 w-100 h2 bg-grey4 f6 flex justify-between items-center";
    const percentageCorrect = Math.round( (this.props.questionLog.seen > 1
      ? (this.props.questionLog.correct / (this.props.questionLog.seen - 1))
      : 0.001 ) * 100);
    return (
      <div className={ classes }>
        <div className="flex items-center">
          <span className="grey2 mh2" data-tooltip="Number of times you've seen this question"><i className="material-icons ph1 v-btm">remove_red_eye</i> { this.props.questionLog.seen-1 }</span>
          <span className="grey2 mh2" data-tooltip="How often you got this question correct"><i className="material-icons ph1 v-btm">check_circle</i> { percentageCorrect }%</span>
          <a href="#" className="grey2 mh2" data-tooltip="Reset all progress" onClick={this.clickReset}><i className="material-icons ph1 v-btm">delete</i></a>
        </div>
        <div className="flex items-center">
          <span className="grey2 mh2" >press Return <i className="material-icons ph1 v-btm">keyboard_return</i></span>
        </div>
      </div>
    );
  }
})

var TerminalWindow = React.createClass({
  getInitialState: function() {
    var initialData = this.props.myData || { score:0, log:[], questions:[] };
    initialData.questions = initialData.questions.length
      ? _.orderBy(_.shuffle(initialData.questions), ['seen', 'proficiency'], ['asc', 'asc'])
      : this.addQuestion(10, initialData.questions);
    return {
      data: initialData,
      currentQuestionID: initialData.questions[0].id,
      currentQuestionOwn: initialData.questions[0],
      currentQuestionTachyons: _.find(this.props.questions, { id: initialData.questions[0].id })
    };
  },

  onAnswer: function(userAnswer) {
    this.state.currentQuestionOwn.seen += 1;

    if (userAnswer === this.state.currentQuestionTachyons.answer) {
      console.log("Correct");
      this.state.currentQuestionOwn.proficiency += 1;
      this.state.currentQuestionOwn.correct += 1;
      this.state.score += 1;
    } else {
      console.log("Wrong");
      this.state.currentQuestionOwn.proficiency = Math.max(this.state.currentQuestionOwn.proficiency - 1, 0);
    }

    // Change question
    this.state.data.log.push({
      id: this.state.data.log.length,
      tachyonsStyle: this.state.currentQuestionTachyons,
      answer: userAnswer
    });
    this.state.currentQuestionID = this.nextQuestionID();

    this.state.currentQuestionOwn = _.find(this.state.data.questions, { id: this.state.currentQuestionID });
    this.state.currentQuestionTachyons = _.find(this.props.questions, { id: this.state.currentQuestionID });

    localStorage.setItem('tachyonsQuiz',JSON.stringify(this.state.data));
    this.setState(this.state);
  },

  addQuestion: function(num, target) {
    num = num ? num : 1;
    var isTarget = target ? true : false;
    target = target || this.state.data.questions;

    // Query for random array with answered questions filtered out
    var answered = _.map(target, 'id');
    var filteredQuestions = _.pickBy(this.props.questions, function(value, key) {
      return !_.includes(answered, value.id);
    });
    var available = _.shuffle(_.map(filteredQuestions, 'id'));

    if (available.length) {
      var count = available.length > num ? num : available.length;
      for(var i = 0; i < count; i++) {
        target.push({
          id: available[i],
          proficiency: 0,
          correct: 0,
          seen: 1,
        });
      }
      if (!isTarget) this.setState(this.state);
      console.log("New Question Added!");
      return isTarget ? target : available[0];
    } else {
      console.log("No more new questions to add");
      return isTarget ? target : null;
    }

  },

  reset: function() {
    if( window.confirm("Reset all progress? This can't be undone.") ) {
      localStorage.setItem('tachyonsQuiz', JSON.stringify({ score:0, log:[], questions:[] }));
      window.location.reload();
    }
  },

  nextQuestionID: function() {

    // Get the first one in the list that hasn't been seen.
    var nextQuestion = this.state.currentQuestionID ?
      _.findIndex(this.state.data.questions, { id: this.state.currentQuestionID })
      : -1;

    if (this.state.data.questions[nextQuestion+1] && this.state.data.questions[nextQuestion+1].proficiency <= 3) {
      return this.state.data.questions[nextQuestion+1].id;
    } else {
      this.addQuestion(5);
      console.log("All questions seen. Adding 5 more.")
      this.state.data.questions = _.orderBy(_.shuffle(this.state.data.questions), ['proficiency','seen'], ['asc', 'asc']);
      this.setState(this.state);
      return this.state.data.questions[0].id;
    }
  },

  didAddLog: function() {
    jQuery(this.scrollWindow).animate({ scrollTop: jQuery(this.innerWindow).innerHeight() });
  },

  render: function() {
    const classes = 'w-100 vh-50 bg-grey3 grey1 overflow-hidden br3 relative';
    const styles = {
      boxShadow: 'rgba(0,0,0,.08) 16px 16px 0'
    };
    return (
      <div className={ classes } style={ styles }>
        <TerminalWindowHeader />

        <div
          className="w-100 h-100 overflow-hidden pv4"
          ref={ (div) => { this.scrollWindow = div; } }
        >
          <div
            className="w-100 pl2 f5 code"
            style={ { counterReset: 'a' } }
            ref={ (div) => { this.innerWindow = div; } }
          >
            <StyleQuestionLog
              questionLog={ this.props.myData.log }
              didAdd={ this.didAddLog }
            />
            <StyleQuestionBlock
              tachyonsStyle={ this.state.currentQuestionTachyons }
              isEditable={ true }
              onAnswer={ function(answer) {this.onAnswer(answer)}.bind(this) }
            />
            <br />
          </div>
        </div>

        <TerminalWindowFooter
          reset={ this.reset }
          questionLog={ this.state.currentQuestionOwn }
        />

      </div>
    );
  }
});

export default TerminalWindow;
