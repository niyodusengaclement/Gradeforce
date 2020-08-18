import React from 'react';
import '../assets/styles/components/alert.scss';
import alertImage from '../assets/images/alert.png';

export default ({
  isError, message, isSuccess, isAnimated, className,
}) => (
  <span className="alert--box">
    <p
      className={`alert--p ${className} ${isAnimated ? 'alert--animated' : 'alert'}
      ${isError ? 'alert__error text-danger'
        : isSuccess ? 'alert__success text-success '
          : 'hide'
      }`}
    >
      {/* <img className={`alert--image ${isError ? 'alertIcon' : 'hide'}`} src={alertImage}/> */}
      { message }
    </p>
  </span>
);