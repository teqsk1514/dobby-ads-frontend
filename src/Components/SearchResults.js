import React, { Component } from 'react';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.searchInput !== nextProps.searchInput) {
            this.setState({
                search: nextProps.searchInput
            });
        }
        console.log(this.state.search)
        // axios.get(`https://api.github.com/users/${this.props.searchInput}`)
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }
    render() {

        const { searchInput } = this.props

        return (
            <div>
                {searchInput}
            </div>
        )
    }
}

export default SearchResults;
