const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const path = require("path");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const BoujeeModel = require("./models/Boujee");
const User = require("./models/user.model");
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/api/register", cors(), async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/login", cors(), async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: req.body.email,
      },
      "secretCode"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/validToken", cors(), (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.json(false);

    const verified = jwt.verify(token, "secret-shit");
    if (!verified) return res.json(false);

    const user = User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/users", cors(), (req, res) => {
  const user = User.findById(req.user);
  res.json({
    id: user._id,
  });
});

app.put("/numbers/:id", cors(), async (req, res) => {
  const newNumber = req.body.percent;
  const id = req.body.id;
  try {
    await BoujeeModel.findById(id, (err, update) => {
      update.percent = newNumber;
      update.save();
      res.send("update number");
      console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", cors(), async (req, res) => {
  BoujeeModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.delete("/delete/:id", cors(), async (req, res) => {
  const id = req.params.id;
  await BoujeeModel.findByIdAndRemove(id).exec();
  res.send("Deleted");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api runnning!");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}..`);
});
