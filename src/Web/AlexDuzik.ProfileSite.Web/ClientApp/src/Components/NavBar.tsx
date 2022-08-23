import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

interface NavBarLinkProps {
    text: string
    url: string
}

const NavBar: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    const toggleExpanded = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded, setExpanded]);

    let navClasses = [
        expanded ? 'block' : 'hidden',
        'transition-all',
        expanded ? '-translate-y-[20px]' : '-translate-y-[20px]',
        'opacity-0',
        'md:block',
        'md:opacity-100',
        'md:transition-none',
        'md:transform-none',
        'md:ml-3'
    ]

    useEffect(() => {
        const nav = navRef.current!;

        requestAnimationFrame(() => {
            if (expanded) {
                nav.classList.remove('-translate-y-[20px]', 'opacity-0');
                nav.classList.add('translate-y-0', 'opacity-100');
            }
        });
    }, [expanded]);

    return (
        <header className='md:flex md:flex-row md:items-center'>
            <div className='flex flex-row items-center'>
                <h1 className='font-serif text-xl text-emerald-600'>
                    <NavLink to='/' className='block px-3 py-3'>Alex Duzik</NavLink>
                </h1>
                <div className='ml-auto md:hidden px-2'>
                    <button type='button' onClick={toggleExpanded} className='px-2'>
                        <span className='inline-block w-[20px] text-center'>
                            <FontAwesomeIcon icon={(expanded ? faClose : faBars)} />
                        </span>
                        <span className='sr-only'>Expand/Collapse</span>
                    </button>
                </div>
            </div>
            <nav ref={navRef} className={navClasses.join(' ')}>
                <ul className='flex flex-row'>
                    <li>
                        <NavBarLink
                            text="Profile"
                            url="/profile" />
                    </li>
                    <li>
                        <NavBarLink
                            text="Contact"
                            url="/contact" />
                    </li>
                </ul>
            </nav>
        </header>
    )
}

const NavBarLink: React.FC<NavBarLinkProps> = (props) => {
    const {
        text,
        url
    } = props;

    type StyleProps = {
        isActive: boolean
    }

    function styleLink(props: StyleProps) {
        const { isActive } = props;

        let styles = [
            'inline-block', 'relative', 'px-2', 'py-2', 'hover:text-emerald-600', 'hover:after:content-[""]', 'after:bg-emerald-600', 'after:absolute', 'after:left-1/2', 'after:right-1/2', 'after:bottom-0', 'after:h-[2px]', 'hover:after:left-2', 'hover:after:right-2', 'after:transition-all', 'transition-colors'
        ];

        if (isActive) {
            styles.push('font-bold', 'text-emerald-600');
        }

        return styles.join(' ');
    }

    return (
        <div className='block mx-2'>
            <NavLink to={url} className={styleLink}>
                {text}
            </NavLink>
        </div>)
}

export default NavBar;