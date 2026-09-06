import React from "react";
import {

  Globe,
  
} from "lucide-react";

const BottomNav = () => {

  return (
    <nav className="bottom-nav">
    <button className="selected">
        <Globe size={25} />
        <span>Social</span>
    </button>

    </nav>
  );
};

export default BottomNav;