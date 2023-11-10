// import React from "react";
// import { Switch, Route, BrowserRouter as Router,withRouter } from "react-router-dom";
//
// import Sidebar from "./dashboard/sidebar/Sidebar";
// import Topbar from "./dashboard/topbar/Topbar";
// import "./Routes.css";
// import Home from "../pages/dashboard/home/Home";
// import UserList from "../pages/dashboard/userList/UserList";
// import User from "../pages/dashboard/user/User";
// import NewUser from "../pages/dashboard/newUser/NewUser";
// import ProductList from "../pages/dashboard/productList/ProductList";
// import Product from "../pages/dashboard/product/Product";
// import NewProduct from "../pages/dashboard/newProduct/NewProduct";
// import Admin from "../pages/dashboard/admin/Admin.jsx";
// import AdminList from "../pages/dashboard/userAdmin/AdminList";
// import NewAdmin from "../pages/dashboard/newAdmin/NewAdmin.jsx";
// import SectionList from "../pages/dashboard/sectionList/sectionList";
// import NewSection from "../pages/dashboard/newSection/NewSection";
// import Section from "../pages/dashboard/section/Section";
// import ClassList from "../pages/dashboard/classList/ClassList";
// import NewClass from "../pages/dashboard/newClass/NewClass";
//
//
//  function DashboardRoutes() {
//   return (
//     <>
//
//       <Topbar />
//       <div className="dashboardContainer">
//         <Sidebar />
//         <Switch>
//           <Route path="/dashboard/section/:sectionId" component={NewSection} />
//           <Route path="/dashboard/newSection" component={NewSection} />
//           <Route path="/dashboard/listSection" component={SectionList} />
//
//           <Route path="/dashboard/classes/:classid" component={NewClass} />
//           <Route path="/dashboard/newClass" component={NewClass} />
//           <Route path="/dashboard/listClass" component={ClassList} />
//
//           <Route path="/dashboard/admin/:adminId" component={Admin} />
//           <Route path="/dashboard/admin" component={AdminList} />
//           <Route path="/dashboard/newAdmin" component={NewAdmin} />
//
//           <Route path="/dashboard/user/:userId" component={NewUser} />
//           <Route path="/dashboard/users" component={UserList} />
//           <Route path="/dashboard/newUser" component={NewUser} />
//
//           <Route path="/dashboard/product/:productId" component={Product} />
//           <Route path="/dashboard/products" component={ProductList} />
//           <Route path="/dashboard/newproduct" component={NewProduct} />
//           <Route path="/" component={Home} />
//         </Switch>
//       </div>
//     </>
//   );
// }
//
// export default withRouter(DashboardRoutes);
