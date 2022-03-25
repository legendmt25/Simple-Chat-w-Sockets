import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import { Chat } from './models/Chat';
import { IMessage } from './models/Message';

const chat = new Chat();
const sockets: WebSocket[] = [];
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/sockets', (req, res) => {
  res.status(200).send(sockets);
});

app.get('/messages', (req, res) => {
  res.status(200).send(chat.getMessages());
});

const wss = new WebSocketServer({ port: 4000 }, () =>
  console.log(`WebSocketServer listening on port ${4000}`)
);

wss.on('connection', (ws) => {
  sockets.push(ws);
  ws.on('message', (message) => {
    console.log(message.toString());
    const parsed: IMessage = JSON.parse(message.toString());
    chat.addMessage(parsed);
    sockets
      .filter((socket) => socket != ws)
      .forEach((socket) => socket.send(message));
  });

  ws.on('close', () => {
    sockets.splice(sockets.indexOf(ws), 1);
  });
});

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
