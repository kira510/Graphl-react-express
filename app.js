const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

//mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-fsmsq.mongodb.net/graphql_app`, {useNewUrlParser: true})
mongoose.connect(`mongodb://127.0.0.1:27017/graphql_events`, {useNewUrlParser: true})
    .then(() => {
        return app.listen(port);
    }).then(() => {
        console.log('Server started!');
    }).catch((err) => {
        console.log(err);
});
