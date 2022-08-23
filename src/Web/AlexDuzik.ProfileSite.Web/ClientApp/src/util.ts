import React, { useEffect } from 'react';

export const useTitle = (title: string) => {
    useEffect(() => {
        const previousTitle = document.title;

        document.title = `Alex Duzik - ${title}`;

        return () => {
            document.title = previousTitle;
        }
    });
}