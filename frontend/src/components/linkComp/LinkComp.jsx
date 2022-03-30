import React from 'react';
import './LinkComp.scss';
import { Link } from 'react-router-dom';

const LinkComp = ({ route, routeName }) => {
  return (
    <Link className="link-comp" to={'/' + route}>
      {routeName}
    </Link>
  );
};

export default LinkComp;
