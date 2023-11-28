/**
 * @param {string} name
 * @param {string} label
 * @param {string} folder
 */
function list(name, label, folder,) {
	this.name = name;
	this.label = label;
	this.folder = folder;
	this.create = true;
	this.slug = "{{order}}-{{day}}-{{month}}-{{year}}-{{category}}-{{title}}";
	this.sortable_fields = ["order", "title", "category", "color"];
	this.view_groups = [
		{
			label: "Category",
			field: "category"
		},
		{
			label: "Price Range",
			field: "color"
		}
	];
	this.view_filters = [
		{
			label: "Frames",
			field: "category",
			pattern: "Frames"
		},
		{
			label: "Motors",
			field: "category",
			pattern: "Motors"
		},
		{
			label: "Flight Controllers",
			field: "category",
			pattern: "Flight Controllers"
		},
		{
			label: "ESCs",
			field: "category",
			pattern: "ESCs"
		},
		{
			label: "Stacks",
			field: "category",
			pattern: "Stacks"
		},
		{
			label: "AIOs",
			field: "category",
			pattern: "AIOs"
		},
		{
			label: "Video Transmitters",
			field: "category",
			pattern: "Video Transmitters" 
		}
	];
	this.fields = [
		{
			label: "Category",
			name: "category",
			widget: "select",
			options: [
				{ label: "Frames", value: "Frames" },
				{ label: "Motors", value: "Motors" },
				{ label: "Flight Controllers", value: "Flight Controllers" },
				{ label: "ESCs", value: "ESCs" },
				{ label: "Stacks", value: "Stacks" },
				{ label: "AIOs", value: "AIOs" },
				{ label: "Video Transmitters", value: "Video Transmitters" }
			]
		},
		{ label: "Group", name: "group", widget: "text", required: false },
		{
			label: "Price Range",
			name: "color",
			widget: "select",
			options: [
				{ label: "Budget", value: "green" },
				{ label: "Mid-Range", value: "orange" },
				{ label: "High-End", value: "red" },
				{ label: "Varied", value: "violet" }
			]
		},
		{ label: "Recommended", name: "recommended", widget: "relation", collection: '5" Race Build', search_fields: ["title"], value_field: "title", display_fields: ["title"], multiple: true, required: false},
		{ label: "Visible", name: "visible", widget: "boolean", default: true },
		{ label: "Order", name: "order", widget: "number" },
		{ label: "Title", name: "title", widget: "text" },
		{ label: "Link", name: "link", widget: "text" },
		{ label: "Image", name: "img", widget: "image" },
		{ label: "Description", name: "text", widget: "text" },
		{ label: "Price", name: "price", widget: "text", required: false },
		{ label: "Info", name: "info", widget: "text", required: false},
		{ label: "Point 1", name: "point1", widget: "text", required: false },
		{ label: "Point 2", name: "point2", widget: "text", required: false },
		{ label: "Point 3", name: "point3", widget: "text", required: false },
		{ label: "Point 4", name: "point4", widget: "text", required: false },
		{ label: "Point 5", name: "point5", widget: "text", required: false }
	];
}

export let config = {
	"publish_mode": "editorial_workflow",
	"local_backend": true,
	"backend": {
		"name": "git-gateway",
		"branch": "main"
	},

	collections: [
		{
			name: "FAQ",
			label: "FAQ",
			folder: "modules/faq/",
			create: true,
			slug: "{{order}}-{{day}}-{{month}}-{{year}}-{{category}}-{{title}}",
			fields: [
				{
					name: "category",
					label: "Category",
					widget: "select",
					options: [
						{ label: "Starting Out", value: "Starting Out" },
						{ label: "Building", value: "Building" },
						{ label: "Betaflight", value: "Betaflight" },
						{ label: "Video", value: "Video" },
						{ label: "Radio", value: "Radio" },
						{ label: "Hardware", value: "Hardware" }
					]
				},
				{ label: "Order", name: "order", widget: "number" },
				{ label: "Title", name: "title", widget: "text" },
				{ label: "ID", name: "id", widget: "text" },
				{ label: "Answer", name: "answer", widget: "markdown" }
			]
		},
		new list("5inch-beginner", "5\" Beginner Build", "modules/builds/5inch-beginner/"),
		new list("5inch-race", "5\" Race Build", "modules/builds/5inch-race/"),
		new list("5inch-advanced", "5\" Advanced Build", "modules/builds/5inch-advanced/"),
		new list("3inch-cinewhoop", "3\" Cinewhoop Build", "modules/builds/3inch-cinewhoop/"),
		new list("1s-2s-micro", "1s-2s Micro Build", "modules/builds/1s-2s-micro/"),
		new list("3s-4s-micro", "3s-4s Micro Build", "modules/builds/3s-4s-micro/"),

		{
			name: "radioList",
			label: "Equipment - Radio",
			folder: "modules/equipment/radioList/",
			create: true,
			slug: "{{order}}-{{day}}-{{month}}-{{year}}-{{category}}-{{title}}",
			sortable_fields: ["order", "title", "category", "color"],
			view_groups: [
				{
					label: "Category",
					field: "category"
				},
				{
					label: "Price Range",
					field: "color"
				},
			],
			view_filters: [
				{
					label: "Radios",
					field: "category",
					pattern: "Radios"
				},
				{
					label: "TX Modules",
					field: "category",
					pattern: "TX Modules"
				},
				{
					label: "Receivers",
					field: "category",
					pattern: "Receivers"
				},
				{
					label: "Antennas",
					field: "category",
					pattern: "Antennas"
				},
			],
			fields: [
				{
					label: "Category",
					name: "category",
					widget: "select",
					options: [
						{ label: "Radios", value: "Radios" },
						{ label: "TX Modules", value: "TX Modules" },
						{ label: "Receivers", value: "Receivers" },
						{ label: "Antennas", value: "Antennas" }
					]
				},
				{ label: "Group", name: "group", widget: "text" },
				{ label: "Order", name: "order", widget: "number" },
				{
					label: "Price Range",
					name: "color",
					widget: "select",
					options: [
						{ label: "Budget", value: "green" },
						{ label: "Mid-Range", value: "orange" },
						{ label: "High-End", value: "red" },
						{ label: "Varied", value: "violet" }
					]
				},
				{ label: "Title", name: "title", widget: "text" },
				{ label: "Link", name: "link", widget: "text" },
				{ label: "Image", name: "image", widget: "image" },
				{ label: "Description", name: "text", widget: "text" },
				{ label: "Price", name: "price", widget: "text" },
				{ label: "Point 1", name: "point1", widget: "text", required: false },
				{ label: "Point 2", name: "point2", widget: "text", required: false },
				{ label: "Point 3", name: "point3", widget: "text", required: false },
				{ label: "Point 4", name: "point4", widget: "text", required: false },
				{ label: "Point 5", name: "point5", widget: "text", required: false }
			]
		},

		{
			name: "videoList",
			label: "Equipment - Video",
			folder: "modules/equipment/videoList/",
			create: true,
			slug: "{{order}}-{{day}}-{{month}}-{{year}}-{{category}}-{{title}}",
			sortable_fields: ["order", "title", "category", "color"],
			view_groups: [
				{
					label: "Category",
					field: "category"
				},
				{
					label: "Price Range",
					field: "color"
				},
			],
			view_filters: [
				{
					label: "Cameras",
					field: "category",
					pattern: "Cameras"
				},
				{
					label: "Goggles",
					field: "category",
					pattern: "Goggles"
				},
				{
					label: "Antennas",
					field: "category",
					pattern: "Antennas"
				},
				{
					label: "Video Receivers",
					field: "category",
					pattern: "Video Receivers"
				},
			],
			fields: [
				{
					label: "Category",
					name: "category",
					widget: "select",
					options: [
						{ label: "Cameras", value: "Cameras" },
						{ label: "Goggles", value: "Goggles" },
						{ label: "Antennas", value: "Antennas" },
						{ label: "Video Receivers", value: "Video Receivers" }
					]
				},
				{ label: "Group", name: "group", widget: "text" },
				{ label: "Order", name: "order", widget: "number" },
				{
					label: "Price Range",
					name: "color",
					widget: "select",
					options: [
						{ label: "Budget", value: "green" },
						{ label: "Mid-Range", value: "orange" },
						{ label: "High-End", value: "red" },
						{ label: "Varied", value: "violet" }
					]
				},
				{ label: "Title", name: "title", widget: "text" },
				{ label: "Link", name: "link", widget: "text" },
				{ label: "Image", name: "image", widget: "image" },
				{ label: "Description", name: "text", widget: "text" },
				{ label: "Price", name: "price", widget: "text" },
				{ label: "Point 1", name: "point1", widget: "text", required: false },
				{ label: "Point 2", name: "point2", widget: "text", required: false },
				{ label: "Point 3", name: "point3", widget: "text", required: false },
				{ label: "Point 4", name: "point4", widget: "text", required: false },
				{ label: "Point 5", name: "point5", widget: "text", required: false }
			]
		},

		{
			name: "articles",
			label: "Articles",
			folder: "modules/articles/",
			create: true,
			slug: "{{category}}-{{title}}",
			sortable_fields: ["order", "title", "category", "color"],
			view_groups: [
				{
					label: "Category",
					field: "category"
				},
			],
			view_filters: [
				{
					label: "Guides",
					field: "category",
					pattern: "Guides"
				},
				{
					label: "Tutorials",
					field: "category",
					pattern: "Tutorials"
				},
				{
					label: "News",
					field: "category",
					pattern: "News"
				},
				{
					label: "Reviews",
					field: "category",
					pattern: "Reviews"
				},
				{
					label: "Misc",
					field: "category",
					pattern: "Misc"
				},
			],
			fields: [
				{
					label: "Category",
					name: "category",
					widget: "select",
					options: [
						{ label: "Guides", value: "Guides" },
						{ label: "Tutorials", value: "Tutorials" },
						{ label: "News", value: "News" },
						{ label: "Reviews", value: "Reviews" },
						{ label: "Misc", value: "Misc" }
					]
				},
				{ label: "Title", name: "title", widget: "text" },
				{ label: "Description", name: "description", widget: "text" },
				{ label: "Excerpt", name: "excerpt", widget: "text" },
				{ label: "Image", name: "image", widget: "image" },
				{ label: "Author", name: "author", widget: "text" },
				{ label: "Date", name: "date", widget: "date" },
				{ label: "Updated", name: "updated", widget: "date" },
				{ label: "Content", name: "body", widget: "markdown" },
			]
		},
	],

	media_folder: "/static/uploads/",
	public_folder: "/uploads/",
	site_url: "https://www.vitroidfpv.com/",
	display_url: "https://www.vitroidfpv.com/",
}