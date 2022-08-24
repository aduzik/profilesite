import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from './Types';

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>();

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/posts', {
                method: 'GET',
                headers: [
                    ['Accept', 'application/json']
                ]
            });

            if (!response.ok) return;

            const posts = await response.json() as Post[];
            setPosts(posts);
        })();
    });

    if (!posts) {
        return <div>Loading&hellip;</div>
    }

    return (
        <table className='w-full'>
            <thead>
                <tr>
                    <th className='text-left'>Title</th>
                    <th className='text-left'>Date</th>
                </tr>
            </thead>
            <tbody>
                {posts.map(p => {
                    const date = new Date(p.date);

                    return (
                        <tr key={p.id}>
                            <td><Link to={`/_admin/posts/${p.id}`}>{p.title}</Link></td>
                            <td>{date.toLocaleDateString()} {date.toLocaleTimeString()}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table >
    )
}

export default Home;