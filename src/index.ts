import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db";
import documentRoutes from "./routes/documentRoutes"

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/api/documents', documentRoutes);

const port = 9000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
