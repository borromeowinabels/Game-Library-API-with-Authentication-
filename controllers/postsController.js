const { createPostSchema } = require('../middlewares/validator');
const Post = require('../models/postModels');

exports.getPosts = async (req, res) => {
	const { page } = req.query;
	const postsPerPage = 10;

	try {
		let pageNum = 0;
		if (page <= 1) {
			pageNum = 0;
		} else {
			pageNum = page - 1;
		}
		const result = await Post.find()
			.sort({ createdAt: -1 })
			.skip(pageNum * postsPerPage)
			.limit(postsPerPage)
			.populate({
				path: 'userId',
				select: 'email',
			});
		res.status(200).json({ success: true, message: 'posts', data: result });
	} catch (error) {
		console.log(error);
	}
};

exports.searchPost = async (req, res) => {
	const { _id } = req.query;

	try {
		const existingPost = await Post.findOne({ _id }).populate({
			path: 'userId',
			select: 'email',
		});
		if (!existingPost) {
			return res
				.status(404)
				.json({ success: false, message: 'Post unavailable' });
		}
		res
			.status(200)
			.json({ success: true, message: 'search post', data: existingPost });
	} catch (error) {
		console.log(error);
	}
};

exports.createPost = async (req, res) => {
	const { title, genre, platform, releaseYear, description } = req.body;
	const { userId } = req.user;
	try {
		const { error, value } = createPostSchema.validate({
			title, genre, platform, releaseYear, description,
			userId,
		});
		if (error) {
			return res
				.status(401)
				.json({ success: false, message: error.details[0].message });
		}

		const result = await Post.create({
			title, genre, platform, releaseYear, description,
			userId,
		});
		res.status(201).json({ success: true, message: 'created', data: result });
	} catch (error) {
		console.log(error);
	}
};

exports.updatePost = async (req, res) => {
	const { _id } = req.query;
	const { title, genre, platform, releaseYear, description} = req.body;
	const { userId } = req.user;
	try {
		const { error, value } = createPostSchema.validate({
			title, genre, platform, releaseYear, description,
			userId,
		});
		if (error) {
			return res
				.status(401)
				.json({ success: false, message: error.details[0].message });
		}
		const existingPost = await Post.findOne({ _id });
		if (!existingPost) {
			return res
				.status(404)
				.json({ success: false, message: 'Post unavailable' });
		}
		if (existingPost.userId.toString() !== userId) {
			return res.status(403).json({ success: false, message: 'Unauthorized' });
		}
		existingPost.title = title;
    existingPost.genre = genre;
    existingPost.platform= platform;
    existingPost.releaseYear = releaseYear;
		existingPost.description = description;

		const result = await existingPost.save();
		res.status(200).json({ success: true, message: 'Updated', data: result });
	} catch (error) {
		console.log(error);
	}
};

exports.deletePost = async (req, res) => {
	const { _id } = req.query;

	const { userId } = req.user;
	try {
		const existingPost = await Post.findOne({ _id });
		if (!existingPost) {
			return res
				.status(404)
				.json({ success: false, message: 'Post already unavailable' });
		}
		if (existingPost.userId.toString() !== userId) {
			return res.status(403).json({ success: false, message: 'Unauthorized' });
		}

		await Post.deleteOne({ _id });
		res.status(200).json({ success: true, message: 'deleted' });
	} catch (error) {
		console.log(error);
	}
};