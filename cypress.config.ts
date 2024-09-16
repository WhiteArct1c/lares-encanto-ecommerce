import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    viewportWidth: 1650,
    viewportHeight: 882,
  },
  projectId: "58b76c",
  defaultCommandTimeout: 3000
});
