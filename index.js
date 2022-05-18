const morgan = require('morgan');
const dotenv = require('dotenv');
const {ApolloServer} = require('apollo-server');
const schema = require('./schemas/index');

dotenv.config()

const {sequelize} = require('./models');
const server = new ApolloServer({
    schema: schema,
    csrfPrevention: true
});

sequelize.sync({force: false})
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch(() => {
        console.error("데이터베이스 연결 실패");
    });

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});
