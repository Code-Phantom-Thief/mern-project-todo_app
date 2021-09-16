const Todo = require('../models/Todo');
const Joi = require('joi');

exports.getAllTodos = async (req, res) => {
	try {
		const AllTodos = await Todo.find().sort({
			createdAt: -1,
		});
		const filteredTodos = AllTodos.filter(
			(todo) => todo.uid === req.user._id
		);
		res.status(200).json(filteredTodos);
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: error.message });
	}
};

exports.getOneTodo = async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);
		res.status(200).json(todo);
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: error.message });
	}
};

exports.createPost = async (req, res) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(200).required(),
		author: Joi.string().min(3).max(30),
		uid: Joi.string(),
		isComplete: Joi.boolean(),
	});
	const { error } = schema.validate(req.body);
	if (error)
		return res.status(400).json({
			success: false,
			message: error.details[0].message,
		});

	const { name, author, uid, isComplete } = req.body;
	const todo = new Todo({
		name,
		author,
		uid,
		isComplete,
	});
	try {
		await todo.save();
		return res.status(200).json(todo);
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: error.message });
	}
};

exports.updatePost = async (req, res) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(200).required(),
		author: Joi.string().min(3).max(30),
		uid: Joi.string(),
		isComplete: Joi.boolean(),
	});

	const { error } = schema.validate(req.body);
	if (error)
		return res.status(400).json({
			success: false,
			message: error.details[0].message,
		});
	const { name, author, uid, isComplete } = req.body;
	try {
		const todo = await Todo.findById(req.params.id);
		if (!todo)
			return res.status(404).json({
				success: false,
				message: 'Todo not found...',
			});
		if (todo.uid !== req.user._id)
			return res.status(401).json({
				message:
					'Todo update failed. You are not authorized...',
			});

		const updatedTodo = await Todo.findByIdAndUpdate(
			req.params.id,
			{ name, author, uid, isComplete },
			{ new: true }
		);
		res.status(200).json(updatedTodo);
	} catch (error) {}
};

exports.deletePost = async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);
		if (!todo)
			return res.status(404).json({
				success: false,
				message: 'Todo not found...',
			});
		if (todo.uid !== req.user._id)
			return res.status(401).json({
				message:
					'Todo delete failed. You are not authorized...',
			});
		const deletedTodo = await Todo.findByIdAndDelete(
			req.params.id
		);
		res.status(200).json({
			message: 'Todo list has been deleted',
			deletedTodo,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: error.message });
	}
};

exports.patchPost = async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);
		if (!todo)
			return res.status(404).json({
				success: false,
				message: 'Todo not found...',
			});
		if (todo.uid !== req.user._id)
			return res.status(401).json({
				message:
					'Todo check/uncheck failed. You are not authorized...',
			});
		const patchTodo = await Todo.findByIdAndUpdate(
			req.params.id,
			{
				isComplete: !todo.isComplete,
			},
			{ new: true }
		);
		res.status(200).json(patchTodo);
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: error.message });
	}
};
