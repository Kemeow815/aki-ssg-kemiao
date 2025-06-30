/* eslint-disable @next/next/no-img-element */
"use client";

import { createContext, useContext } from "react";
import "@/components/ExtendedMarkdown/Chat/style.css";

type Sender = {
	name: string;
	avatar?: string;
	alignRight?: boolean;
};

const default_sender: Sender = {
	name: "Unknown",
};

class SenderManager {
	senders: { [key: string]: Sender } = {};
	initialized: boolean;
	constructor(initialized: boolean = false) {
		this.initialized = initialized;
	}
	getSenderByName(name: string): Sender | undefined {
		return this.senders[name];
	}
	addSender(s: Sender) {
		this.senders[s.name] = s;
	}
}

const sender_context = createContext<SenderManager>(new SenderManager());

function Item(props: {
	sender_name?: string;
	sender_avatar?: string;
	align_right?: boolean;
	readonly children?: string;
}) {
	const senderManager = useContext(sender_context);
	if (!senderManager.initialized) {
		throw Error("Conversation Item cannot be used outside Conversation!");
	}
	const sender: Sender =
		props.sender_name === undefined
			? default_sender
			: senderManager.getSenderByName(props.sender_name) === undefined
			? {
					name: props.sender_name,
					avatar: props.sender_avatar,
					alignRight: props.align_right,
			  }
			: senderManager.getSenderByName(props.sender_name)!;
	return (
		<div className={`chat-item ${sender.alignRight ? "self" : ""}`}>
			{sender.avatar === undefined ? (
				<span className="chat-avatar default">{sender.name.charAt(0)}</span>
			) : (
				<img className="chat-avatar" alt={sender.name} src={sender.avatar!} />
			)}
			<div className={`chat-content ${sender.alignRight ? "self" : ""}`}>
				<div className={`chat-sender ${sender.alignRight ? "self" : ""}`}>
					{sender.name}
				</div>
				<p className={`chat-text ${sender.alignRight ? "self" : ""}`}>
					{props.children}
				</p>
			</div>
		</div>
	);
}

function SenderItem(props: {
	sender_name: string;
	sender_avatar?: string;
	align_right?: boolean;
}) {
	const sender: Sender = {
		name: props.sender_name,
		avatar: props.sender_avatar,
		alignRight: props.align_right,
	};
	const senderManager = useContext(sender_context);
	if (!senderManager.initialized) {
		throw Error("Conversation Sender cannot be used outside Conversation!");
	}
	senderManager.addSender(sender);
	return <></>;
}

function Container(props: { readonly children?: React.ReactNode }) {
	return (
		<sender_context.Provider value={new SenderManager(true)}>
			<div className="chat-container not-prose">{props.children}</div>
		</sender_context.Provider>
	);
}

export { Container, SenderItem, Item };
export type { Sender };
