import React from 'react';
import { Button } from 'reactstrap';

const styles = {
    backgroundColor: "#6284ea",
    borderColor: "#6284ea"
}

const PrimaryButton = ({onClick, block, children}) => {
    return <Button style={styles} onClick={onClick} block>{children}</Button>;
}

export default PrimaryButton;
