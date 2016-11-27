import React from 'react';
import StyleQuestionBlock from './StyleQuestionBlock'

var StyleQuestionLog = React.createClass({
  componentDidUpdate: function(prevProps, prevState) {
    setTimeout(function() {
      this.props.didAdd();
    }.bind(this),50);
  },

  componentDidMount: function() {
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

export default StyleQuestionLog