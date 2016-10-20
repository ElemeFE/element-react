import React from 'react';
import ReactDOM from 'react-dom';

import '../css/style.scss';
import '../../themes/default/index.css';

import Alert from './alert';

class App extends React.Component {
  render() {
    return (
      <div className="demo">
        <Alert />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
