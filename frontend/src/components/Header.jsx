import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top py-3">
      <div className="container">
        <a
          className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-5"
          href="#"
          style={{
            letterSpacing: "0.10px",
            fontFamily: "Times New Roman",
            fontSize: "25px",
          }}
        >
          💰 Personal Finance Visualizer
        </a>

        {/* Optional right-side controls */}
        <div className="d-none d-lg-block">
          <span
            className="text-white small"
            style={{ fontFamily: "sans-serif", fontSize: "15px" }}
          >
            Budget Better. Live Freer. 💸
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Header;
