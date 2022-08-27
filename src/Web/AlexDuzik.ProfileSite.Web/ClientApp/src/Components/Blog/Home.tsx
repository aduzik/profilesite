import React, { useEffect, useState } from 'react';
import { useTitle } from '../../util';
import { Post } from '../Admin/Types';

const Home: React.FC = () => {
    useTitle('Blog');

    const [posts, setPosts] = useState<Post[]>();

    useEffect(() => {
        if (typeof posts !== 'undefined') return;

        (async () => {
            const response = await fetch('/api/posts', {
                method: 'GET'
            });

            if (!response.ok) {
                setPosts([]);
                return;
            }

            const posts = await response.json() as Post[];
            setPosts(posts);
        })();
    });

    if (!posts) return (
        <div>Loading&hellip;</div>
    )

    return (
        <>
            {posts.map(p => {
                const date = new Date(p.date);
                return (
                    <article key={p.id} className='max-w-prose mt-4 mb-10 mx-auto'>
                        <header className='flex flex-row items-end border-b mb-4'>
                            <h1 className='font-serif font-bold text-4xl text-stone-600'>{p.title}</h1>
                            <div className='ml-auto text-sm text-stone-600'>{date.toLocaleDateString()}</div>
                        </header>
                        <main className='prose prose-stone prose-headings:font-serif  prose-a:text-emerald-600 prose-a:no-underline prose-a:border-b prose-a:border-b-transparent hover:prose-a:border-b-emerald-600 prose-a:transition-colors'>
                            {p.body}
                        </main>
                    </article>)
            })}
        </>
    )
};

export default Home;