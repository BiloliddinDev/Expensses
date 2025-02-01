import { Hono } from "hono";
import { createExpenseSchema } from "../schema";
import { zValidator } from "@hono/zod-validator";
import type { expensesType } from "../types";

const expenses: expensesType[] = [
  { id: 1, title: "Rent", description: "Monthly house rent", amount: 1000 },
  { id: 2, title: "Groceries", description: "Weekly groceries", amount: 200 },
  {
    id: 3,
    title: "Utilities",
    description: "Monthly utility bills",
    amount: 150,
  },
];

export const expensesRoute = new Hono();

expensesRoute.get("/", (c) => {
  return c.json({ message: expenses });
});

expensesRoute.post("/", zValidator("json", createExpenseSchema), async (c) => {
  const data = await c.req.valid("json");
  const expense = createExpenseSchema.parse(data);

  return c.json(expense);
});

expensesRoute.get("/:id{[0-9]+}", (c) => {
  const id = Number.parseInt(c.req.param("id"));
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return c.notFound();
  }

  return c.json(expense);
});

expensesRoute.delete("/:id{[0-9]+}", (c) => {
  const id = Number.parseInt(c.req.param("id"));
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return c.notFound();
  }

  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) {
    return c.notFound();
  }
  const deleteExpense = expenses.splice(index, 1)[0];
  return c.json(deleteExpense);
});

expensesRoute.get("/total", (c) => {
  const total = expenses.reduce(
    (sum, expense) => sum + (expense.amount ?? 0),
    0
  );
  return c.json({ total });
});
