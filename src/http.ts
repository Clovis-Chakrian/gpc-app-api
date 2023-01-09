import express from 'express';
import routes from './routes/routes';
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(routes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

export { server, io }