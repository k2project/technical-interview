import React, { useState } from 'react';
import Post from './components/Post';
import PostsList from './components/PostsList';

function App(props: any) {
    const [state, setState] = useState(props.initialState);

    const getPosts = (cb: any) => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => {
                const result: {
                    id: number;
                    title: string;
                    body: string;
                    userID: number;
                }[] = [];

                json.forEach(
                    (record: {
                        id: number;
                        title: string;
                        body: string;
                        userID: number;
                    }) => result.push(record)
                );

                cb(result);
            });
    };

    const handleClick = () => {
        getPosts((values: any) => {
            var update = {
                posts: state.posts,
                heading: state.heading,
                view: state.view,
            };

            update.posts = values;

            setState(update);
        });
    };

    return (
        <div className='App'>
            <h1 className='heading'>{state.heading}</h1>
            <div className='content'>
                <button className='load-posts' onClick={handleClick}>
                    Fetch posts
                </button>

                <PostsList state={state} setState={setState} />

                {state.view && <Post view={state.view} />}
            </div>
        </div>
    );
}

export default App;
