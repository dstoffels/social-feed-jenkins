import React, { useState, useEffect } from 'react';
import { ReactComponent as ThumbsDown } from '../../SVG/thumbs-down-solid.svg';
import { ReactComponent as ThumbsUp } from '../../SVG/thumbs-up-solid.svg';
import './Post.css';

const Post = (props) => {
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);

	function handleLike(e) {
		setLiked(!liked);
		setDisliked(false);
	}

	function handleDislike(e) {
		setDisliked(!disliked);
		setLiked(false);
	}

	return (
		<div>
			<p style={{ fontWeight: 'bold' }}>{props.post.name}</p>
			<p>{props.post.body}</p>
			<span className="icons-span">
				<ThumbsUp
					className="like-btn"
					fill={liked ? 'green' : 'grey'}
					height="1.5em"
					style={{ 'margin-right': '1em' }}
					onClick={handleLike}
				/>
				<ThumbsDown
					className="like-btn"
					fill={disliked ? 'red' : 'grey'}
					height="1.5em"
					onClick={handleDislike}
				/>
			</span>
		</div>
	);
};

export default Post;
