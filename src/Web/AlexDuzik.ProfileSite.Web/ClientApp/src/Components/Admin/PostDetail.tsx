import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostEditor from './PostEditor';
import { Post } from './Types';

type RouteParams = {
    id: string
}

const PostDetail = () => {
    const { id } = useParams() as RouteParams;
    const [post, setPost] = useState<Post | undefined>(undefined);
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [slug, setSlug] = useState<string | undefined>(undefined);
    const [body, setBody] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if (post) return;

        (async () => {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'GET',
                headers: [
                    ['Accept', 'application/json']
                ]
            });

            if (!response.ok) return;

            const post = await response.json() as Post;
            const {
                title,
                body,
                slug
            } = post;

            setTitle(title);
            setSlug(slug);
            setBody(body);
            setPost(post);
        })();
    });

    const onSave = useCallback(() => {
        if (!title || !body || !slug) return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('body', body);

        (async () => {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) return;

            navigate('/_admin');
        })();
    }, [id, title, body, slug, navigate]);

    const onCancel = useCallback(() => {
        navigate('/_admin');
    }, [navigate]);

    if (!post) {
        return (
            <div>Loading&hellip;</div>
        )
    }

    return (
        <PostEditor
            editorTitle='Edit Post'
            title={title}
            onTitleChange={setTitle}
            slug={slug}
            onSlugChange={setSlug}
            body={body}
            onBodyChange={setBody}
            onSaveClick={onSave}
            onCancelClick={onCancel} />
    )
}

export default PostDetail;