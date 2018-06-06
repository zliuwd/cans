import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import {
  Button,
  IconButton,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';

const variantIcon = {
  success: CheckCircleIcon,
  backgroundColor: green,
};
const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const MessageContent = props => {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];
  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
};

MessageContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success']).isRequired,
};
const MessageContentWrapper = withStyles(styles1)(MessageContent);
const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});
class Notification extends Component {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.handleClose}
          labelStyle={{ color: 'white' }}
          iconStyle={{ fill: 'green' }}
        >
          <MessageContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="Success! New Child/Youth record has been saved."
          />
        </Snackbar>
      </Fragment>
    );
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(Notification);
