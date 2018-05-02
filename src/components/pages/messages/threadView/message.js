import React from 'react';

export default ({messageText, messageSender, currentUser}) => {
	let classNames = ["message"];
	const position = currentUser == messageSender ? "right" : "left";	
	classNames.push(position);

	return (
		<div className={classNames.join(' ')}>
			<div className="bubble">
				<p>{messageText}</p>
			</div>
		</div>
	);
}
