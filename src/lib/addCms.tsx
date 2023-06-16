import React from "react";
import { render } from "react-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export async function addCms() {
	// if (typeof window !== "undefined") return;

	const { default: CMS } = await import("netlify-cms-app");

	CMS.init();
	CMS.registerPreviewStyle("cms.css");
	function PostPreview(props) {
		const { entry } = props;
		const group = entry.getIn(["data", "group"]);

		return (
			<div className="main-box">
			<div className="category">{entry.getIn(["data", "category"])}</div>
			<div className={`container ${entry.getIn(["data", "color"])}`}>
				<div className={`title ${entry.getIn(["data", "color"])}`}>{entry.getIn(["data", "title"])}</div>
				<div className="points">
				<div className="price">{entry.getIn(["data", "price"])}</div>
				<div className="point1">{entry.getIn(["data", "point1"])}</div>
				<div className="point2">{entry.getIn(["data", "point2"])}</div>
				<div className="point3">{entry.getIn(["data", "point3"])}</div>
				<div className="point4">{entry.getIn(["data", "point4"])}</div>
				<div className="point5">{entry.getIn(["data", "point5"])}</div>
				</div>
				<div className="description">{entry.getIn(["data", "text"])}</div>
			</div>
			<ul className="misc-info list">
				<li className="order list-item">Order: {entry.getIn(["data", "order"])}</li>
				<li className="group list-item">Group: {group}</li>
				<li className="link list-item !bg-blue">Link: <a href={entry.getIn(["data", "link"])}>{entry.getIn(["data", "link"])}</a></li>
			</ul>
			</div>
		);
	}

	// CMS.registerPreviewTemplate("posts", PostPreview);
	CMS.registerPreviewTemplate("5inch-beginner", PostPreview)
}