import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { PromptTemplate } from "langchain/prompts";
import { ChatPromptTemplate } from "langchain/prompts";

import * as dotenv from "dotenv";
dotenv.config();

const llm = new OpenAI({
  openAIApiKey: process.env.OPEN_AI_KEY,
  temperature: 0.9,
});

const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPEN_AI_KEY,
  temperature: 0.5,
});
const text =
  "What would be a good company name for a company that makes colorful socks?";
const prompt = PromptTemplate.fromTemplate(
  "What would be a good company name for a company that makes {product}"
);
const formattedPrompt = await prompt.format({
  product: "cars",
});
const messages = [new HumanMessage({ content: formattedPrompt })];
const llmResult0 = await llm.predict(formattedPrompt);
const llmResult = await llm.predictMessages(messages);
const chatModelResult = await chatModel.predictMessages(messages);

console.log(llmResult);
console.log(chatModelResult);
