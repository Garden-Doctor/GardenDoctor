import { express } from "express";
const app = express();
const PORT = "8000";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
