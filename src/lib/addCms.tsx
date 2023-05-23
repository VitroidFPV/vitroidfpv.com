import React from 'react';
import { render } from "react-dom";
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export async function addCms() {
	// if (typeof window !== 'undefined') return;

	const { default: CMS } = await import('netlify-cms-app');

	CMS.init();
	CMS.registerPreviewStyle("cms.css");
		// 	var PostPreview = createClass({
		// 	render: function() {
		// 		var entry = this.props.entry
		// 		var group = entry.getIn(['data', 'group'])
				
		// 		return h("div", {className: "main-box"},
		// 			h("div", {className: "category"}, entry.getIn(["data", "category"])),
		// 			h("div", {className: "container" + " " + entry.getIn(["data", "color"])},
		// 				h("div", {className: "title" + " " + entry.getIn(["data", "color"])}, entry.getIn(["data", "title" ])),
		// 				h("div", {className: "points"},
		// 					h("div", {className: "price"}, entry.getIn(["data", "price"])),
		// 					h("div", {className: "point1"}, entry.getIn(["data", "point1"])),
		// 					h("div", {className: "point2"}, entry.getIn(["data", "point2"])),
		// 					h("div", {className: "point3"}, entry.getIn(["data", "point3"])),
		// 					h("div", {className: "point4"}, entry.getIn(["data", "point4"])),
		// 					h("div", {className: "point5"}, entry.getIn(["data", "point5"])),
		// 				),
		// 				h("div", {className: "description"}, entry.getIn(["data", "text"]))
		// 			),
		// 			h("ul", {className: "misc-info list"},
		// 				// link, order, and group
		// 				h("li", {className: "order list-item"}, "Order: " + entry.getIn(["data", "order"])),
		// 				h("li", {className: "group list-item"}, "Group: " + entry.getIn(["data", "group"])),
		// 				h("li", {className: "link list-item"}, "Link: ", h("a", {href: entry.getIn(["data", "link"])}, entry.getIn(["data", "link"]))),
		// 			)
		// 		)
		// 	}
		// })

		// var ArticlePreview = createClass({
		// 	render: function() {
		// 		var entry = this.props.entry
		// 		var date = new Date(entry.getIn(["data", "date"]))
		// 		var formattedDate = date.toLocaleDateString("en-US", {
		// 			year: "numeric",
		// 			month: "long",
		// 			day: "numeric"
		// 		})
		// 		return h("article", {className: entry.getIn(["data", "category"]) + " article-preview"},
		// 			h("div", {className: "article-top"},
		// 				h("div", {className: "article-img"},
		// 					h("div", {className: "img-cover"}),
		// 					h("img", {className: "img", src: entry.getIn(["data", "img"]), alt: ""})
		// 				),
		// 				h("div", {className: "article-info"},
		// 					h("h1", {className: "article-title"}, entry.getIn(["data", "title"])),
		// 					h("div", {className: "article-description"}, entry.getIn(["data", "description"])),
		// 					h("div", {className: "article-credit"},
		// 						h("p", null, "Posted on ", h("span", {className: "article-date"}, formattedDate), " by ", h("span", {className: "article-author"}, entry.getIn(["data", "author"])))
		// 					)
		// 				)
		// 			),
		// 			h(window.ReactMarkdown, {className: "article-content"},
		// 				entry.getIn(["data", "content"])
		// 			)
		// 		)
		// 	}
		// })


		function PostPreview({entry, widgetFor}) {
		const group = entry.getIn(['data', 'group']);

		return (
			<div className="main-box">
			<div className="category">{entry.getIn(['data', 'category'])}</div>
			<div className={`container ${entry.getIn(['data', 'color'])}`}>
				<div className={`title ${entry.getIn(['data', 'color'])}`}>{entry.getIn(['data', 'title'])}</div>
				<div className="points">
					<div className="price">{entry.getIn(['data', 'price'])}</div>
					<div className="point1">{entry.getIn(['data', 'point1'])}</div>
					<div className="point2">{entry.getIn(['data', 'point2'])}</div>
					<div className="point3">{entry.getIn(['data', 'point3'])}</div>
					<div className="point4">{entry.getIn(['data', 'point4'])}</div>
					<div className="point5">{entry.getIn(['data', 'point5'])}</div>
				</div>
			</div>
			<ul className="misc-info list">
				<li className="order list-item">Order: {entry.getIn(['data', 'order'])}</li>
				<li className="group list-item">Group: {group}</li>
				<li className="link list-item">Link: <a href={entry.getIn(['data', 'link'])}>{entry.getIn(['data', 'link'])}</a></li>
			</ul>
			</div>
		);
		}

		function ArticlePreview({entry, widgetFor}) {
		const date = new Date(entry.getIn(['data', 'date']));
		const formattedDate = date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});

		return (
			<article className={`${entry.getIn(['data', 'category'])} article-preview`}>
				<div className="article-top">
					<div className="article-img">
						<div className="img-cover" />
						<img className="img" src={entry.getIn(['data', 'img'])} alt="" />
					</div>
					<div className="article-info">
						<h1 className="article-title">{entry.getIn(['data', 'title'])}</h1>
						<div className="article-description">{entry.getIn(['data', 'description'])}</div>
						<div className="article-credit">
							<p>
								Posted on{' '}
								<span className="article-date">{formattedDate}</span> by{' '}
								<span className="article-author">{entry.getIn(['data', 'author'])}</span>
							</p>
						</div>
					</div>
					<div>
						<ReactMarkdown className="article-content">
							{entry.getIn(['data', 'content'])}
						</ReactMarkdown>
					</div>
				</div>
			</article>
		);
		}

		// CMS.registerPreviewTemplate('5inch-beginner', PostPreview)
		// CMS.registerPreviewTemplate('5inch-race', PostPreview)
		// CMS.registerPreviewTemplate('5inch-advanced', PostPreview)
		// CMS.registerPreviewTemplate('3inch-cinewhoop', PostPreview)
		// CMS.registerPreviewTemplate('1s-2s-micro', PostPreview)

		// CMS.registerPreviewTemplate('radioList', PostPreview)
		// CMS.registerPreviewTemplate('radioList', PostPreview)

		// CMS.registerPreviewTemplate('articles', ArticlePreview)

		CMS.registerPreviewTemplate("5inch-beginner", ({ entry, widgetFor }) => {
			const root = document.getElementById("root");
			render(<PostPreview entry={entry} widgetFor={widgetFor} />, root);
		});
}