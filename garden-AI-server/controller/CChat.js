import db from "../models/index.js";
import Chats from "../models/Chats.js";
import { Pinecone } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";

dotenv.config();

// AI

// Instantiate a new Pinecone client, which will automatically read the
// env vars: PINECONE_API_KEY and PINECONE_ENVIRONMENT which come from
// the Pinecone dashboard at https://app.pinecone.io

const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

// const loader = new PDFLoader("./청경채.pdf", {
//   splitPages: false,
// });

// const data = await loader.load();
// //Document Splitter
// const textSplitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 1000,
//   chunkOverlap: 200,
// });

// const splitDocs = await textSplitter.splitDocuments(data, {
//   chunkHeader: `농작물명: 청경채`,
//   appendChunkOverlapHeader: true,
// });

// await PineconeStore.fromDocuments(
//   splitDocs,
//   new OpenAIEmbeddings({ openAIApiKey: process.env.OPEN_AI_KEY }),
//   {
//     pineconeIndex,
//     maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
//   }
// );

const vectorStore = await PineconeStore.fromExistingIndex(
  new OpenAIEmbeddings({ openAIApiKey: process.env.OPEN_AI_KEY }),
  { pineconeIndex }
);

/* Search the vector DB independently with meta filters */
// const results = await vectorStore.similaritySearch("pinecone", 1, {
//   foo: "bar",
// });
// console.log(results);
/*
[
  Document {
    pageContent: 'pinecone is a vector db',
    metadata: { foo: 'bar' }
  }
]
*/

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPEN_AI_KEY,
  modelName: "gpt-3.5-turbo",
  temperature: 0.3,
});

//Setting up memory for Conversational QA Chat History
const memory = new BufferMemory({
  memoryKey: "chat_history",
  // inputKey: "question",
  outputKey: "text",
  returnMessages: true,
});

// const chain = ConversationalRetrievalQAChain.fromLLM(
//   model,
//   vectorStore.asRetriever(),
//   {
//     returnSourceDocuments: true,
//     memory,
//     // qaChainOptions: {
//     //   type: "map_reduce",
//     // },
//   }
// );

// const result = await chain.call({
//   question: "배추의 기상재해에 대해 알려줘",
// });
// console.log(result);

/* Use as part of a chain (currently no metadata filters) */
// const model = new OpenAI({ openAIApiKey: process.env.OPEN_AI_KEY });
const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
  k: 1,
  returnSourceDocuments: true,
});
// const response = await chain.call({
//   query: "배추를 언제 심으면 좋을까?",
// });
// console.log(response);
/*
{
  text: ' A pinecone is the woody fruiting body of a pine tree.',
  sourceDocuments: [
    Document {
      pageContent: 'pinecones are the woody fruiting body and of a pine tree',
      metadata: [Object]
    }
  ]
}
*/
const askQuestion = async (req, res) => {
  try {
    console.log(req.body);
    const { question } = req.body;
    const storeQ = await db.Chats.create({
      chatMessage: question,
    });
    console.log(storeQ);
    const response = await chain.call({
      query: question,
    });
    res.send(response.text);
    console.log(response.text);
  } catch (error) {
    console.log(error);
  }
};

export { askQuestion };
