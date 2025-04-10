const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/messages");
// const messagRoute = require('./routes/messages')
// const conversationRoute = require('./routes/conversation')

require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(morgan("common"));

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/conversation", conversationRoute);
app.use("/messages", messageRoute);

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("database is connected"))
    .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
});
