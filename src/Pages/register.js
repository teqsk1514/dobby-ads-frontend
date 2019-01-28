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
import { LockRounded } from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';

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

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log('clicked');
        console.log('clicked');
        const registerData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        }
        console.log(registerData);
        axios.post('http://localhost:5000/user/register', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        })
            .then(res => {
                console.log(res.data);
                this.props.history.push('/login');
            })
            .catch(err => {
                console.log(err.response.data);
                this.setState({
                    errors: (err.response.data)
                });
            });
    }




    render() {
        const { classes } = this.props;
        const { errors } = this.state;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockRounded />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
        </Typography>
                    <form onSubmit={this.submitHandler} className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input id="name" name="name" autoComplete="name" autoFocus onChange={this.handleChange} />
                            {errors.name && <Typography variant="caption" color="error">
                                {errors.name}
                            </Typography>}
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" onChange={this.handleChange} />
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
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password2">Repeat Password</InputLabel>
                            <Input name="password2" type="password" id="password2" autoComplete="current-password" onChange={this.handleChange} />
                            {errors.password2 && <Typography variant="caption" color="error">
                                {errors.password2}
                            </Typography>}
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Link style={{ textDecoration: 'none' }} to='/login'>
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Go to the Login Page
                        </Button>
                        </Link>
                    </form>
                </Paper>
            </main>
        )
    }
}


Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);