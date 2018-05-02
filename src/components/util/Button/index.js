import React from 'react';
import { Button } from 'reactstrap';

const styles = {
    backgroundColor: "#c3d887",
    borderColor: "#c3d887",
	boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.1)",
}

const PrimaryButton = ({onClick, block, children}) => {
    return <Button style={styles} onClick={onClick} block>{children}</Button>;
}

export default PrimaryButton;
