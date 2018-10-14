import React from 'react';
import PropTypes from 'prop-types';

import HeaderContainer from '../containers/Header/headerContainer';

const AppWrapper = () => (
    <div className="app-wrapper">
        <HeaderContainer />
    </div>
);

AppWrapper.propTypes = {
    ready: PropTypes.func.isRequired,
    readyTime: PropTypes.instanceOf(Date)
};

export default AppWrapper;
