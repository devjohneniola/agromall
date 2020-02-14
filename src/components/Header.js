import React from "react";

import agroMallLogo from "../assets/images/AgroMall-logo.png";

const Header = () => {
  return (
    <header>
      <a id="top-logo" href="https://theagromall.com">
        <img src={agroMallLogo} />
      </a>
    </header>
  );
};

export default Header;
