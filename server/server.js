const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const https = require("https");
const fs = require("fs");

const app = express();

// Serve the static files (HTML, CSS, JS) from the public folder
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

const dashboardRoutes = require("./routes/dashboardRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const planRoutes = require("./routes/planRoutes");
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");
const nutritionLogRoutes = require("./routes/nutritionLogRoutes");
const inviteRoutes = require("./routes/inviteRoutes");
const adminRoutes = require("./routes/adminRoutes");
const openAiRoutes = require("./routes/openAiRoutes");
const teamRoutes = require("./routes/teamRoutes");
const dashboardConfigRoutes = require("./routes/dashboardConfigRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const imageRoutes = require("./routes/imageRoutes");
const webhookRoute = require("./routes/webhookRoute");
const googleRoutes = require("./routes/googleRoutes");

app.use("/dashboard", dashboardRoutes);
app.use("/dashboard/config", dashboardConfigRoutes);
app.use("/device", deviceRoutes);
app.use("/payment", paymentRoutes);
app.use("/plan", planRoutes);
app.use("/user", userRoutes);
app.use("/account", accountRoutes);
app.use("/webhook", webhookRoute);
app.use("/nutrition", nutritionRoutes);
app.use("/nutrition-log", nutritionLogRoutes);
app.use("/invite", inviteRoutes);
app.use("/admin", adminRoutes);
app.use("/openai", openAiRoutes);
app.use("/team", teamRoutes);
app.use("/organization", organizationRoutes);
app.use("/image", imageRoutes);
app.use("/google", googleRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Load the SSL certificate and private key
const privateKey = fs.readFileSync("./cert/key.pem", "utf8");
const certificate = fs.readFileSync("./cert/cert.pem", "utf8");

// Create an HTTPS server
const server = https.createServer(
  {
    key: privateKey,
    cert: certificate,
  },
  app
);
const port = 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
