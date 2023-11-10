import React, { useContext } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Sidebar from "./dashboard/sidebar/Sidebar";
import Topbar from "./dashboard/topbar/Topbar";
import "./Routes.css";
import Home from "../pages/dashboard/home/Home";
import UserList from "../pages/dashboard/userList/UserList";
import NewUser from "../pages/dashboard/newUser/NewUser";
import ProductList from "../pages/dashboard/productList/ProductList";
import Product from "../pages/dashboard/product/Product";
import NewProduct from "../pages/dashboard/newProduct/NewProduct";
import Admin from "../pages/dashboard/admin/Admin.jsx";
import AdminList from "../pages/dashboard/userAdmin/AdminList";
import NewAdmin from "../pages/dashboard/newAdmin/NewAdmin.jsx";
import SectionList from "../pages/dashboard/sectionList/sectionList";
import NewSection from "../pages/dashboard/newSection/NewSection";
import ClassList from "../pages/dashboard/classList/ClassList";
import NewClass from "../pages/dashboard/newClass/NewClass";
import SignIn from '../pages/Signin';
import CreateAdmins from '../pages/CreateAdmins';
import Gettest from './Gettest';
import ManageClasses from '../pages/ManageClasses';
import DeleteTest from "../pages/DeleteTest";
import ManageAdmins from "../pages/ManageAdmins";
import User from "../pages/dashboard/user/User"
import '../pages/dashboard/user/user.css'
import styled,{ThemeProvider} from "styled-components";
import {useDarkMode} from "../styles/useDarkMode";
import {GlobalStyles,lightTheme,darkTheme} from "../styles/gloabalStyles";
import SessionContext from "../context/SessionContext";

const Container = styled.div`

`


export default function Routes(){
    const [theme,toggleTheme] = useDarkMode();
    const themeMode = theme ==='light'  ? lightTheme : darkTheme;
    const {
        session: {
            user: { access_token },
        },
    } = useContext(SessionContext);
    return (
        <>
            <ThemeProvider theme={themeMode}>


                <Container>
                    <GlobalStyles />
                    { access_token && <Topbar access_token={access_token} theme={theme} toggleTheme={toggleTheme} />}
                    <div className="dashboardContainer">
                        { access_token &&   <Sidebar access_token={access_token} /> }
                        <Switch>
                            <PrivateRoute path="/section/:sectionId" component={NewSection} access_token={access_token} />
                            <PrivateRoute path="/newSection" component={NewSection} access_token={access_token} />
                            <PrivateRoute path="/listSection" component={SectionList} access_token={access_token} />

                            <PrivateRoute path="/classes/:classid" component={NewClass} access_token={access_token} />
                            <PrivateRoute path="/newClass" component={NewClass} access_token={access_token} />
                            <PrivateRoute path="/listClass" component={ClassList} access_token={access_token} />

                            <PrivateRoute path="/admin/:adminId" component={Admin} access_token={access_token} />
                            <PrivateRoute path="/admin" component={AdminList} access_token={access_token} />
                            <PrivateRoute path="/newAdmin" component={NewAdmin} access_token={access_token} />

                            <PrivateRoute path="/user/:userId" component={User} access_token={access_token} />
                            <PrivateRoute path="/users" component={UserList} access_token={access_token} />
                            <PrivateRoute path="/newUser" component={NewUser} access_token={access_token} />

                            <PrivateRoute path="/product/:productId" component={Product} access_token={access_token} />
                            <PrivateRoute path="/products" component={ProductList} access_token={access_token} />
                            <PrivateRoute path="/newproduct" component={NewProduct} access_token={access_token} />
                            <PrivateRoute path="/" component={Home} exact access_token={access_token}/>

                            <LoginRoute path="/signin" component={SignIn} access_token={access_token} />

                            <PrivateRoute path="/Gettest"  component={Gettest} access_token={access_token} />
                            <PrivateRoute path="/ManageAdmins"  component={ManageAdmins} />
                            <PrivateRoute path="/DeleteTest"  component={DeleteTest} access_token={access_token} />
                            <PrivateRoute path="/CreateAdmins" component={CreateAdmins} access_token={access_token}/>
                            <Route path="/ManageClasses" component={ManageClasses}/>
                        </Switch>
                    </div>
                </Container>
            </ThemeProvider>
        </>
    )
}
function LoginRoute({ path, component: Component, access_token, ...props }) {
    return (
        <Route
            {...props}
            path={path}
            render={(props) =>
                access_token ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
}
function LoginRouteSignUp({ path, component: Component, access_token, ...props }) {
    return (
        <Route
            {...props}
            path={path}
            render={(props) =>
                access_token ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
}
function PrivateRoute({ path, component: Component, access_token, ...props }) {
    return (
        <Route
            {...props}
            path={path}
            render={(props) =>
                access_token ? <Component {...props} /> : <Redirect to="/signin" />
            }
        />
    );
}