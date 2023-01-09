import { io } from "./http";
import { INotice } from "./@types/interfaces";
import MessagesController from "./controllers/MessagesController";
import prismaClient from "./database/prismaClient";

io.on('connection', (socket) => {
  console.log({
    message: 'Hello World, a new user connected',
  });

  socket.on('new_notice', async (notice: INotice) => {
    await prismaClient.$connect();

    io.emit(`new_notice_for_${notice.schoolClass}`, {
      title: notice.title,
      description: notice.description
    });
  });

  socket.on('selected_room', (room: string) => {
    socket.join(room);
  });

  socket.on('message', (message) => { MessagesController.sendMessage(socket, message) })
});
/*

(message: IMessage) => {
    io.emit('88683250', message);
    messages.push(message);
    console.log(messages);


let room = '';
console.log({
  message: 'Hello World, a new user connected',
});

socket.on('selected_room', (room: string) => {
  room = ''
  socket.join(room)
  */