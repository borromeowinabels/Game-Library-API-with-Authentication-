const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'title is required!'],
			trim: true,
		},
    genre: {
			type: String,
			required: [true, 'genre is required!'],
			trim: true,
		},
    platform: {
			type: String,
			required: [true, 'platform is required!'],
			trim: true,
		},
    releaseYear: {
			type: Number,
			required: [true, 'Release year is required!'],
			trim: true,
		},
		description: {
			type: String,
			required: [true, 'description is required!'],
			trim: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);