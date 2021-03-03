import React from 'react';

function PostsList(props: any) {
    let { posts } = props.state;
    return (
        <ul className='posts'>
            {posts.map((post: any, index: number) => {
                return (
                    <li role='listitem' className='post-card' key={index}>
                        <h2 className='post-title'>{post.title}</h2>
                        <button
                            className='show-post'
                            onClick={() => {
                                fetch(
                                    'https://jsonplaceholder.typicode.com/posts/' +
                                        post.id
                                )
                                    .then((response) => response.json())
                                    .then((json) => {
                                        var updateView = {
                                            posts: props.state.posts,
                                            heading: props.state.heading,
                                            view: props.state.view,
                                        };

                                        updateView.view = json;

                                        props.setState(updateView);
                                    });
                            }}
                        >
                            View
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default PostsList;
