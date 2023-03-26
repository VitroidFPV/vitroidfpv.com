import type {Module} from '$lib/types/module';

export function getModules(path: string) {

	let fullPath: string = ""
	let modules
	switch(path) {
		case "/builds/5inch-beginner":
			modules = import.meta.glob("/modules/buildLists/5inch-beginner/*.md", {eager: true});
			break;
		case "/builds/5inch-race":
			modules = import.meta.glob("/modules/buildLists/5inch-race/*.md", {eager: true});
			break;
		case "/builds/5inch-advanced":
			modules = import.meta.glob("/modules/buildLists/5inch-advanced/*.md", {eager: true});
			break;
		case "/builds/3inch-cinewhoop":
			modules = import.meta.glob("/modules/buildLists/3inch-cinewhoop/*.md", {eager: true});
			break;
		case "/builds/1s-2s-micro":
			modules = import.meta.glob("/modules/buildLists/1s-2s-micro/*.md", {eager: true});
			break;

		case "/equipment/radio":
			modules = import.meta.glob("/modules/equipmentLists/radioList/*.md", {eager: true});
			break;
		case "/equipment/video":
			modules = import.meta.glob("/modules/equipmentLists/videoList/*.md", {eager: true});
			break;
	}

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
	// write the above in a single loop
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

	for (const cat in groupedModules) {
		for (const group in groupedModules[cat]) {
			for (const product in groupedModules[cat][group]) {
				if (!groupedModules[cat][group][product].metadata.visible) {
					groupedModules[cat][group][product].metadata.visible = true;
				}
			}
		}
	}

	// if the group called "Info" exists in the object, move it to the end of the object

	for (const cat in groupedModules) {
		for (const group in groupedModules[cat]) {
			groupedModules[cat][group].sort((a, b) => a.metadata.order - b.metadata.order);
		}
	}

	let res = {groupedModules, recommendedProducts};

	return res;
}