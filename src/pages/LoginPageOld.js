import React, {
  useState,
  useEffect
} from 'react';
import firebase from '../firebase';
import 'firebase/auth';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../components/Footer';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  CircularProgress,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

//redux
import { useDispatch, useSelector } from "react-redux";
import { signIn, getCurrentUser, signOut } from "../redux/actions/authAction";

let auth = firebase.auth();

//test@gmail.com
//123456
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("รูปแบบอีเมล์ไม่ถูกต้อง"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    color: 'red',
    fontSize: '0.9rem',
    marginTop: '0.2rem'
  }
}));

export default function LoginPage() {

  let navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('');

  // const profile = useSelector((state) => state.authReducer.profile);

  const { register, errors, handleSubmit } = useForm({
    // validationSchema: loginSchema
    resolver: yupResolver(loginSchema)
  });

  useEffect(() => {
    // dispatch(getCurrentUser());
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      // dispatch(signIn(data.email, data.password, history));
      dispatch(signIn(data.email, data.password, navigate));
      // history.replace('/');
    } catch (e) {
      setMessage(e.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 900);
    }

  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
            {isLoginFail && <p style={{ color: 'red' }}>email หรือ password ไม่ถูกต้อง</p>}
            {/* Email */}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              //autoComplete="email"
              inputRef={register}
              // error={!!errors.email}
              autoFocus
            />
            {/* {errors.email && <p className={classes.errorMessage}>{errors.email.message}</p>} */}
            {/* Password */}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              inputRef={register}
              // error={!!errors.password}
            />
            {/* {errors.password && <p className={classes.errorMessage}>{errors.password.message}</p>} */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {
              isLoading
                ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    marginBottom={3}
                  >
                    <CircularProgress />
                  </Box>
                )
                : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                )
            }
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Footer />
            </Box>
          </form>
        
        </div>
      </Grid>
    </Grid>
  );
}