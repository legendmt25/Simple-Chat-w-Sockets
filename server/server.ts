import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import { IMessage } from './models/Message';

const sockets: WebSocket[] = [];

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/sockets', (req, res) => {
  res.status(200).send(sockets);
});

const wss = new WebSocketServer({ port: 4000 }, () =>
  console.log(`WebSocketServer listening on port ${4000}`)
);

wss.on('connection', (socket) => {
  sockets.push(socket);

  socket.on('message', (data: IMessage) => {
    sockets.forEach((socket) => {
      socket.emit('message', data);
    });
  });
});

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
