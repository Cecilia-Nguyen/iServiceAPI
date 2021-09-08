const User = require('../model/User');
const mailHelper = require('../helper/helper-mail');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports.postUser = async (req, res, next) => {
	let presentCustomer;
	try {
		presentCustomer = await User.find({ email: req.body.obj.email }).exec();
	} catch (error) {
		return res.render('index', { error: 'none' });
	}
	if (presentCustomer.length == 0) {
		if (req.body.obj.password != req.body.rePassword) {
			return res.render('index', { error: 'enter valid re password' });
		} else {
			req.body.obj.password = bcrypt.hashSync(req.body.obj.password, saltRounds);
		}
		try {
			let newCustomer = await User.insertMany([ req.body.obj ]);
			mailHelper.sendMail(req.body.obj.email);
			res.render('home', { name: req.body.obj.firstName });
		} catch (error) {
			let err = error.errors[Object.keys(error.errors)[0]].path;
			res.render('index', { error: 'Enter valid ' + err });
		}
	} else {
		return res.render('index', { error: 'Email Already exists. Please Login' });
	}
};

module.exports.deleteUsers = async (req, res, next) => {
	let obj = {};
	if (req.params.id !== undefined) {
		obj = { _id: req.params.id };
	}
	try {
		let a = await User.deleteMany(obj);
		res.status(200).json({ message: 'Deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting' });
	}
};

module.exports.getUsers = async (req, res, next) => {
	let obj = {};
	if (req.params.id !== undefined) {
		obj = { _id: req.params.id };
	}
	try {
		let user = await User.find(obj).exec();
		res.status(200).json({ experts: user });
	} catch (error) {
		res.status(500).json({ message: 'Error getting details' });
	}
};

module.exports.updateUser = async (req, res, next) => {
	if (req.params.id !== undefined) {
		let obj = { _id: req.params.id };
		let flag = 0;
		let updatedExpert;
		try {
			let user = await User.findOne(obj).exec();
			console.log(req.query.update);
			console.log(req.body);
			if (req.query.update == 'password' && req.body.password) {
				let password = bcrypt.hashSync(req.body.password, saltRounds);
				user.password = password;

				//user.passord = bcrypt.hashSync(req.body.password, saltRounds);
				console.log(user.password);
				updatedExpert = await user.save();
				flag += 1;
			} else if (req.query.update == 'addressAndPhone' && req.body.address && req.body.phoneNumber) {
				user.address = req.body.address;
				user.phoneNumber = req.body.phoneNumber;
				updatedExpert = await user.save();
				flag += 1;
			} else if (req.query.update == 'other') {
			
				updatedExpert = await user.save();
				flag += 1;
			}
			if (flag > 0) {
				res.status(200).json({ experts: updatedExpert});
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Error updating details' });
		}
	} else {
		res.status(500).json({ message: 'Error updating details' });
	}
};
