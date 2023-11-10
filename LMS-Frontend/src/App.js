
import {useHistory, withRouter} from 'react-router-dom';
import './App.css';
import Routes from './components/Routes';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionProvider from "./context/SessionProvider";
import CssBaseline from '@material-ui/core/CssBaseline';



function App() {

  return (
<>

    <CssBaseline />
  <SessionProvider>
    <Routes/>
  </SessionProvider>
  <ToastContainer/>

</>
  )
 
}

export default withRouter(App);
