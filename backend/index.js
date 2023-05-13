require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/DB');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

connectDB();

app.use('/user', require('./routes/userRoutes'));

app.listen(PORT, () => {
	console.log(`App Listening on PORT ${PORT}`);
});