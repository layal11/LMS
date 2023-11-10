import React, {useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SessionContext from "../context/SessionContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateAdmins() {

  const classes = useStyles();
  const
      {
        errors,
        fetchAdmins,

    actions: { register },
        session: {
          user: { access_token },
        }
  } = useContext(SessionContext);
console.log(useContext(SessionContext));
  const [state, setValue] = useState({
    name:"",
    last_name:"",
    email: "",
    password: "",
  });

  const {name, email, password , last_name } = state;

  function setState(nextState) {
    setValue((prevState) => ({
      ...prevState,
      ...nextState,
    }));
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setState({ [name]: value });
  }

  async function handleSubmit(e) {
    e.nativeEvent.preventDefault();
    register( name, email, password,last_name);

    console.log("admin",fetchAdmins)
  }
  function refreshPage() {
    window.location.reload(false);
  }
//used to redirect
    const history = useHistory();

    const handleClick = () => {
      history.push("/DeleteTest");
    }


  return (
    <Container component="main" maxWidth="xs">
      {/*{*/}
      {/*  fetchAdmins && fetchAdmins.map((admin)=>{*/}
      {/*  return <p style={{color:"red"}}>{admin.name}</p>*/}
      {/*})*/}
      {/*}*/}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Admin
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="name"
                value={name}
                onChange={handleChange}
                autoFocus
              />
              {errors && Object.keys(errors).map((err)=>{

                if(err  === "name"){
                  return <p style={{color:"red"}}>{errors[err]}</p>
                }
              })}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                value={last_name}
                onChange={handleChange}
                autoFocus

              />
              {errors && Object.keys(errors).map((err)=>{

                if(err  === "last_name"){
                  return <p style={{color:"red"}}>{errors[err]}</p>
                }
              })}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors && Object.keys(errors).map((err)=>{

                if(err  === "email"){
                  return <p style={{color:"red"}}>{errors[err]}</p>
                }
              })}
              {/*{fetchAdmins && Object.keys(fetchAdmins).map((admin)=>{*/}
              {/*  return <p style={{color:"red"}}>{fetchAdmins[admin]}</p>*/}
              {/*})}*/}

            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={password}
                onChange={handleChange}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errors && Object.keys(errors).map((err)=>{

                if(err  === "password"){
                  return <p style={{color:"red"}}>{errors[err]}</p>
                }
              })}
            </Grid>
            <Grid item xs={12}>
              {/*<FormControlLabel*/}
              {/*  control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
              {/*  label="I want to receive inspiration, marketing promotions and updates via email."*/}
              {/*/>*/}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}

            onClick={(e) => {
              handleSubmit(e);
              {!errors && (
                  handleClick()
              )
              }


            }}
          >
            {!access_token && (
               <p style={{color:"red"}}>Successfully Created Admin</p>
            )}

            Create
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="\DeleteTest" variant="body2">
                Manage Admins
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}