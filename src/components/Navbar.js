import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useState } from "react";

function Navbar() {
  const [expandNavbar, setExpandNavbar] = useState(false);

  //keeps track of location
  const location = useLocation();

  //closes the navbar everytime location changes
  useEffect(() => {
    setExpandNavbar(false)
  }, [location])

  return (
    <div data-testid="navbar-1"className="navbar" id={expandNavbar ? "open" : "close"}>
      <div className="links">
        <Link to="/Players/"> Players </Link>
        <Link to="/PlayerComparison">  Compare </Link>
        
      </div>
    </div>
  );
}

export default Navbar;
