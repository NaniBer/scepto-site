import { kv } from "@vercel/kv";

const KEY = "scepto_content";
const SEED_FILE = "public/content.json";

async function getSeedData() {
  const fs = await import("fs/promises");
  const path = await import("path");
  const cwd = process.cwd();
  const filePath = path.join(cwd, SEED_FILE);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let data = await kv.get(KEY);
      if (!data) {
        data = await getSeedData();
        await kv.set(KEY, data);
      }
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = auth.slice(7);
    if (!token || token !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const body = req.body;
    if (!body || typeof body !== "object") {
      return res.status(400).json({ error: "Invalid body" });
    }

    try {
      await kv.set(KEY, body);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}