/**
 * join room function called by socket
 * @param {Object} socket - socket object
 * @param {Object} io - socket io connection object
 */
exports.joinRoom = (socket, io) => {
    return socket.on("JoinRoom", async (data) => {
        socket.join(data.id);
        // const socketId = socket.id;
        io.to(data.id).emit("JoinRoomSucess", `User Join Room Successfully, Room id : ${data.id}`);
    });
}

/**
 * leave room function called by socket
 * @param {Object} socket - socket object
 * @param {Object} io - socket io connection object
 */
exports.leaveRoom = (socket, io) => {
    return socket.on("LeaveRoom", async (data) => {
        socket.leave(data.id);
        const socketId = socket.id;
        io.to(`${socketId}`).emit("LeaveRoomSucess", `User Leave Room Successfully, Room id : ${data.id}`);
    });
}

/**
 * send new message function called by socket
 * @param {Object} socket - socket object
 * @param {Object} io - socket io connection object
 */
exports.sendNewMessage = (socket, io) => {
    return socket.on('send-new-msg', (data) => {
        var msgData = JSON.parse(data);
        socket.broadcast.emit('get-message', msgData);
        io.in([msgData.room_id, msgData.receiver_id]).emit('receive-new-msg', msgData);
    });
}

/**
 * message seen function called by socket
 * @param {Object} socket - socket object
 * @param {Object} io - socket io connection object
 */
exports.messageSeen = (socket, io) => {
    socket.on("message-seen", (data) => {
        var msgData = JSON.parse(data);
        socket.broadcast.emit('get-message-seen', msgData);
    });
}

/**
 * message notification function called by socket
 * @param {Object} socket - socket object
 * @param {Object} io - socket io connection object
 */
exports.messageNotification = (socket, io) => {
    socket.on("message-notification", (data) => {
        var msgData = JSON.parse(data);
        socket.broadcast.emit('get-message-notification', msgData);
    });
}

/**
 * user typing function called by socket
 * @param {Object} socket - socket object
 * @param {Object} io - socket io connection object
 */
exports.userTyping = (socket, io) => {
    socket.on("user-typing", (data) => {
        const typingData = JSON.parse(data);
        // var name = getNameById(userId);
        // var typeData = {
        //   userId,
        //   name
        // }
        io.in(typingData.room_id).emit('user-typing-get', typingData);
    });
}

/**
 * stop typing function called by socket
 * @param {Object} socket - socket object
 * @param {Object} io - socket io connection object
 */
exports.stopTyping = (socket, io) => {
    socket.on("stop-typing", (data) => {
        var { roomId, userId } = JSON.parse(data);
        var name = getNameById(userId);
        var typeData = {
            userId,
            name
        }
        io.in(roomId).emit('stop-typing', typeData);
    });
}

/**
 * user disconnect function called by socket
 * @param {Object} socket - socket object
 * @param {Object} io - socket io connection object
 */
exports.userDisconnect = (socket, id) => {
    socket.on("disconnect", () => {
        socket.leave(id);
    });
}
