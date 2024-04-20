import "./styles.css";
import App from "./App.svelte";
import { listen } from '@tauri-apps/api/event'

listen('tauri://file-drop', event => {
  console.log(event)
})

const app = new App({
  target: document.getElementById("app"),
});

export default app;
