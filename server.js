const express = require('express');
const app = express();
const dotenv = require('dotenv');

const routes = require('./routes');
const connect_db = require('./app/connect_db');
const serverMiddleware = require('./app/middlewares/server');

//Middleware server
serverMiddleware.map((x) => x(app));

//Config .env
dotenv.config();

//Connect database
connect_db.connect();

//Setting routes
routes(app);

app.get('/', (req, res, next) => {
    res.send('Welcome to cloudls');
});

const port = 8088;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//.................................................Nhớ xóa
// //Middleware cookie parser
// app.use(cookieParser());

// //Enable CORS Policy
// app.use(cors());

// //use middleware
// app.use(
//     express.urlencoded({
//         extended: true,
//     }),
// ); //(form html post len server )
// app.use(express.json()); //(form javascript len server )

// serverMiddleware.cookie;
// serverMiddleware.corsPolicy;
// serverMiddleware.postHtml;

// serverMiddleware.map((x, index) => {
//     serverMiddleware[index]();
// });

// serverMiddleware.serverMiddleware;
////................................................................Nhớ xóa
