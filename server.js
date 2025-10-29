import express from "express";
import cors from "cors";
import fs from "fs";
import { nanoid } from "nanoid";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const dbFile = "db.json";

// ✅ Home route
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

// ✅ API: get matches
app.get("/api/matches", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbFile, "utf8"));
  res.json(data.matches || []);
});

// ✅ Admin login (using env variables)
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
