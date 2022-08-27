import React, { useCallback, useState } from 'react';
import PostEditor from './PostEditor';
import { useNavigate } from 'react-router-dom';

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const onSave = useCallback(() => {
        (async () => {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);

            const result = await fetch('/api/posts', {
                method: 'POST',
                body: formData
            });

            if (!result.ok) return;

            navigate('/_admin');
        })();
    }, [title, body, navigate]);

    const onCancel = useCallback(() => {
        navigate('/_admin');
    }, [navigate]);

    return (
        <PostEditor
            editorTitle='New Post'
            title={title}
            onTitleChange={setTitle}
            body={body}
            onBodyChange={setBody}
            onSaveClick={onSave}
            onCancelClick={onCancel} />
    )
}

export default CreatePost;