<script>
  import "../app.css";
  import Nav from "../components/Nav.svelte";
</script>

<div class="w-full min-h-screen flex md:flex-row flex-col-reverse">
  <Nav />
  <slot />
</div>
