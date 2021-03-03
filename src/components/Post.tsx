import React from 'react';

function Post(props: any) {
    let { title, body } = props.view;
    return (
        <article className='viewer'>
            <h2 className='viewer-title'>{title || ''}</h2>
            <p className='viewer-content'>{body || ''}</p>
        </article>
    );
}

export default Post;
