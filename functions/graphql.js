const ApolloClient = require("apollo-boost").default;
const fetch = require("node-fetch");
const gql = require("graphql-tag");

exports.handler = (event, context, callback) => {
  const client = new ApolloClient({
    uri: "https://graphql.fauna.com/graphql",
    fetch,
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer fnADcqhNcjACCrR2Y1QFfxPaxRxW4Je5sup8apq3`
        }
      });
    }
  });
  const todos = gql`
    query {
      allTodos {
        data {
          _id
          title
          completed
        }
      }
    }
  `;

  client
    .query({ query: todos })
    .then(results => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(results)
      });
    })
    .catch(e => callback(e));
};
