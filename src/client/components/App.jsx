import React from 'react';
import PropTypes from 'prop-types';

require('../styles/app.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleClick() {
    this.props.postStatus(this.state.value);
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.handleClick}>Post Status To Facebook</button>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

App.propTypes = {
  message: PropTypes.string.isRequired,
  postStatus: PropTypes.func.isRequired,
};

export default App;
