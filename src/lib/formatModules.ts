import type {Module} from '$lib/types/module';

export function formatModules(modules: {[path: string]: Module}) {

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
        const module = modules[k] as Module;
        module.metadata.moduleUrl = k; // Add the module path to the metadata

        const cat = module.metadata.category;
        const group = module.metadata.group;

        if (groupedModules[cat]) {
            if (groupedModules[cat][group]) {
                groupedModules[cat][group].push(module);
            } else {
                groupedModules[cat][group] = [module];
            }
        } else {
            groupedModules[cat] = {};
            groupedModules[cat][group] = [module];
        }
    }

	let videoModules = import.meta.glob("/modules/equipment/video/*.md", {eager: true});
	let radioModules = import.meta.glob("/modules/equipment/radio/*.md", {eager: true});
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

	const buildCategoryOrder = [
		"Motors",
		"Frames",
		"Stacks",
		"Flight Controllers",
		"ESCs",
		"Video Transmitters",
		"Cameras",
	]

	const radioCategoryOrder = [
		"Radios",
		"TX Modules",
		"Receivers",
	]

	const videoCategoryOrder = [
		"Video Transmitters",
		"Cameras",
		"Goggles",
		"Antennas",
	]

	const chargingCategoryOrder = [
		"Chargers",
		"Power Supplies",
		"Parallel/Series Boards",
		"Accessories",
	]

	const categoryOrder = [
		buildCategoryOrder,
		radioCategoryOrder,
		videoCategoryOrder,
		chargingCategoryOrder,
	]

	let sortedGroupedModules: {[category: string]: {[group: string]: Array<Module>}} = {};
	
	// sort the categories in groupedModules by their position in the category order arrays
	for (const catOrder of categoryOrder) {
		for (const cat of catOrder) {
			if (groupedModules[cat]) {
				sortedGroupedModules[cat] = groupedModules[cat];
			}
		}
	}

	const videoGroupOrder = [
		"Analog",
		"DJI",
		"Walksnail",
		"HDZero",
		"Omnidirectional",
		"Directional",
		"Info"
	]

	const radioGroupOrder = [
		"Gamepad style",
		"Compact style",
		"Full size",
		"Info"
	]

	const chargingGroupOrder = [
		"Micro Chargers",
		"DC Chargers",
		"AC Chargers",
	]

	const groupOrder = [
		videoGroupOrder,
		radioGroupOrder,
		chargingGroupOrder,
	]

	// sort the groups from the order arrays in groupOrder
	// if group is undefined, place it at the end
	for (const cat in sortedGroupedModules) {
		let sortedCategory: {[group: string]: Array<Module>} = {}; 
		for (const innerGroupOrder of groupOrder) {
			for (const group of innerGroupOrder) {
				if (sortedGroupedModules[cat][group]) {
					sortedCategory[group] = sortedGroupedModules[cat][group];
				}
			}
		}
		for (const group in sortedGroupedModules[cat]) {
			if (!sortedCategory[group]) {
				sortedCategory[group] = sortedGroupedModules[cat][group];
			}
		}
		sortedGroupedModules[cat] = sortedCategory;
	}


	// sort modules by their order metadata
	for (const cat in sortedGroupedModules) {
		for (const group in sortedGroupedModules[cat]) {
			sortedGroupedModules[cat][group].sort((a, b) => {
				if (a.metadata.order && b.metadata.order) {
					return a.metadata.order - b.metadata.order;
				} else if (a.metadata.order) {
					return -1;
				} else if (b.metadata.order) {
					return 1;
				} else {
					return 0;
				}
			});
		}
	}
	
	groupedModules = sortedGroupedModules;

	let res = {groupedModules, recommendedProducts};

	// console.log(JSON.stringify(res.groupedModules.Cameras, null, 2));

	return res;
}