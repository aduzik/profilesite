import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';

export type PostEditorProps = {
    editorTitle?: string
    title?: string
    onTitleChange?: (title: string) => void
    body?: string
    onBodyChange?: (body: string) => void
    slug?: string
    onSlugChange?: (slug: string) => void
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
        slug,
        onSlugChange,
        onSaveClick,
        onCancelClick
    } = props;

    const onTitleTextChanged = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        if (onTitleChange) onTitleChange(e.currentTarget.value);
    }, [onTitleChange]);

    const onSlugTextChanged = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        if (onSlugChange) onSlugChange(e.currentTarget.value);
    }, [onSlugChange]);

    const onBodyTextChanged = useCallback((value: string | undefined) => {
        if (onBodyChange) onBodyChange(value || '');
    }, [onBodyChange]);

    const onSaveButtonClicked = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (onSaveClick) onSaveClick();
    }, [onSaveClick]);

    const onCancelButtonClicked = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (onCancelClick) onCancelClick();
    }, [onCancelClick]);

    const previewContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resizeHandler = () => {
            const previewContainer = previewContainerRef.current;
            if (!previewContainer) return;

            var parent = previewContainer.parentElement;
            previewContainer.style.maxWidth = `${parent?.clientWidth}px`;
            previewContainer.style.maxHeight = `${parent?.clientHeight}px`;
        };

        requestAnimationFrame(() => {
            resizeHandler();
        })

        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    })

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
            <div className='my-3'>
                <label htmlFor='slug'>Slug</label>
                <div>
                    <input className='w-1/2' type='text' id='slug' value={slug} onChange={onSlugTextChanged} />
                </div>
            </div>
            <div className='my-3 flex-grow flex flex-col'>
                <label htmlFor='body'>Body</label>
                <div className='flex-grow flex flex-row gap-3'>
                    <div className='basis-1/2'>
                        <Editor
                            language='markdown'
                            value={body}
                            onChange={onBodyTextChanged} />
                    </div>
                    <div className='basis-1/2'>
                        <div ref={previewContainerRef} className='w-full max-h-0 overflow-auto prose max-w-none prose-stone prose-headings:font-serif prose-a:text-emerald-600 prose-a:no-underline prose-a:border-b prose-a:border-b-transparent hover:prose-a:border-b-emerald-600 prose-a:transition-colors'>
                            <ReactMarkdown>
                                {body || ''}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostEditor;