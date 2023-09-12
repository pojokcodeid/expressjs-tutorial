import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Ini adalah metod GET");
});
app.get("/about", (req, res) => {
  res.send("Ini adalah metod GET About");
});
// /random.text
app.get("/random.text", (req, res) => {
  res.send("Ini adalah metod GET Random Text");
});

// /acd or /abcd
app.get("/ab?cd", (req, res) => {
  res.send("Ini adalah metod GET ab?cd");
});
// /abcd or /abbcd or /abbbcd dst
app.get("/ab+cd", (req, res) => {
  res.send("Ini adalah metod GET ab+cd");
});
// abcd, abxcd, abRANDOMcd, ab123cd, and so on.
app.get("/ab*cd", (req, res) => {
  res.send("Ini adalah metod GET ab*cd");
});
// /abe or /abcde
app.get("/ab(cd)?e", (req, res) => {
  res.send("Ini adalah metod GET ab(cd)?e");
});

app.post("/", (req, res) => {
  res.send("ini adalah metod POST");
});

app.put("/", (req, res) => {
  res.send("ini adalah metod PUT");
});

app.delete("/", (req, res) => {
  res.send("ini adalah metod DELETE");
});

app.all("/", (req, res) => {
  res.send("ini adalah metod ALL");
});

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}/`);
});
