import { useContext, useEffect } from "react";
import "./navbar.css"
import { UserContext } from "../../context/context";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <NavLink to="/" className="logo"><span >Booking Website</span></NavLink>
        <div className="navItems">
          {user.auth === true ?
            <>
              <span>{user.info.username == '' ? 'Xin chào bạn' : 'Xin chào, ' + user.info.username}</span>
              <NavLink to="/auth/transaction"><button className="navButton">Transaction</button></NavLink>
              <button className="navButton" onClick={logout}>Logout</button>
            </>
            :
            <>
              <NavLink to="/register"><button className="navButton">Register</button></NavLink>
              <NavLink to="/login"><button className="navButton">Login</button></NavLink>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
