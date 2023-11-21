import React, { useState, useEffect, useRef } from "react";
import "./chat.css";

interface Props {
	userResponse: string;
	botResponse: {
		purpose: string;
		message: string;
		options?: string[];
		sender: string;
	};
	sendUserResponse: string;
	optionClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface MessagesInfo {
	purpose?: string;
	message: string;
	options?: string[];
	sender: string;
}

const Chats: React.FC<Props> = (props) => {
	const [messages, setMessages] = useState<MessagesInfo[]>([]);
	const [typing, setTyping] = useState(false);
	const dummyRef = useRef<HTMLDivElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);

	// stacking up messages
	useEffect(() => {
		if (messages.length === 0) {
			setMessages([
				{
					purpose: "introduction",
					message: "Hi there",
					sender: "bot",
				},
			]);
		} else {
			// Simulate typing effect
			setTyping(true);

			let tempArray = [...messages];
			if (props.botResponse?.message == "") {
				tempArray.push({ message: props.sendUserResponse, sender: "user" });
				setMessages(tempArray);
			}

			setTimeout(() => {
				let temp2 = [...tempArray];
				temp2.push(props.botResponse);
				setMessages(temp2);
				setTyping(false);

				// Scroll to the new message
				if (dummyRef && dummyRef.current && bodyRef && bodyRef.current) {
					bodyRef.current.scrollTo({
						top: dummyRef.current.offsetTop,
						behavior: "smooth",
					});
				}
			}, 1000);
		}
	}, [props.sendUserResponse, props.botResponse]);

	// enable autoscroll after each message
	// useEffect(() => {
	// 	if (dummyRef && dummyRef.current && bodyRef && bodyRef.current) {
	// 		bodyRef.current.scrollTo({
	// 			top: dummyRef.current.offsetTop,
	// 			behavior: "smooth",
	// 		});
	// 	}
	// }, [messages]);

	return (
		<div className="message-container" ref={bodyRef}>
			{messages.map((chat) => (
				<div key={chat.message}>
					<div className={`message ${chat.sender}`}>
						<p>{chat.message}</p>
					</div>
					{chat.options ? (
						<div className="options">
							<div>
								<i className="far fa-hand-pointer"></i>
							</div>
							{chat.options.map((option) => (
								<p onClick={(e) => props.optionClick(e)} data-id={option} key={option}>
									{option}
								</p>
							))}
						</div>
					) : null}
					<div ref={dummyRef} className="dhide"></div>
				</div>
			))}
			{typing && (
				<div className="chating">
					<div className="typing-indicator">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Chats;
