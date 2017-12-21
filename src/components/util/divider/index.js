import React from 'react';

const Divider = ({orientation}) => {
    const className=`divider-${orientation}`;
    console.log(className);
    return (
        <div className={className}></div>
    );
}

export default Divider;
