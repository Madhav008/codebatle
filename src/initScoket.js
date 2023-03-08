import io from 'socket.io-client';

const initSocket = () => {
  const socket = io.connect(`${import.meta.env.VITE_API_BASE_URL}`);

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  return socket;
};

const socket = initSocket();


export default socket;
