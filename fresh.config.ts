import { defineConfig } from "$fresh/server.ts";
import kv_oauth_plugin from "./plugins/kv_oauth.ts";

export default defineConfig({
  plugins: [
    kv_oauth_plugin,
  ],
});
