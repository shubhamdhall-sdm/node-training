import app from "../server"
import https from "https";
import http from "http";
import { Server } from "socket.io";
import events from "./events";
import fs from "fs";

const socketServer = (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'staging') ? http.createServer(app) : https.createServer({
  key: fs.readFileSync("/etc/letsencrypt/live/dev.vetrecor.io/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/dev.vetrecor.io/fullchain.pem")
});

// Add this
// Create an io server and allow for CORS from SOCKET_PORT
const io = new Server(socketServer, {
  cors: {
    origin: '*'
  },
});

// Add this
// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  socket.emit('connection', null);
  // Save current socket
  const { id } = socket.handshake.query;
  socket.join(id);
  /**
   * calling socket functions
   * @param {Object} socket - socket object
   * @param {Object} io - socket io connection object
   */
  events.joinRoom(socket, io)
  events.leaveRoom(socket, io)
  events.sendNewMessage(socket, io, id)
  events.messageSeen(socket, io)
  events.messageNotification(socket, io)
  events.userTyping(socket, io)
  events.stopTyping(socket, io)
  events.userDisconnect(socket, id)
});

module.exports = socketServer;
