import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';

export type PostEditorProps = {
    editorTitle?: string
    title?: string
    onTitleChange?: (title: string) => void
    body?: string
    onBodyChange?: (body: string) => void
    onSaveClick?: () => void
    onCancelClick?: () => void
}

const PostEditor: React.FC<PostEditorProps> = (props) => {
    const {
        editorTitle,
        title,
        onTitleChange,
        body,
        onBodyChange,
        onSaveClick,
        onCancelClick
    } = props;

    const onTitleTextChanged = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        if (onTitleChange) onTitleChange(e.currentTarget.value);
    }, [onTitleChange]);

    const onBodyTextChanged = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
        if (onBodyChange) onBodyChange(e.currentTarget.value);
    }, [onBodyChange]);

    const onSaveButtonClicked = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (onSaveClick) onSaveClick();
    }, [onSaveClick]);

    const onCancelButtonClicked = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (onCancelClick) onCancelClick();
    }, [onCancelClick]);

    const canSave = title && title.length > 0 && body && body.length > 0;

    return (
        <>
            <div className='flex flex-row items-center'>
                {editorTitle &&
                    <h1 className='font-serif text-3xl mt-6 mb-3'>{editorTitle}</h1>}
                <ul className='ml-auto block'>
                    <li className='inline-block'>
                        <button className='border py-1 px-3 disabled:text-stone-500' disabled={!canSave} onClick={onSaveButtonClicked}><FontAwesomeIcon icon={faSave} /> Save</button>
                    </li>
                    <li className='inline-block'>
                        <button className='border py-1 px-3 disabled:text-stone-500' onClick={onCancelButtonClicked}><FontAwesomeIcon icon={faClose} /> Cancel</button>
                    </li>
                </ul>
            </div>
            <div className='my-3'>
                <label htmlFor='title'>Title</label>
                <div>
                    <input className='w-full' type="text" id="title" value={title} onChange={onTitleTextChanged} />
                </div>
            </div>
            <div className='my-3 flex-grow flex flex-col'>
                <label htmlFor='body'>Body</label>
                <textarea className='flex-grow' id='body' value={body} onChange={onBodyTextChanged}></textarea>
            </div>
        </>
    )
}

export default PostEditor;