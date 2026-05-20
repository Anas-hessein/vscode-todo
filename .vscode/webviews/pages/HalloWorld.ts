// @ts-ignore: allow importing Svelte component without type declarations
import App from "./components/HalloWorld.svelte";

const app = new App({
    target: document.body,
});

export default app;