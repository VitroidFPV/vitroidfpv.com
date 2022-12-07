import satori from 'satori';
import {Resvg} from '@resvg/resvg-js';
import {html as toReactElement} from 'satori-html';

let title = "";
let description = "";
let img = "";
let category = "";
let categoryColor

function setTemplate(title, description, category, img) {
	title = title;
	description = description;
	category = category;
	img = img;
	switch (category) {
		case "Guides":
			categoryColor = ["#90D95B", "#56A94F", "#3F7B4E", "#2D5042", "#171b18"]
			break
		case "Tutorials":
			categoryColor = ["#5AD8E6", "#5586AC", "#4A5578", "#3A384A", "#212023"]
			break
		case "News": 
			categoryColor = ["#D6395B", "#9D3C51", "#6C3843", "#412D32", "#1E1B1C"]
			break
		case "Reviews":
			categoryColor = ["#FFCC00", "#B59617", "#776623", "#453E24", "#1D1C18"]
			break
		case "Misc":
			categoryColor = ["#9550BA", "#754A8C", "#563F62", "#382F3D", "#1C1B1D"]
			break
		default:
			categoryColor = ["#9550BA", "#754A8C", "#563F62", "#382F3D", "#1C1B1D"]
	}

	var template = `
	<div style="display: flex; flex-direction: column; justify-content: flex-end; width: ${width}; height: ${height}; background-color: #000; color: #fff;">>
		<div tw="relative flex flex-col w-full">
			<div tw="bg-red-500 absolute flex"></div>
			<img src="${img}" alt="" tw="absolute -bottom-32 object-cover w-full" width="${width}"/>
		</div>
		<svg tw="h-24 max-w-full m-0 flex" id="visual" viewBox="0 0 2400 300" width="2400" height="300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
		<path d="M0 63L57.2 72.2C114.3 81.3 228.7 99.7 343 104.7C457.3 109.7 571.7 101.3 686 106C800.3 110.7 914.7 128.3 1028.8 132.3C1143 136.3 1257 126.7 1371.2 112.2C1485.3 97.7 1599.7 78.3 1714 77.3C1828.3 76.3 1942.7 93.7 2057 94.7C2171.3 95.7 2285.7 80.3 2342.8 72.7L2400 65L2400 301L2342.8 301C2285.7 301 2171.3 301 2057 301C1942.7 301 1828.3 301 1714 301C1599.7 301 1485.3 301 1371.2 301C1257 301 1143 301 1028.8 301C914.7 301 800.3 301 686 301C571.7 301 457.3 301 343 301C228.7 301 114.3 301 57.2 301L0 301Z" fill="${categoryColor[0]}"/>
		<path d="M0 99L57.2 107.5C114.3 116 228.7 133 343 145.7C457.3 158.3 571.7 166.7 686 167.2C800.3 167.7 914.7 160.3 1028.8 158.8C1143 157.3 1257 161.7 1371.2 161.2C1485.3 160.7 1599.7 155.3 1714 148.7C1828.3 142 1942.7 134 2057 126.2C2171.3 118.3 2285.7 110.7 2342.8 106.8L2400 103L2400 301L2342.8 301C2285.7 301 2171.3 301 2057 301C1942.7 301 1828.3 301 1714 301C1599.7 301 1485.3 301 1371.2 301C1257 301 1143 301 1028.8 301C914.7 301 800.3 301 686 301C571.7 301 457.3 301 343 301C228.7 301 114.3 301 57.2 301L0 301Z" fill="${categoryColor[1]}"/>
		<path d="M0 202L57.2 198.7C114.3 195.3 228.7 188.7 343 181.5C457.3 174.3 571.7 166.7 686 164.2C800.3 161.7 914.7 164.3 1028.8 167.5C1143 170.7 1257 174.3 1371.2 176.7C1485.3 179 1599.7 180 1714 181.7C1828.3 183.3 1942.7 185.7 2057 183C2171.3 180.3 2285.7 172.7 2342.8 168.8L2400 165L2400 301L2342.8 301C2285.7 301 2171.3 301 2057 301C1942.7 301 1828.3 301 1714 301C1599.7 301 1485.3 301 1371.2 301C1257 301 1143 301 1028.8 301C914.7 301 800.3 301 686 301C571.7 301 457.3 301 343 301C228.7 301 114.3 301 57.2 301L0 301Z" fill="${categoryColor[2]}"/>
		<path d="M0 204L57.2 205.7C114.3 207.3 228.7 210.7 343 216.2C457.3 221.7 571.7 229.3 686 232.7C800.3 236 914.7 235 1028.8 232.2C1143 229.3 1257 224.7 1371.2 222.8C1485.3 221 1599.7 222 1714 220.8C1828.3 219.7 1942.7 216.3 2057 219.2C2171.3 222 2285.7 231 2342.8 235.5L2400 240L2400 301L2342.8 301C2285.7 301 2171.3 301 2057 301C1942.7 301 1828.3 301 1714 301C1599.7 301 1485.3 301 1371.2 301C1257 301 1143 301 1028.8 301C914.7 301 800.3 301 686 301C571.7 301 457.3 301 343 301C228.7 301 114.3 301 57.2 301L0 301Z" fill="${categoryColor[3]}"/>
		<path d="M0 267L57.2 261.2C114.3 255.3 228.7 243.7 343 242C457.3 240.3 571.7 248.7 686 253.7C800.3 258.7 914.7 260.3 1028.8 262.8C1143 265.3 1257 268.7 1371.2 264.8C1485.3 261 1599.7 250 1714 245.8C1828.3 241.7 1942.7 244.3 2057 246.8C2171.3 249.3 2285.7 251.7 2342.8 252.8L2400 254L2400 301L2342.8 301C2285.7 301 2171.3 301 2057 301C1942.7 301 1828.3 301 1714 301C1599.7 301 1485.3 301 1371.2 301C1257 301 1143 301 1028.8 301C914.7 301 800.3 301 686 301C571.7 301 457.3 301 343 301C228.7 301 114.3 301 57.2 301L0 301Z" fill="${categoryColor[4]}"/>
		</svg>
		<div tw="flex justify-between max-h-56 h-fit w-full items-start p-8" style="background-color: ${categoryColor[4]};">
			<div tw="flex flex-col">
				<div tw="text-6xl flex" style="color: ${categoryColor[0]}">${title}</div>
				<div tw="text-4xl text-white flex">${description}</div>
			</div>
			<div tw="mx-3 flex h-full items-center text-6xl" style="font-family: "Caveat"; color: ${categoryColor[0]}">VitroidFPV</div>
		</div>
	</div>
	`
	return template
}


const ReemKufiFont = await fetch('https://vitroidfpv-sv.netlify.app/uploads/fonts/ReemKufi-Regular.ttf');
const ReemKufi = await ReemKufiFont.arrayBuffer();
const CaveatFont = await fetch('https://vitroidfpv-sv.netlify.app/uploads/fonts/Caveat-Bold.ttf');
const Caveat = await CaveatFont.arrayBuffer();


const height = 1400;
const width = 1200;

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const params = new URLSearchParams(url.search);
	const title = params.get('title');
	const description = params.get('description');
	const category = params.get('category');
	const img = params.get('img');

	const html = toReactElement(setTemplate(title, description, category, img));
	const svg = await satori(html, {
		fonts: [
		{
			name: 'Reem Kufi',
			data: ReemKufi,
			style: 'normal'
		},
		{
			name: "Caveat",
			data: Caveat,
			style: 'normal'
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