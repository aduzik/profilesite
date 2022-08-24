import React from 'react';

export type ContainerProps = React.PropsWithChildren<{
    className?: string
}>;

const Container: React.FC<ContainerProps> = (props) => {
    const {
        className,
        children
    } = props;

    let containerClasses = 'container mx-auto px-2';
    if (className) {
        containerClasses = [containerClasses, className].join(' ');
    }

    return (
        <div className={containerClasses}>
            {children}
        </div>
    )
}

export default Container;