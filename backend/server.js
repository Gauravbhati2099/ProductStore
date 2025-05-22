import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Needed for ES modules to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Init express
const app = express();

// CORS middleware (after app is initialized)
app.use(cors({
  origin: "https://frontend-eta-henna-74.vercel.app", // ✅ no trailing slash
  credentials: true, // Optional: If you’re using cookies/auth
}));

// Middleware to parse JSON
app.use(express.json());

// Connect DB
connectDB();

// API routes
app.use("/api/products", productRoutes);

// (Optional) Serve frontend if colocated
// const frontendPath = path.join(__dirname, "../frontend/dist");
// app.use(express.static(frontendPath));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(frontendPath, "index.html"))
// );

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
