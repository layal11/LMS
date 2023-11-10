import React , { useContext,useState } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
import { Link } from "react-router-dom";
import SessionContext from "../../../context/SessionContext";
import styled from "styled-components";
// import DarkModeToggle from "react-dark-mode-toggle";
let Sun, Moon;

Sun= Moon = styled.svg
    `
   position: relative;
  cursor: pointer;
  color: #555;

`;

export default function Topbar({theme,toggleTheme}) {
  console.log(theme);
  // const [isDarkMode, setIsDarkMode] = useState(() => false);
  const {
    session: {
      user: { access_token },
    },
    actions: { logout },
  } = useContext(SessionContext);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
        <Link style={{ textDecoration: 'none' }}  to="/">
          <span className="logo">LMS Dashboard</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer" onClick={toggleTheme}>
            { theme === 'light' ? <Moon xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></Moon>
                :
                <Sun xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></Sun> }
            {/*<ToggleOnIcon />*/}
          </div>
          {/*<DarkModeToggle*/}
          {/*    onChange={setIsDarkMode}*/}
          {/*    checked={isDarkMode}*/}
          {/*    size={80}*/}
          {/*/>*/}

          {/*<div className="topbarIconContainer">*/}
          {/*  <NotificationsNone />*/}
          {/*  <span className="topIconBadge">2</span>*/}
          {/*</div>*/}

          {/*<div className="topbarIconContainer">*/}
          {/*  <Language />*/}
          {/*  <span className="topIconBadge">2</span>*/}
          {/*</div>*/}
          {/*<div className="topbarIconContainer">*/}
          {/*  <Settings />*/}
          {/*</div>*/}
          {access_token && (
                  <button className="adminAddButton"  onClick={() => logout()}>Logout</button>
          )}
        </div>
      </div>

    </div>
  );
}
