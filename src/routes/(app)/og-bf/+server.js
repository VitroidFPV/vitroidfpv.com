import satori from 'satori';
import {Resvg} from '@resvg/resvg-js';
import {html as toReactElement} from 'satori-html';

let title = "";
let description = "";

function setTemplate(title, description) {
	title = title;
	description = description;

	var template = `
		<div tw="bg-red-500 w-full h-full flex relative" height=${height} width=${width} style="font-family: "Segoe-Bold">
			<img tw="flex absolute" src="https://vitroidfpv-sv.netlify.app/uploads/images/embed_frame.png"></img>
			<div tw="w-full h-full flex flex-col px-50 py-42">
				<div tw="w-full h-full flex flex-col justify-between">
					<div tw="flex flex-col">
						<div tw="flex text-[2.25rem] text-white font-bold">Betaflight Docs</div>
						<div tw="flex text-[6rem] text-[#FFBB00] w-[64rem]">${title}</div>
					</div>
					<div tw="flex text-[2.25rem] text-white font-bold pr-48" style="font-family: "Segoe">${description}</div>
				</div>
			</div>
		</div>
	`
	return template
}

const SegoeFont = await fetch('https://vitroidfpv-sv.netlify.app/uploads/fonts/Segoe.ttf');
const Segoe = await SegoeFont.arrayBuffer();
const SegoeBoldFont = await fetch('https://vitroidfpv-sv.netlify.app/uploads/fonts/Segoe-Bold.ttf');
const SegoeBold = await SegoeBoldFont.arrayBuffer();


const width = 1575;
const height = 900;

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const params = new URLSearchParams(url.search);
	const title = params.get('title');
	const description = params.get('description');
	const category = params.get('category');
	const img = params.get('img');

	const html = toReactElement(setTemplate(title, description));
	const svg = await satori(html, {
		fonts: [
		{
			name: "Segoe",
			data: Segoe,
			style: 'normal'
		},
		{
			name: "Segoe-Bold",
			data: SegoeBold,
			style: 'bold'
		}
		],
		height,
		width
	}
);

const resvg = new Resvg(svg, {
	fitTo: {
	mode: 'width',
	value: width
	}
});
const image = resvg.render();
return new Response(image.asPng(), {
	headers: {
	'content-type': 'image/png'
	}
});
};