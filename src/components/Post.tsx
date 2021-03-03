import React from 'react';

function Post(props: any) {
    if (props.postError) {
        return (
            <section>
                <p role='alert'>{props.postError}</p>
            </section>
        );
    }
    return (
        <article className='viewer'>
            <h2 className='viewer-title'>{props.view.title || ''}</h2>
            <p className='viewer-content'>{props.view.body || ''}</p>
        </article>
    );
}

export default Post;
