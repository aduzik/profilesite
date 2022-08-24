import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from './Types';

type RouteParams = {
    id: string
}

const PostDetail = () => {
    const { id } = useParams() as RouteParams;

    const [post, setPost] = useState<Post | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'GET',
                headers: [
                    ['Accept', 'application/json']
                ]
            });

            if (!response.ok) return;

            const post = await response.json() as Post;
            setPost(post);
        })();
    })

    if (!post) {
        return (
            <div>Loading&hellip;</div>
        )
    }

    const {
        title,
        body,
        date
    } = post;

    return (
        <div>
            <div>
                <button>Save</button>
                <button>Cancel</button>
            </div>
            <div>
                <input type="text" value={title} />
            </div>
            <div>
                <textarea value={body}></textarea>
            </div>
        </div>
    )
}

export default PostDetail;