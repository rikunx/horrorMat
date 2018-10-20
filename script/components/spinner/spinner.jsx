import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = ({ open, fixed = false, size = 50 }) => {
  if (!open) return null;
  return (
    <div className={`spinner ${fixed ? 'fixed' : ''}`}>
      <CircularProgress size={size} color="primary" />
      <div className="spinner-overlay" />
    </div>
  );
};

Spinner.propTypes = {
  open: PropTypes.bool.isRequired,
  fixed: PropTypes.bool,
  size: PropTypes.number
};

Spinner.defaultProps = {
  size: 50,
  fixed: false
};

export default Spinner;
