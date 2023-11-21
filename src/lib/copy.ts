import toast from "svelte-french-toast";
import domtoimage from "dom-to-image";
// @ts-ignore
import { copyImageToClipboard } from "copy-image-clipboard/dist/index.common.js";


export function copyText(text: string) {
	navigator.clipboard.writeText(text)
	.then(() => {
		toast.success("Copied!", {
			style: "border-radius: 999px; backdrop-filter: blur(8px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); outline: 2px solid #ffffff1f; background-color: rgb(163 163 163 / 0.1); color: #87cc52;",
			iconTheme: {
				primary: "#87cc52",
				secondary: "#000000",
			}
		});
	})
	.catch((e: any) => {
		console.error("Error: ", e.message);
		toast.error("Could Not Copy Image: " + e.message, {
			style: "border-radius: 999px; backdrop-filter: blur(8px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); outline: 2px solid #ffffff1f; background-color: rgb(163 163 163 / 0.1); color: #d6395b;",
			iconTheme: {
				primary: "#d6395b",
				secondary: "#000000",
			}
		})
	});
}

export function copyNode(node: HTMLElement, height: number = 0, width: number = 0) {

	if (height != 0 && width != 0) {
		height = height;
		width = width;
	} else {
		height = node.offsetHeight;
		width = node.offsetWidth;
	}

	domtoimage
	.toPng(node, { height: height, width: width, style: {"transform": "none","position": "static"} })
	.then(function (dataUrl: string) {
		let img = new Image();
		img.src = dataUrl;

		copyImageToClipboard(dataUrl)
		.then(() => {
			toast.success("Copied!", {
				style: "border-radius: 999px; backdrop-filter: blur(8px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); outline: 2px solid #ffffff1f; background-color: rgb(163 163 163 / 0.1); color: #87cc52;",
				iconTheme: {
					primary: "#87cc52",
					secondary: "#000000",
				}
			});
		})
		.catch((e: any) => {
			console.error("Error: ", e.message);
			toast.error("Could Not Copy Image: " + e.message, {
				style: "border-radius: 999px; backdrop-filter: blur(8px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); outline: 2px solid #ffffff1f; background-color: rgb(163 163 163 / 0.1); color: #d6395b;",
				iconTheme: {
					primary: "#d6395b",
					secondary: "#000000",
				}
			})
		})
		.catch(function (e: any) {
			console.error("Error: ", e.message);
				toast.error("Could Not Convert Image: " + e.message, {
					style: "border-radius: 999px; backdrop-filter: blur(8px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); outline: 2px solid #ffffff1f; background-color: rgb(163 163 163 / 0.1); color: #d6395b;",
					iconTheme: {
						primary: "#d6395b",
						secondary: "#000000",
					}
				})
			});
	})
}