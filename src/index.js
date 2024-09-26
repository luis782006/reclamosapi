// In src/index.js
import express from "express";

// *** ADD ***
import v1OficinaRouter from "./v1/routes/oficinaRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;


// *** ADD ***
app.use(express.json());
app.use("/api/v1/oficinas", v1OficinaRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});