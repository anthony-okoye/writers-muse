import express from 'express';
import chatRoutes from './routes/chatRoutes';

const chatApp = express.Router();
chatApp.use(express.json());
chatApp.use(chatRoutes); // Register user routes at root level
export default chatApp;