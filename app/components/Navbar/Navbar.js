import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <dt>
      <a html="https://in.yahoo.com/" target="_blank">
        <img
          src="https://s.yimg.com/rz/p/yahoo_frontpage_en-US_s_f_p_bestfit_frontpage_2x.png"
          alt="Yahoo"
          height="36"
        />
      </a>
    </dt>
    <dt>
      <a
        target="_blank"
        style={{ fontSize: '14px' }}
        href="https://help.yahoo.com/kb/index?locale=en_IN&page=product&y=PROD_ACCT"
      >
        Help
      </a>
    </dt>
  </nav>
);

export default Navbar;
