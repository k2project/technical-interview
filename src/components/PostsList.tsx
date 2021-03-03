import React, { useState } from 'react';

function PostsList(props: any) {
    let { posts } = props.state;

    const [error, setError] = useState('');

    const handleItemClick = (e: any, post: any) => {
        setError('');

        fetch('https://jsonplaceholder.typicode.com/posts/' + post.id)
            .then((response) => response.json())
            .then((json) => {
                var updateView = {
                    posts: props.state.posts,
                    heading: props.state.heading,
                    view: props.state.view,
                };

                updateView.view = json;

                props.setState(updateView);
            })
            .catch((error) => {
                setError(
                    'We are sorry but we have had trouble getting that post.'
                );
            });
    };

    if (!posts) return null;

    if (error) {
        return (
            <section className='404-error'>
                <h1>404 Error</h1>
                <p role='alert'>{error}</p>
            </section>
        );
    }

    return (
        <ul className='posts' aria-label='posts list'>
            {posts.map((post: any, index: number) => {
                return (
                    <li role='listitem' className='post-card' key={index}>
                        <button
                            className='show-post'
                            onClick={(e) => handleItemClick(e, post)}
                        >
                            <span>View</span>
                            <span>{post.title}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default PostsList;
