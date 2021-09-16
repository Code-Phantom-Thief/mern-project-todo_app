const Joi = require('joi');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.signUp = async (req, res) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(30).required(),
		email: Joi.string().min(3).max(200).email().required(),
		password: Joi.string().min(6).max(1024).required(),
	});
	const { error } = schema.validate(req.body);
	if (error)
		return res
			.status(500)
			.json({ message: error.details[0].message });
	try {
		const { name, email, password } = req.body;
		const existUser = await User.findOne({ email });
		if (existUser)
			return res
				.status(400)
				.json({
					message: 'User with email already exist...',
				});
		const newUser = await new User({
			name,
			email,
			password,
		});
		await newUser.save();
		const token = jwt.sign(
			{
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
			},
			JWT_SECRET,
			{ expiresIn: '1h' }
		);
		res
			.status(200)
			.json(token);
	} catch (error) {
		res
			.status(500)
			.json({ success: false, message: error.message });
	}
};
