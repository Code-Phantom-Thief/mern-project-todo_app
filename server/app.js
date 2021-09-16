require('dotenv').config();

const express = require('express');
const cors = require('cors');

const MongoDB_Connection = require('./config/db');
const PORT = process.env.PORT || 5000;

const todoRoutes = require('./routes/todoRoutes');
const signUpRoutes = require('./routes/signUp');
const signInRoutes = require('./routes/signIn');

const app = express();

MongoDB_Connection();

app.use(express.json());
app.use(cors());

app.use('/api/todos', todoRoutes);
app.use('/api/signup', signUpRoutes);
app.use('/api/signin', signInRoutes);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
