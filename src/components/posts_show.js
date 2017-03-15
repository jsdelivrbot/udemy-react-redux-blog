import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index';

class PostsShow extends Component {
    componentWillMount() {
        fetchPost(this.props.params.id)
    }

    render() {
        return (
            <div>Show post {this.props.params.id}</div>
        );
    }
}

function mapStateToProps(state) {
    return { post: state.post };
}

export default connect(null, { fetchPost })(PostsShow);