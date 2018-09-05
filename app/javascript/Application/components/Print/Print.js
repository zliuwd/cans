import React from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'react-dom/server';

import './style.sass';

const printFrameId = 'print-frame';

class Print extends React.Component {
  componentDidMount() {
    this.print();
  }

  print() {
    const frame = document.getElementById(printFrameId).contentWindow;
    frame.focus();
    frame.document.open();
    frame.document.write(renderToString(this.props.node));
    frame.document.close();
    frame.print();
    this.props.onClose();
  }

  render() {
    return <iframe id={printFrameId} title={printFrameId} />;
  }
}

Print.propTypes = {
  node: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Print;
