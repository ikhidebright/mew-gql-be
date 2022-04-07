const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeTypeDefs } = require("@graphql-tools/merge");

// auto load type files excluding the index file
const typesArray = loadFilesSync(path.join(__dirname, "."), {
  ignoreIndex: true,
});

// export merged types definitions
module.exports = mergeTypeDefs(typesArray);
