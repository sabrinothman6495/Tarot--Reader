import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import cors from "cors";
// import { connectDB } from "./config/db";
// import typeDefs from "./schemas/typeDefs";
// import resolvers from "./schemas/resolvers";

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// connectDB();

// Initialize Apollo Server
const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// todo :uncomment the above lines 
  context: ({ req }) => {
    // Extract JWT token for authentication
    const token = req.headers.authorization || "";
    return { token };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
