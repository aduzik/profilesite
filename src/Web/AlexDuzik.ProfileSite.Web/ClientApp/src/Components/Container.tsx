import React from 'react';

export type ContainerProps = React.PropsWithChildren;

const Container: React.FC<ContainerProps> = (props) => {
    const {
        children
    } = props;

    return (
        <div className='container mx-auto px-2'>
            {children}
        </div>
    )
}

export default Container;