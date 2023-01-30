import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
const Navbar = () => {
  const { user, LogOUt } = useContext(AuthContext);
  const itemMenu = (
    <React.Fragment>
      <li className="font-serif">
        <Link to="/">Home</Link>
      </li>
    </React.Fragment>
  );
  const logingOUt = () => {
    LogOUt()
      .then((result) => { })
      .catch((error) => console.log(error));
  };
  return (
    <div className="md:w-5/6 mx-auto">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={ 0 } className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={ 0 }
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              { itemMenu }
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Ta <span className="text-orange-500">sk</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{ itemMenu }</ul>
        </div>
        <div className="navbar-end">
          <div className=" ">
            { user?.uid ? (
              <>
                <div className="flex  items-center">
                  <Link to="/login">
                    <button
                      onClick={ logingOUt }
                      className=" btm-nav-xs md:btm-nav-sm btn btn-active btn-error"
                    >
                      Log Out
                    </button>
                  </Link>
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={ 0 }
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img src={ user?.photoURL } />
                      </div>
                    </label>
                    <ul
                      tabIndex={ 0 }
                      className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a className="justify-between">
                          Profile
                          <span className="badge">New</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex  items-center">
                  <Link to="/login">
                    <button className=" btn-nav-xs md:btm-nav-sm btn btn-active btn-error">
                      Log In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="btn-nav-xs md:btm-nav-sm btn btn-active btn-error md:ml-3 ml-2">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </>
            ) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
