const express = require("express");
const connectDB = require("./config/connectDB");

const app = express();
// 4 - parse data // testes
app.use(express.json());
//3- routes
app.use("/api/persons", require("./routes/person"));
// 2 - connectDB
connectDB();
// 1 - run server
const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  err
    ? console.log(err)
    : console.log(`the server is running on http://localhost:${port}`);
});