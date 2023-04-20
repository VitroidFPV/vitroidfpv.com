import domtoimage from "dom-to-image";
// @ts-ignore
import { copyImageToClipboard } from "copy-image-clipboard/dist/index.common.js";

export function copyCompare() {
	// @ts-ignore
	let node: HTMLElement = document.getElementById("compare");

	// get the height and width of the node
	let height = node.offsetHeight;
	let width = node.offsetWidth;

	domtoimage
		.toPng(node, { height: height, width: width, style: {"transform": "none","position": "static"} })
		.then(function (dataUrl) {
			var img = new Image();
			img.src = dataUrl;
			console.log(dataUrl);

			copyImageToClipboard(dataUrl)
				.then(() => {
					console.log("Image Copied");
				})
				.catch((e: any) => {
					console.log("Error: ", e.message);
				});
		})
		.catch(function (error) {
			console.error("oops, something went wrong!", error);
		});
	}
