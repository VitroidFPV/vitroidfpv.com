<script lang="ts">
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
	import netlifyIdentity from "netlify-identity-widget";
	import { addCms } from "$lib/addCms";

	if (browser) {
		addCms();
	}

	onMount(() => {
		if (browser) {
			netlifyIdentity.init();
			netlifyIdentity.open();
		}
	});

	// import CMS from 'netlify-cms-app'
</script>

<div>
	<!-- <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js" crossorigin="anonymous"></script> -->
	<!-- <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" crossorigin="anonymous"></script> -->
	<link href="config.yml" type="text/yaml" rel="cms-config-url">
	<script>
		if (window.netlifyIdentity) {
			window.netlifyIdentity.on("init", (user) => {
				if (!user) {
					window.netlifyIdentity.on("login", () => {
						document.location.href = "/admin/";
					});
				}
			});
		}
	</script>

	<!-- <div data-netlify-identity-menu></div> -->

	<!-- Add a simpler button:
		Simple button that will open the modal.
	-->
	<!-- <div data-netlify-identity-button>Login with Netlify Identity</div> -->
</div>