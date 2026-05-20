<script>
  export let name = "world";
  console.log('svelte index loaded');
</script>

<main>
  <h1>Hello {name}</h1>
</main>

<style>
  main { padding: 1rem; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
  h1 { color: #333; }
</style>
