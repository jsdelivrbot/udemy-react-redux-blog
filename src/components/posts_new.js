import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        this.props.createPost(props)
            .then(() => {
                // Blog post created, route the user to the index
                // We navigate by calling this.context.router.push
                // with the new path to navigate to.
                this.context.router.push('/');    
            });
    }

    invalidClass(field) {
        return field.touched && field.invalid ? 'form-group has-danger' : 'form-group';
    }

    render() {
        const { fields: { title, categories, content }, handleSubmit } = this.props;


        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create a new post</h3>
                <div className={this.invalidClass(title)}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title} />
                    <div className="text-help">
                        { title.touched ? title.error : '' }
                    </div>
                </div>
                <div className={this.invalidClass(categories)}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories} />
                    <div className="text-help">
                        { categories.touched ? categories.error : '' }
                    </div>
                </div>
                <div className={this.invalidClass(content)}>
                    <label>Content</label>
                    <textarea className="form-control" {...content} />
                    <div className="text-help">
                        { content.touched ? content.error : '' }
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = 'Enter a username';
    }
    if (!values.categories) {
        errors.categories = 'Enter at least a category';
    }
    if (!values.content) {
        errors.content = 'Enter some content';
    }

    return errors;
}

// Connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
    form: 'PostsNewForm',
    fields: [
        'title', 
        'categories', 
        'content'
    ],
    validate
}, null, { createPost } )(PostsNew);