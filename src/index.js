require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://eldor:qwerty777@cluster0-lqbbd.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,

});

mongoose.connection.on('connected', ()=>{
    console.log(`Connected To mongo instance`);
});

mongoose.connection.on('error', (error)=>{
    console.log(`Error connection ${error}`);
});


app.get('/', requireAuth, (req, res) => {
    res.send(`Yout email: ${req.user.email}`);
});


app.listen(3000, ()=>{
    console.log("Listining on port 3000");
});



