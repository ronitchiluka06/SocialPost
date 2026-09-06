import React from "react";
import { Moon, User, LogOut } from "lucide-react";

const Navbar = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="navbar">

      <h1 className="logo">
        Social
      </h1>

      <div className="navbar-actions">

        <div className="profile-avatar">
          <User size={28} />
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={20} />
        </button>

      </div>

    </header>
  );
};

export default Navbar;