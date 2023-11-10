import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  WorkOutline,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="dashboardLink">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="dashboardLink">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Admins
              </li>
            </Link>
            <Link to="/listClass" className="dashboardLink">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Classes
              </li>
            </Link>
            <Link to="/listSection" className="dashboardLink">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Sections
              </li>
            </Link>
            <Link to="/users" className="dashboardLink">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Students
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
