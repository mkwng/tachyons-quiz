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
    if(window.Prism) {
      window.Prism.highlightElement(this.propertyCode);
    }
  },

  componentDidUpdate: function() {
    if(window.Prism) {
      window.Prism.highlightElement(this.propertyCode);
    }
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

  clickPre: function() {
    if (this.props.isEditable) {
      if (this.textInput) this.textInput.focus();
    }
  },

  render: function() {
    var isCorrect = this.props.answer === this.props.tachyonsStyle.answer;
    var comment = (
      <code className="db w-100 grey2 i">
        { "// " }
        { this.props.tachyonsStyle.categories[0] + ": " + this.props.tachyonsStyle.categories[1] + ". " }
        <a className="grey2" href={this.props.tachyonsStyle.url}>See documentation</a>.
      </code>
    );
    var selector = this.props.isEditable
      ? (
        <code className="db w-100 bg-white-03">
          <form onSubmit={this.onSubmit} className="dib green">
            .<input
              className="w1 outline-0 b--none pa0 bg-transparent green"
              type="text"
              value={this.state.answer}
              onChange={this.onAnswerChange}
              ref={ (input) => { this.textInput = input; } }
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
            <span className={ isCorrect ? "dn grey2 i" : "di grey2 i" }>
              { " // Correct answer: " + this.props.tachyonsStyle.answer }
            </span>
          </code>
        );
    var property = (
      <code 
        className="db w-100 language-css"
        ref={ (code) => { this.propertyCode = code; } }>
          { this.props.tachyonsStyle.question }
      </code>
    );
    return (
      <pre className="w-100 tl mv0" onClick={ this.clickPre } >
        <code className="db w-100">{ " " }</code>
        { comment }
        { selector }
        { property }
        <code className="db w-100">{ "}" }</code>
      </pre>
    );
  }
});

export default StyleQuestionBlock;