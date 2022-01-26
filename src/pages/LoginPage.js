import React, {
    useState,
    useEffect
} from 'react';
import 'firebase/auth';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../components/Footer';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import {
    CircularProgress,
    Avatar,
    Button,
    // CssBaseline,
    TextField,
    // FormControlLabel,
    // Checkbox,
    // Link,
    Paper,
    Box,
    Grid,
    Typography,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

//redux
import { useDispatch, useSelector } from "react-redux";
import { 
    signIn, 
    // getCurrentUser, 
    // signOut 
} from "../redux/actions/authAction";

// let auth = firebase.auth();

//test@gmail.com
//admin@denston.com
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
    // const [isLoginFail, setIsLoginFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [currentUser, setCurrentUser] = useState(null);

    // eslint-disable-next-line no-unused-vars
    const [message, setMessage] = useState('');

    const { isLoginFail } = useSelector((state) => state.authReducer);

    const { 
        // register, 
        // errors, 
        handleSubmit, 
        control 
    } = useForm({
        resolver: yupResolver(loginSchema)
    });

    useEffect(() => {
        // dispatch(getCurrentUser());
    }, [isLoginFail]);

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

    };

    return (
        <Grid container component="main" className={classes.root}>
            {/* <CssBaseline /> */}
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
                        {isLoginFail && 
                            <Box pt={4} >
                                <p style={{ color: 'red' }}>email หรือ password ไม่ถูกต้อง</p>
                            </Box>
                        }
                        {/* Email */}
                        <Box pt={4} >
                            <Controller
                                name="email"
                                id="email"
                                control={control}
                                defaultValue=''
                                rules={{ required: true }}
                                render={({ field, formState }) =>
                                    <>
                                        <TextField
                                            {...field}
                                            label="email"
                                            variant="outlined"
                                            fullWidth
                                            error={!!formState.errors?.email}
                                            // required
                                            autoComplete="off"
                                            autoFocus
                                        />
                                        {/* error occur */}
                                        <Typography variant="body1" color="error">
                                            {
                                                !!formState.errors?.email &&
                                                formState.errors?.email.message
                                            }
                                        </Typography>
                                    </>
                                }
                            />
                        </Box>
                        {/* Password */}
                        <Box pt={2} >
                            <Controller
                                name="password"
                                id="password"
                                control={control}
                                defaultValue=''
                                rules={{ required: true }}
                                render={({ field, formState }) =>
                                    <>
                                        {/* Category */}
                                        <TextField
                                            {...field}
                                            label="password"
                                            type="password"
                                            variant="outlined"
                                            fullWidth
                                            error={!!formState.errors?.password}
                                            // required
                                            autoComplete="off"
                                            autoFocus
                                        />
                                        {/* error occur */}
                                        <Typography variant="body1" color="error">
                                            {
                                                !!formState.errors?.password &&
                                                formState.errors?.password.message
                                            }
                                        </Typography>
                                    </>
                                }
                            />
                        </Box>
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

                        <Box mt={5}>
                            <Footer />
                        </Box>
                    </form>

                </div>
            </Grid>
        </Grid>
    );
};