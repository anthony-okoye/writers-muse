import { Request, Response } from 'express';
import { Chat } from '../models/chatModel';
import { sendPromptToLLaMA } from '../services/llamaService';
import { v4 as uuidv4 } from 'uuid';

export const createChatMessage = async (req: Request, res: Response): Promise<void> => {
  const { sender, text, avatar, conversationId, userId } = req.body;

  let topic = 'general';
  let newConversationId = conversationId;

  if (!conversationId) {
    // If no conversationId, use the text as the topic and generate a new conversationId
    topic = text;
    newConversationId = uuidv4();
  } else {
    // If conversationId is provided, fetch the topic from the latest message in the conversation
    const lastMessage = await Chat.findOne({ conversationId }).sort({ timestamp: -1 });
    if (lastMessage) {
      topic = lastMessage.topic;
    }
  }

  const newMessage = new Chat({ sender, text, avatar, topic, conversationId: newConversationId, userId });

  try {
    await newMessage.save();
    res.status(201).json({
      message: newMessage,
      conversationId: newConversationId
    });
  } catch (error) {
    res.status(500).json({ error: 'Error saving chat message' });
  }
};

export const getLLaMAResponse = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body)
  const { prompt, conversationId, userId } = req.body;

  if (!conversationId) {
    res.status(400).json({ error: 'conversationId is required' });
    return;
  }

  // Fetch the topic from the latest message in the conversation
  const lastMessage = await Chat.findOne({ conversationId, userId }).sort({ timestamp: -1 });
  if (!lastMessage) {
    res.status(404).json({ error: 'Conversation not found' });
    return;
  }

  const topic = lastMessage.topic;

  try {
    const response = await sendPromptToLLaMA(prompt);
    const aiMessageContent = response.choices[0].message.content;

    const aiMessage = new Chat({
      sender: 'ai',
      text: aiMessageContent,
      avatar: 'https://path.to/ai/avatar.jpg',
      topic,
      conversationId,
      userId
    });

    await aiMessage.save();
    res.status(200).json(aiMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error getting response from LLaMA' });
  }
};

export const getChatsByConversationId = async (req: Request, res: Response): Promise<void> => {
  const { conversationId, userId } = req.params;
  console.log('Fetching chats for:', { conversationId, userId });

  try {
    const chats = await Chat.find({ conversationId, userId }).sort({ timestamp: 1 });
    console.log('Chats found:', chats);
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving chats by conversation ID' });
  }
};

export const fetchConversations = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const conversations = await Chat.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$conversationId',
          latestMessage: { $last: '$$ROOT' },
        },
      },
      { $sort: { 'latestMessage.timestamp': -1 } },
    ]);

    res.status(200).json(conversations.map(convo => ({
      conversationId: convo._id,
      latestMessage: convo.latestMessage
    })));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching conversations' });
  }
};
