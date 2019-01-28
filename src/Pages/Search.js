import React, { Component } from 'react';
import { Input, Card, Typography, CircularProgress, Avatar, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import AuthContext from '../context/auth-context';


const styles = theme => ({
    bigAvatar: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        width: 100,
        height: 100,
    }
});

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            name: '',
            picture: '',
            bio: '',
            repos: 0,
            loading: false

        }
    }

    static contextType = AuthContext;

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            loading: true
        }, () => setTimeout(this.getResults(), 4000));
    }

    getResults = () => {
        axios.get(`https://api.github.com/users/${this.state.searchInput}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    name: res.data.name,
                    picture: res.data.avatar_url,
                    bio: res.data.bio,
                    repos: res.data.public_repos,
                    loading: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    name: '',
                    picture: '',
                    bio: '',
                    repos: 0
                });
            });

        console.log(this.state.searchInput)
    }

    logoutHandler = () => {
        this.context.logout()
    }

    render() {

        // destructuring the state
        const { searchInput, name, picture, bio, repos } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <h1 style={{ color: 'white' }}>
                    Search page
                </h1>
                {/* Search Input  */}
                <Input
                    style={{ color: 'white' }}
                    placeholder="Enter text"
                    value={searchInput}
                    name='searchInput'
                    onChange={this.handleChange}
                />
                {/* result Section */}
                <Card style={{ width: '30rem', margin: '2rem auto' }} >
                    {this.state.loading ? <CircularProgress /> :
                        <React.Fragment>
                            <Typography variant="h5" component="h3">
                                {name}
                            </Typography>
                            {picture && <Avatar alt={name} src={picture} className={classes.bigAvatar} />}

                            <Typography component="p">
                                {bio && `Bio: ${bio}`}
                            </Typography>
                            <Typography component="p">
                                {repos === 0 ? '' : `Number of repository: #${repos}`}
                            </Typography>
                        </React.Fragment>
                    }
                </Card>
                <div>
                    <Button onClick={this.logoutHandler} variant="contained" color="primary">Logout</Button>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
