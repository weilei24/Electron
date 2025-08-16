const http = require("http");

const app = require("./app");
const connectDB = require("./config/database");
const socketServer = require("./utils/socket");

require("dotenv").config();

const PORT = process.env.PORT || 8081;

// Connect to the database
connectDB();

const server = http.createServer(app);

socketServer(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
