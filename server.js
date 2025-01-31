const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const cors=require('cors');
const db = require('./db');
const policeRoutes = require('./routes/Police');


//middleware
app.use(cors());
app.use(bodyParser.json());


const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest);

// passport initialization

const passport = require('./auth');
app.use(passport.initialize()); 


const localAuthMiddleware = passport.authenticate("local", {session: false})


app.use('/police',localAuthMiddleware,policeRoutes);



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});