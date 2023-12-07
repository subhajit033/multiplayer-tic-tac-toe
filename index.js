import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'node:path';

const app = express();
const server = createServer(app);


const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected with ' + socket.id);
  socket.on('turn', (data) => {
    console.log(data);
    socket.broadcast.emit('received_turn', data);
  });
});


const clientDir = path.join(__dirname, 'client', 'dist');

app.use(express.static(clientDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'));
});


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
