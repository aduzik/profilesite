import React from 'react';

const Footer: React.FC = () => {
    return (
        <div>
            <div className='flex flex-row items-center'>
                <span>
                    Copyright &copy; 2022 Alex Duzik.
                </span>
                <span className='ml-auto text-xs text-stone-400'>
                    It looks like a website, and you're reading it, and I made it.
                </span>
            </div>
        </div>)
}

export default Footer;