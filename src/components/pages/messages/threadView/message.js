import React from 'react';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default ({message_text, curr_user, msg_sender}) => {
	{
		const position = curr_user==msg_sender ? "right" : "left";
		var class_name = ["bubble"];
		class_name.push(position);
	}
    return (
		<div className={class_name.join('-')}>
			<Chip style={styles.chip}> {message_text} </Chip>
		</div>
    );
}
