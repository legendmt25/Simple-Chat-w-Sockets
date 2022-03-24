import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { RawData, WebSocketServer, WebSocket } from 'ws';
import { IMessage } from './Message';

const sockets = [];

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/addSocket', (req, res) => {
    new WebSocket(req.body.peer);
});


const wss = new WebSocketServer({ port: 4000 }, () =>
  console.log(`WebSocketServer listening on port ${4000}`)
);



wss.on('connection', (socket) => {
  sockets.push(socket);
  socket.send("datadsoijagoijdsaoigjoaids", () => console.log("message sent"));
  socket.on('message', (msg: IMessage) => {
      console.log(JSON.stringify());
  });
  socket.emit('message');
});

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
