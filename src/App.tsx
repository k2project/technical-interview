import React, { useState } from 'react';
import Post from './components/Post';
import PostsList from './components/PostsList';

function App(props: any) {
    const [state, setState] = useState(props.initialState);
    const [error, setError] = useState('');

    const getPosts = (cb: any) => {
        setError('');
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
            })
            .catch((error) => {
                setError('Something went wrong');
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

    if (error) {
        return (
            <section>
                <h1>404 Error</h1>
                <p>{error}</p>
            </section>
        );
    }

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
