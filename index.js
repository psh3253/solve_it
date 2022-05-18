const morgan = require('morgan');
const dotenv = require('dotenv');
const jsonwebtoken = require('jsonwebtoken')
const {ApolloServer} = require('apollo-server');
const schema = require('./schemas/index');

dotenv.config()

const {sequelize} = require('./models');
const server = new ApolloServer({
    schema: schema,
    csrfPrevention: true,
    context: async({req}) => {
        try {
            const op = req.body.query.split('\n')[1].trim();
            if(op.startsWith('register') || op.startsWith('login'))
                return {};

            const token = req.headers.authorization || '';
            const result = jsonwebtoken.verify(token.slice(7), process.env.JWT_SECRET_KEY);
            return result.id;
        } catch (e) {
            console.error(e);
        }
    }
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
