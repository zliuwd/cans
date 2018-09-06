import React from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'react-dom/server';

import './style.sass';

// Firefox browser prints iframe in different way than other browsers,
// so we are detecting if user is in Firefox with this workaround
// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
const isFirefox = typeof InstallTrigger !== 'undefined';

const printFrameId = 'print-frame';

class Print extends React.Component {
  componentDidMount() {
    this.print();
  }

  printInFirefox() {
    const frame = document.getElementById(printFrameId);
    frame.focus();
    frame.contentDocument.body.innerHTML = '';
    frame.contentDocument.write(renderToString(this.props.node));
    frame.contentWindow.print();
  }

  printInOtherBrowser() {
    const frameContentWindow = document.getElementById(printFrameId).contentWindow;
    frameContentWindow.focus();
    frameContentWindow.document.open();
    frameContentWindow.document.write(renderToString(this.props.node));
    frameContentWindow.document.close();
    frameContentWindow.print();
  }

  print() {
    if (isFirefox) {
      this.printInFirefox();
    } else {
      this.printInOtherBrowser();
    }
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
