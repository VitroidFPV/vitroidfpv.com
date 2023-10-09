import React from "react";
import { render } from "react-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// @ts-ignore
import { config } from "/src/routes/(system)/admin/config.js"

export async function addCms() {
	// if (typeof window !== "undefined") return;

	const { default: CMS } = await import("decap-cms-app");

	CMS.init({config});
	CMS.registerPreviewStyle("cms.css");
	function PostPreview(props: any) {
		const { entry } = props;
		const group = entry.getIn(["data", "group"]);
		const info = entry.getIn(["data", "info"]);
		console.log(info)
		let price = "";
		let infoObjects: { text: string; tooltip: string }[] = [];
		if (info) {
			const infoArray = info.split(";");
			infoObjects = infoArray.map((item: string) => {
				const split = item.split("<");
				if (split.length === 1) {
					return { text: split[0], tooltip: "" };
				} else {
					return { text: split[0], tooltip: split[1].slice(0, -1) };
				}
			});
			price = infoObjects[0].text;
		}

		return (
			<div className="main-box">
			<div className="category">{entry.getIn(["data", "category"])}</div>
			{group && <div className="group">{entry.getIn(["data", "group"])}</div>}
			<div className={`container ${entry.getIn(["data", "color"])}`}>
				<div className={`title ${entry.getIn(["data", "color"])}`}>{entry.getIn(["data", "title"])}</div>
				{entry.getIn(["data", "point1"]) && 
				<div className="points">
					<div className="price">{entry.getIn(["data", "price"])}</div>
					<div className="point1">{entry.getIn(["data", "point1"])}</div>
					<div className="point2">{entry.getIn(["data", "point2"])}</div>
					<div className="point3">{entry.getIn(["data", "point3"])}</div>
					<div className="point4">{entry.getIn(["data", "point4"])}</div>
					<div className="point5">{entry.getIn(["data", "point5"])}</div>
				</div>}
				{infoObjects.length > 0 && 
					<div className="chips">
						{infoObjects.map((item: { text: string; tooltip: string }, index: number) => {
							return (
								<div className={"chip " + entry.getIn(["data", "color"])} key={index}>
									<div className="content">{item.text}</div>
									{item.tooltip && <span className="tooltip">{item.tooltip}</span>}
								</div>
							);
						})}
					</div>
				}
				<div className="description">{entry.getIn(["data", "text"])}</div>
			</div>
			<ul className="misc-info list">
				<li className="order list-item">Order: {entry.getIn(["data", "order"])}</li>
				<li className="link list-item">Link: <a href={entry.getIn(["data", "link"])}>{entry.getIn(["data", "link"])}</a></li>
			</ul>
			</div>
		);
	}

	function ArticlePreview(props: any) {
		const { entry } = props;
		const date = new Date(entry.getIn(["data", "date"]));
		const formattedDate = date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric"
		});

		return (
			<article className={`${entry.getIn(["data", "category"])} article-preview`}>
			<div className="article-top">
				<div className="article-img">
				<div className="img-cover"></div>
				<img className="img" src={entry.getIn(["data", "img"])} alt="" />
				</div>
				<div className="article-info">
				<h1 className="article-title">{entry.getIn(["data", "title"])}</h1>
				<div className="article-description">{entry.getIn(["data", "description"])}</div>
				<div className="article-credit">
					<p>
					Posted on <span className="article-date">{formattedDate}</span> by{" "}
					<span className="article-author">{entry.getIn(["data", "author"])}</span>
					</p>
				</div>
				</div>
			</div>
			<ReactMarkdown className="article-content">{entry.getIn(["data", "body"])}</ReactMarkdown>
			</article>
		);
	}

	// CMS.registerPreviewTemplate("posts", PostPreview);
	CMS.registerPreviewTemplate("5inch-beginner", PostPreview)
	CMS.registerPreviewTemplate("5inch-race", PostPreview)
	CMS.registerPreviewTemplate("5inch-advanced", PostPreview)
	CMS.registerPreviewTemplate("3inch-cinewhoop", PostPreview)
	CMS.registerPreviewTemplate("1s-2s-micro", PostPreview)
	CMS.registerPreviewTemplate("3s-4s-micro", PostPreview)

	CMS.registerPreviewTemplate("videoList", PostPreview);
	CMS.registerPreviewTemplate("radioList", PostPreview);

	CMS.registerPreviewTemplate("articles", ArticlePreview);
}