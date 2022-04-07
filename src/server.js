const path = require("path");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const typeDefinitions = require("./graphql/types/index");
const { print } = require("graphql");
const cors = require("cors");
// const { WebSocketServer } = require("ws");
// const { PubSub } = require("graphql-yoga");

// const pubsub = new PubSub();

const dotenv = require("dotenv");
dotenv.config();

// Auto load all files in the resolver folder instead of using multiple imports for each file
const resolverFiles = loadFilesSync(path.join(__dirname, "resolvers"));

/*
Since the output of merge type Defs is a GraphQL DocumentNode, 
print the merged result as a string to be used in the buildSchema method
*/
const printedTypeDefs = print(typeDefinitions);

const schema = buildSchema(printedTypeDefs);

// deep merge multiple resolvers
const resolvers = mergeResolvers(resolverFiles);

const app = express();

// Creating the WebSocket server
// const wsServer = new WebSocketServer({
// This is the `httpServer` we created in a previous step.
// server: httpServer,
// Pass a different path here if your ApolloServer serves at
// a different path.
//   path: "/subscriptions",
// });

app.use(cors());

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    // context: {
    //   pubsub,
    // },
    graphiql: true,
  })
);

app.listen(process.env.PORT, () =>
  console.log(`Now browse to localhost:${process.env.PORT}/api`)
);
