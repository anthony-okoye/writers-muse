import { Router } from 'express';
import { createChatMessage, getLLaMAResponse, getChatsByConversationId, fetchConversations } from '../controllers/chatController';

const router = Router();

router.post('/save', createChatMessage);
router.post('/llama', getLLaMAResponse);
router.get('/conversation/:conversationId/:userId', getChatsByConversationId);
router.get('/conversations/:userId', fetchConversations);

export default router;
