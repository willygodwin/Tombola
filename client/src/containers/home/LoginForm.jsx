import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles({
    root: {
        maxWidth: "100%",
    },
    media: {
        height: 140,
    },
    error: {
        color: "#EF5350",
    },
});

const CssTextField = withStyles({
    root: {

        // Changing text of the input
        '&.MuiFormControl-root ': {
            color: '#FF6701',
            '&.MuiFormLabel-root.Mui-focused':
                { color: '#FF6701' }
        },

        //changing border of the input
        '& .MuiInput-root': {
            // color: '#FF6701',
            '&.MuiInput-underline:after': {
                borderColor: '#FF6701',
                borderBottom: '2px solid #FF6701',
                color: '#FF6701'
            },

            '&.MuiInput-underline.Mui-focused:after': {
                borderColor: '#FF6701',
                borderBottom: '2px solid #FF6701',
                color: '#FF6701'
            },
            '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
            }
        },
    },
})(TextField);

function LoginForm() {
    const history = useHistory();

    const classes = useStyles();

    const [errors, setErrors] = useState([]);

    const [payload, setPayload] = useState({});

    const handleChange = async (event) => {
        const type = event.target.name;

        // payload looks like: {
        //     email: '',
        //     password: '',
        // }
        setPayload({
            ...payload,
            [type]: event.target.value, // dynamically set the type of payload
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        // call api to login

        const response = await axios
            .post(
                "http://localhost:3001/api/login",
                {
                    email: payload.email,
                    password: payload.password,
                },
                {
                    withCredentials: true
                }
            )
            .then((response) => {
                history.push("/wall");
            })
            .catch((err) => {
                // not authenticated
                console.log(err);
                if (err.response.data.errors) {
                    const errorMsg = err.response.data.errors.map(
                        (err) => err.msg
                    );
                    // failed to register
                    setErrors([...errorMsg]);
                } else {
                    setErrors(['Whoops please enter your credentials']);
                }
            });
    };

    return (
        <Box>
            <Container maxWidth="xs">
                <Card style={{ marginTop: 50 }} className={classes.root}>
                    <Grid container justify="center">
                        <h1>Welcome</h1>
                    </Grid>
                    <CardContent>
                        <form onSubmit={onSubmit}>
                            <Grid
                                container
                                spacing={1}
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <AccountCircle />
                                </Grid>
                                <Grid item>
                                    <CssTextField
                                        id="input-with-icon-grid"
                                        name="email"
                                        label="Email"
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={1}
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <LockIcon />
                                </Grid>
                                <Grid item>
                                    <CssTextField
                                        id="input-with-icon-grid"
                                        name="password"
                                        type="password"
                                        label="Password"
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                        <article>
                            {errors.map((error) => (
                                <Typography
                                    className={classes.error}
                                    key={error}
                                    variant="overline"
                                    display="block"
                                    gutterBottom
                                >
                                    {error}
                                </Typography>
                            ))}
                        </article>
                    </CardContent>
                    <CardActions>
                        <Grid
                            container
                            justify="flex-end"
                            alignItems="flex-end"
                        >
                            <Button
                                onClick={onSubmit}
                                size="small"
                                color="primary"
                                style={{ color: '#FF6701' }}
                            >
                                Login
                            </Button>

                            <Button
                                onClick={() => history.push("/register")}
                                size="small"
                                color="primary"
                                style={{ color: '#FF6701' }}
                            >
                                Register
                            </Button>
                        </Grid>
                    </CardActions>
                </Card>
            </Container>
        </Box>
    );
}

export default LoginForm;
