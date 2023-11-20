import { OpenAI } from "langchain/llms/openai";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import * as dotenv from "dotenv";
dotenv.config();

// Document loader
//웹 크롤링
// const loader = new CheerioWebBaseLoader(
//   "https://lilianweng.github.io/posts/2023-06-23-agent/"
// );
// const data = await loader.load();
//PDF

const loader = new PDFLoader("./가지.pdf", {
  splitPages: false,
});

const data = await loader.load();

//Document Splitter
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 100,
});

const splitDocs = await textSplitter.splitDocuments(data);

//Embedding and Storing the split data

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPEN_AI_KEY,
});
const vectorStore = await MemoryVectorStore.fromDocuments(
  splitDocs,
  embeddings
);

//similaritySearch
// const relavantDocs = await vectorStore.similaritySearchWithScore(
//   "What is task decomposition?"
// );

// console.log("withScore: ", relavantDocs.length);

//Distilling the retrieved document into an anwer

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPEN_AI_KEY,
  modelName: "gpt-3.5-turbo",
  temperature: 0.9,
});

//Setting up memory for Conversational QA Chat History
const memory = new BufferMemory({
  memoryKey: "chat_history",
  // inputKey: "question",
  outputKey: "text",
  returnMessages: true,
});

const chain = ConversationalRetrievalQAChain.fromLLM(
  model,
  vectorStore.asRetriever(),
  {
    returnSourceDocuments: true,
    memory,
    // qaChainOptions: {
    //   type: "map_reduce",
    // },
  }
);

const result = await chain.call({
  question: "바이올린이 뭐야?",
});
console.log(result);

// const followupResult = await chain.call({
//   question: "",
// });
// console.log(followupResult);
