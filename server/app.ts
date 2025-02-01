import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses.ts";
const app = new Hono();
import { serveStatic } from "hono/bun";

app.use("*", logger());

app.route("/api/expenses", expensesRoute);
export default app;

app.get(`*`, serveStatic({ root: "./frontend/dist" }));
app.get(`*`, serveStatic({ path: "../frontend/dist/index.html" }));
