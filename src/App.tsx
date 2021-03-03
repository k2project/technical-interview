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
            <section className='error-404'>
                <h1 className=' heading color--theme'>404 Error</h1>
                <p role='alert'>{error}</p>
            </section>
        );
    }

    return (
        <div className='App'>
            <header className='header'>
                <h1>{state.heading}</h1>
            </header>
            <main className='content'>
                {state.posts.length === 0 && (
                    <button className='button load-posts' onClick={handleClick}>
                        Fetch posts
                    </button>
                )}
                <div>
                    <PostsList state={state} setState={setState} />
                </div>

                {state.view && <Post view={state.view} />}
            </main>
        </div>
    );
}

export default App;
