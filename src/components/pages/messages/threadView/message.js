import React from 'react';

export default ({messageText, messageSender, currentUser}) => {
	let classNames = ["message"];
	const position = currentUser == messageSender ? "self" : null;
	classNames.push(position);

	return (
		<div className={classNames.join(' ')}>
			<div className="messages--profile-pic">
			</div>
			<div className="bubble">
				<p>{messageText}</p>
			</div>
		</div>
	);
}
