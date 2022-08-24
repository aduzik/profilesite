import React, { useEffect, useState } from 'react';

export const useTitle = (title: string) => {
    useEffect(() => {
        const previousTitle = document.title;

        document.title = `Alex Duzik - ${title}`;

        return () => {
            document.title = previousTitle;
        }
    });
}

export const useAuthentication = () => {
    const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (typeof authenticated !== 'undefined') return;

        (async () => {
            const response = await fetch('/api/authentication', {
                method: "GET"
            });

            setAuthenticated(response.ok);

            if (!response.ok) {
                window.location.href = `/MicrosoftIdentity/Account/SignIn?returnUrl=${encodeURIComponent(window.location.href)}`;
            }
        })();
    })

    return !!authenticated;
}