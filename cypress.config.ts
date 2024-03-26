import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    viewportWidth: 1366,
    viewportHeight: 768,
  },
  projectId: "58b76c",
  defaultCommandTimeout: 3000
});
