import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";

const llm = new OpenAI({
  openAIApiKey: process.env.OPEN_AI_KEY,
  temperature: 0.9,
});

const chatModel = new ChatOpenAI();

const text =
  "What would be a good company name for a company that makes colorful socks?";

const llmResult = await llm.predict(text);

const chatModelResult = await chatModel.predict(text);
