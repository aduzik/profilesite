import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from './Types';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';

type PostRowProps = {
    post: Post
    onDelete: () => void
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>();
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof posts !== 'undefined') return;

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

    const onCreatePostClick = useCallback(() => {
        navigate("/_admin/posts/create");
    }, [navigate])

    const onDeletePost = useCallback(() => {
        setPosts(undefined);
    }, []);

    if (!posts) {
        return <div>Loading&hellip;</div>
    }

    return (
        <div>
            <div className='flex flex-row items-center'>
                <h1 className='font-serif text-3xl mt-6 mb-3'>Admin</h1>
                <ul className='ml-auto block'>
                    <li className='inline-block'>
                        <button className='border py-1 px-3 disabled:text-stone-500' onClick={onCreatePostClick}><FontAwesomeIcon icon={faAdd} /> Create Post</button>
                    </li>
                </ul>
            </div>
            {posts.length > 0 ?
                <table className='w-full'>
                    <colgroup>
                        <col width='100%' />
                        <col />
                    </colgroup>
                    <thead>
                        <tr>
                            <th className='p-2 text-left'>Title</th>
                            <th className='p-2 text-left'>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(p => <PostRow
                            key={p.id}
                            post={p}
                            onDelete={onDeletePost} />)}
                    </tbody>
                </table> :
                <div> No Posts</div>}
        </div>
    )
}

const PostRow: React.FC<PostRowProps> = (props) => {
    const {
        post: {
            id,
            title,
            date: dateString
        },
        onDelete
    } = props;

    const onDeleteClick = useCallback(() => {
        (async () => {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) return;

            onDelete();
        })();
    }, [id, onDelete]);

    const date = new Date(dateString);

    return (
        <tr className="group hover:bg-stone-100">
            <td className='p-2'><Link to={`/_admin/posts/${id}`}>{title}</Link></td>
            <td className='p-2 whitespace-nowrap'>{date.toLocaleDateString()} {date.toLocaleTimeString()}</td>
            <td className='p-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity'>
                <button title="Delete post" onClick={onDeleteClick}>
                    <FontAwesomeIcon className='text-red-500' icon={faTrash} />
                    <span className="sr-only">Delete</span>
                </button>
            </td>
        </tr>
    )
}

export default Home;