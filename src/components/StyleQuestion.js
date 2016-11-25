import React from 'react';

var StyleQuestionBlock = React.createClass({
  getInitialState: function() {
    return {
      "answer": this.props.answer || ""
    };
  },

  componentDidMount: function() {
    setTimeout(function() {
      if (this.textInput) this.textInput.focus();
    }.bind(this),50);
  },

  onAnswerChange: function(e) {
    this.setState({ answer: e.target.value });
    e.target.style.width = Math.max(e.target.value.length,1) + "ch";
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.setState({answer: ""});
    this.textInput.style.width = "1ch";
    return this.props.onAnswer(this.state.answer);
  },

  render: function() {
    var isCorrect = this.props.answer === this.props.tachyonsStyle.answer;
    var comment = (
      <code className="db w-100 white-30 i">
        { "// " }
        { this.props.tachyonsStyle.categories[0] + ": " + this.props.tachyonsStyle.categories[1] + ". " }
        <a className="white-30" href={this.props.tachyonsStyle.url}>See documentation</a>.
      </code>
    );
    var selector = this.props.isEditable
      ? (
        <code className="db w-100">
          <form onSubmit={this.onSubmit} className="dib green">
            .<input
              className="w1 outline-0 b--none pa0 bg-transparent green"
              type="text"
              value={this.state.answer}
              onChange={this.onAnswerChange}
              ref={(input) => { this.textInput = input; }}
              />
          </form>
          { " {" }
        </code>
      ) : (
          <code className={ isCorrect ? "correct db w-100" : "wrong db w-100" }>
            <span className={ isCorrect ? "green" : "bg-red white" }>
              .{ this.props.answer } 
              <i className="material-icons ph1 v-btm">{ isCorrect ? "check_circle" : "error"}</i>
            </span>
            { " { " }
            <span className={ isCorrect ? "dn white-30 i" : "di white-30 i" }>
              { " // Correct answer: " + this.props.tachyonsStyle.answer }
            </span>
          </code>
        );
    var property = (<code className="db w-100 pl3">{ this.props.tachyonsStyle.question }</code>);
    return (
      <pre className="w-100 tl mv0">
        <code className="db w-100">{ " " }</code>
        { comment }
        { selector }
        { property }
        <code className="db w-100">{ "}" }</code>
      </pre>
    );
  }
});


var StyleQuestionLog = React.createClass({
  componentDidUpdate: function(prevProps, prevState) {
    setTimeout(function() {
      this.props.didAdd();
    }.bind(this),50);
  },

  render: function() {
    return (
      <div>
        { this.props.questionLog.map( (logEntry, i) => (
            <StyleQuestionBlock
              tachyonsStyle={ logEntry.tachyonsStyle }
              answer={ logEntry.answer }
              isEditable={ false }
              key={ i }
            />
        ) ) }
      </div>
    );
  }
});

module.exports = {
  StyleQuestionBlock: StyleQuestionBlock,
  StyleQuestionLog: StyleQuestionLog
}
