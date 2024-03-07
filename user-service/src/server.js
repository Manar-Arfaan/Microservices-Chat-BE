const express =require('express');
const bodyParser= require ('body-parser');
const mongoose=require ('mongoose');
const morgan=require('morgan')
const cors=require('cors');
require('dotenv').config();
const swaggerUi=require('swagger-ui-express');
const YAML=require('yamljs');
const swaggerDocument=YAML.load('./swagger.yaml')
const session = require('express-session');
const MongoStore = require('connect-mongo')
const mongooseConnection = mongoose.connection;
const authRoutes=require('./routes/authRoutes'); // Import auth routes 
const profileRoutes=require('./routes/profileRoutes');
const logger=require('../config/logger')
const config=require('../config/config')


const app=express();
const PORT=process.env.PORT || 3000;

//MiddleWare
app.use(bodyParser.json()) 
app.use(cors()); // Enable Cors

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  mongooseConnection: mongooseConnection,
  cookie: {
    maxAge: 72 * 60 * 60 * 1000, 
    secure: false, // set to true in production if using HTTPS
    httpOnly: true,
  },
}));

//Connect DB 
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info(`DB is connented`))
  .catch((err)=>{
    logger.error('Failed to connect to DB',err);
    process.exit(1);
  });

  //app.use(morgan('combined'));

//Routes
app.use('/api/users',authRoutes)
app.use('/api/users',profileRoutes)

// serve Swagger UI at /api-docs endpoint 
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

//Default route
app.get('/',(req,res)=>{
    res.send('User Service is up and running');
})

app.all("*", (req, res) => {
  const err = new Error(`Requested URL ${req.path} not found!`);
  res.status(404).json({
    statuscode: 404,
    message: err.message,
  });
  logger.error(`Requested URL ${req.path} not found!`);
});

//Start the server 
app.listen(PORT,()=>{
    logger.info(`User Service listening at http://localhost:${PORT}`);    
});

module.exports=app;