import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Toast = ({ open, message, isError, hideDelay, hide }) => (
    <Snackbar
        className={`toast ${isError ? 'toast-error' : ''}`}
        open={open}
        onClose={hide}
        message={message}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={hideDelay > 0 ? hideDelay : null}
        action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={hide}>
                <CloseIcon />
            </IconButton>
        ]}
    />
);

Toast.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
    hideDelay: PropTypes.number.isRequired,
    hide: PropTypes.func.isRequired
};

export default Toast;
