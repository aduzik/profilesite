import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Post } from '../Admin/Types';

type RouteParams = {
    year: string
    month: string
    slug: string
}

const SinglePost: React.FC = () => {
    const [post, setPost] = useState<Post | undefined>(undefined);

    const params = useParams<RouteParams>();

    useEffect(() => {
        if (post) return;

        const {
            year,
            month,
            slug
        } = params;

        if (!year || !month || !slug) return;

        (async () => {
            const response = await fetch(`/api/posts/${encodeURIComponent(year)}/${encodeURIComponent(month)}/${encodeURIComponent(slug)}`, {
                method: 'GET'
            });

            if (!response.ok) return;

            const post = await response.json() as Post;

            if (!post) return;

            setPost(post);
        })();
    });

    if (!post) return null;

    var date = new Date(post.date);

    return (
        <article className='max-w-prose mt-4 mb-10 mx-auto'>
            <header className='flex flex-row items-end border-b mb-4'>
                <h1 className='font-serif font-bold text-4xl text-stone-600'>{post.title}</h1>
                <div className='ml-auto text-sm text-stone-600'>{date.toLocaleDateString()}</div>
            </header>
            <main className='prose prose-stone prose-headings:font-serif  prose-a:text-emerald-600 prose-a:no-underline prose-a:border-b prose-a:border-b-transparent hover:prose-a:border-b-emerald-600 prose-a:transition-colors'>
                <ReactMarkdown>
                    {post.body}
                </ReactMarkdown>
            </main>
        </article>)
}

export default SinglePost