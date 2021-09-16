const Joi = require('joi');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.signIn = async (req, res) => {
	const schema = Joi.object({
		email: Joi.string().min(3).max(200).email().required(),
		password: Joi.string().min(6).max(1024).required()
	})
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).json({ success: false, message: error.details[0].message });
	try {
		const { email, password } = req.body;
		const existUser = await User.findOne({ email });
		if (!existUser) return res.status(400).json({ success: false, message: "Invalid Email and/or Password" });

		const validPassword = await existUser.comparePassword(password);
		if(!validPassword) return res
			.status(400)
			.json({
				success: false,
				message: 'Invalid Email and/or Password',
			});
		
		const token = jwt.sign({ _id: existUser._id, name: existUser.name, email: existUser.email }, JWT_SECRET, {expiresIn:'1h'});
		res.status(200).json(token);
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
