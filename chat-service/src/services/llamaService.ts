import axios from 'axios';
import { env } from '../../../config';

const LLaMA_API_URL = env.LlamaApiUrl || '';

export const sendPromptToLLaMA = async (prompt: string, maxTokens: number = 2100) => {
  try {
    const payload = {
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: maxTokens,
    };

    const response = await axios.post(LLaMA_API_URL, payload);
    return response.data;
  } catch (error) {
    console.error('Error sending prompt to LLaMA:', error);
    throw error;
  }
};
