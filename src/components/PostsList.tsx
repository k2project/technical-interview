import React from 'react';

function PostsList(props: any) {
    let { posts } = props.state;

    const handleItemClick = (e: any, post: any) => {
        props.setPostError('');

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
                props.setPostError(
                    'We are sorry but we have had trouble getting that post.'
                );
            });
    };

    if (!posts) return null;

    return (
        <ul className='posts-list' aria-label='posts list'>
            {posts.map((post: any, index: number) => {
                return (
                    <li role='listitem' key={index}>
                        <button
                            className='post-card'
                            onClick={(e) => handleItemClick(e, post)}
                        >
                            <span className='button show-post'>View</span>
                            <span>{post.title}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default PostsList;
