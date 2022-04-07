const path = require("path");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const typeDefinitions = require("./graphql/types/index");
const { print } = require("graphql");
const cors = require("cors");

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

app.use(cors());

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () => {
  console.info(`Listening on http://localhost:${process.env.PORT}/api`);
});
