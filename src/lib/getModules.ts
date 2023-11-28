import type {Module} from '$lib/types/module';

export function getModules(path: string) {

	let fullPath: string = ""
	let modules
	switch(path) {
		case "/builds/5inch-beginner":
			modules = import.meta.glob("/modules/builds/5inch-beginner/*.md", {eager: true});
			break;
		case "/builds/5inch-race":
			modules = import.meta.glob("/modules/builds/5inch-race/*.md", {eager: true});
			break;
		case "/builds/5inch-advanced":
			modules = import.meta.glob("/modules/builds/5inch-advanced/*.md", {eager: true});
			break;
		case "/builds/3inch-cinewhoop":
			modules = import.meta.glob("/modules/builds/3inch-cinewhoop/*.md", {eager: true});
			break;
		case "/builds/1s-2s-micro":
			modules = import.meta.glob("/modules/builds/1s-2s-micro/*.md", {eager: true});
			break;
		case "/builds/3s-4s-micro":
			modules = import.meta.glob("/modules/builds/3s-4s-micro/*.md", {eager: true});
			break;

		case "/equipment/radio":
			modules = import.meta.glob("/modules/equipment/radioList/*.md", {eager: true});
			break;
		case "/equipment/video":
			modules = import.meta.glob("/modules/equipment/videoList/*.md", {eager: true});
			break;
	}

	// console.log(modules);

	// const modules = import.meta.glob(fullPath, {eager: true});
	let groupedModules: {[category: string]: {[group: string]: Array<Module>}} = {};

	// sorts modules into an object as follows:
	// groupedModules = {
	// 		'category': {
	// 			'group': [Module, Module, Module]
	// 		},
	// 		'category': {
	// 			'group': [Module, Module, Module]
	// 		}
	// }
	for (const k in modules) {
		const cat = (modules[k] as Module).metadata.category;
		const group = (modules[k] as Module).metadata.group;

		if (groupedModules[cat]) {
			if (groupedModules[cat][group]) {
				groupedModules[cat][group].push(modules[k] as Module);
			} else {
				groupedModules[cat][group] = [modules[k] as Module];
			}
		} else {
			groupedModules[cat] = {};
			groupedModules[cat][group] = [modules[k] as Module];
		}
	}

	let videoModules = import.meta.glob("/modules/equipment/videoList/*.md", {eager: true});
	let radioModules = import.meta.glob("/modules/equipment/radioList/*.md", {eager: true});
	let linkedTitles: Array<string> = [];
	for (const cat in groupedModules) {
		for (const group in groupedModules[cat]) {
			for (const product in groupedModules[cat][group]) {
				if (groupedModules[cat][group][product].metadata.linked) {
					for (const title of groupedModules[cat][group][product].metadata.linked) {
						linkedTitles.push(title);
					}
				}
			}
		}
	}

	for (const k in videoModules) {
		const title = (videoModules[k] as Module).metadata.title;
		if (linkedTitles.includes(title)) {
			const cat = (videoModules[k] as Module).metadata.category;
			const group = (videoModules[k] as Module).metadata.group;
			if (groupedModules[cat]) {
				if (groupedModules[cat][group]) {
					groupedModules[cat][group].push(videoModules[k] as Module);
				} else {
					groupedModules[cat][group] = [videoModules[k] as Module];
				}
			} else {
				groupedModules[cat] = {};
				groupedModules[cat][group] = [videoModules[k] as Module];
			}
		}
	}
	for (const k in radioModules) {
		const title = (radioModules[k] as Module).metadata.title;
		if (linkedTitles.includes(title)) {
			const cat = (radioModules[k] as Module).metadata.category;
			const group = (radioModules[k] as Module).metadata.group;
			if (groupedModules[cat]) {
				if (groupedModules[cat][group]) {
					groupedModules[cat][group].push(radioModules[k] as Module);
				} else {
					groupedModules[cat][group] = [radioModules[k] as Module];
				}
			} else {
				groupedModules[cat] = {};
				groupedModules[cat][group] = [radioModules[k] as Module];
			}
		}
	}
	delete groupedModules["Linked Parts"];

	// I'm not even gonna lie, Copilot wrote this part, I am absolutely clueless with object manipulation

	let recommendedProducts: {[group: string]: Array<Module>} = {};
	for (const cat in groupedModules) {
		for (const group in groupedModules[cat]) {
			for (const product in groupedModules[cat][group]) {
				if (groupedModules[cat][group][product].metadata.recommended) {
					recommendedProducts[group] = [];
					for (const title of groupedModules[cat][group][product].metadata.recommended) {
						for (const cat2 in groupedModules) {
							for (const group2 in groupedModules[cat2]) {
								for (const product2 in groupedModules[cat2][group2]) {
									if (groupedModules[cat2][group2][product2].metadata.title === title) {
										recommendedProducts[group].push(groupedModules[cat2][group2][product2]);
									}
								}
							}
						}
					}
				}
			}
		}
	}

	// if the "visible" key doesn't exist in each module, add it and set it to true
	// if it does exist, leave it as the value it already has

	// for (const cat in groupedModules) {
	// 	for (const group in groupedModules[cat]) {
	// 		for (const product in groupedModules[cat][group]) {
	// 			if (!groupedModules[cat][group][product].metadata.visible) {
	// 				groupedModules[cat][group][product].metadata.visible = true;
	// 			}
	// 		}
	// 	}
	// }

	let categoryOrder = [
		"Motors",
		"Frames",
		"Flight Controllers",
		"ESCs",
		"Video Transmitters",
		"Cameras",
		"Goggles",
		"Antennas",
		"Radios",
		"TX Modules",
		"Receivers",
	]

	// sort the categories in groupedModules by their position in categoryOrder
	let sortedGroupedModules: {[category: string]: {[group: string]: Array<Module>}} = {};
	for (const cat of categoryOrder) {
		if (groupedModules[cat]) {
			sortedGroupedModules[cat] = groupedModules[cat];
		}
	}

	let groupOrder = [
		"Analog",
		"DJI",
		"Walksnail",
		"HDZero",
		"Omnidirectional",
		"Directional",
		"Gamepad style",
		"Compact style",
		"Full size",
		"Info",
	]

	for (const cat in sortedGroupedModules) {
		let sortedGroups: {[group: string]: Array<Module>} = {};
		for (const group of groupOrder) {
			if (sortedGroupedModules[cat][group]) {
				sortedGroups[group] = sortedGroupedModules[cat][group];
			}
		}
		for (const group in sortedGroupedModules[cat]) {
			if (!sortedGroups[group]) {
				sortedGroups[group] = sortedGroupedModules[cat][group];
			}
		}
		sortedGroupedModules[cat] = sortedGroups;
	}
	
	groupedModules = sortedGroupedModules;

	let res = {groupedModules, recommendedProducts};

	// console.log(JSON.stringify(res.groupedModules.Cameras, null, 2));

	return res;
}