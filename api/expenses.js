let expenses = [];  
// In-memory store. Resets each time serverless function reboots.

export default function handler(req, res) {
  if (req.method === "GET") {
    // Return all expenses
    res.status(200).json({ expenses });
  }

  else if (req.method === "POST") {
    try {
      const { amount, description } = JSON.parse(req.body);

      if (!amount || !description) {
        return res.status(400).json({ error: "amount and description are required" });
      }

      const newExpense = {
        id: Date.now(),
        amount,
        description,
        date: new Date().toISOString()
      };

      expenses.push(newExpense);

      res.status(201).json({ message: "Expense added", expense: newExpense });
    } catch (error) {
      res.status(500).json({ error: "Invalid POST body" });
    }
  }

  else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
