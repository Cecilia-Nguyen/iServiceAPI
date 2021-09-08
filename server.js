const express = require('express');
const path = require('path');
const https = require("https")
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
const url = 'mongodb+srv://admin-Cecilia:Cr020199@cluster0.nazzt.mongodb.net/iService?retryWrites=true&w=majority';
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.catch((p) => {
		console.log(p);
	});
app.use(express.static(path.join(__dirname, 'public')));
const regRouter = require('./routes/Route');
const authRouter = require('./routes/auth');

app.set('view engine', 'ejs');
app.get('/',function(req, res){
	res.redirect('/register');
});

app.use('/experts', regRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
	res.redirect('/auth/login');
});

app.listen(5050, (req,res) => {
	console.log('Server is running');
});
