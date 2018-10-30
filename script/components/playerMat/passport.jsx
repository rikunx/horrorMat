import React from 'react';

const Passport = ({ children }) => (
  <div id="passport">
    <div id="cover">
      <div id="page1">
        <div className="page">
          <div className="page open">{children}</div>
        </div>
      </div>
    </div>
  </div>
);

Passport.propTypes = {};

export default Passport;
