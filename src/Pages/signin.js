import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
    Avatar,
    Button,
    CssBaseline,
    FormControl,
    Input,
    InputLabel,
    Paper,
    Typography
} from '@material-ui/core';
import { LockOpen } from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';


import AuthContext from '../context/auth-context';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends Component {

    state = {
        email: '',
        password: '',
        errors: {}
    }

    static contextType = AuthContext;

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log('clicked');
        const loginData = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log(loginData);
        axios.post('http://localhost:5000/user/login', {
            email: this.state.email,
            password: this.state.password,
        })
            .then(res => {
                console.log(res.data);
                if (res.data.token) {
                    this.context.login(res.data.token)
                }
            })
            .catch(err => {
                console.log(err.response.data);
                this.setState({
                    errors: (err.response.data)
                });
            });
    }



    static contextType = AuthContext;

    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOpen />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
        </Typography>
                    <form onSubmit={this.submitHandler} className={classes.form}>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange} />
                            {errors.email && <Typography variant="caption" color="error">
                                {errors.email}
                            </Typography>}
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange} />
                            {errors.password && <Typography variant="caption" color="error">
                                {errors.password}
                            </Typography>}
                        </FormControl>



                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign in
                        </Button>
                        <Link style={{ textDecoration: 'none' }} to='/register'>
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Go to the SignUp Page
                            </Button>
                        </Link>
                    </form>
                </Paper>
            </main>
        )
    }
}


SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);