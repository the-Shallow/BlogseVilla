const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const blogData = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Blog must have a name of the writer'],
        trim: true,
        maxLength: [20, 'A tour must have less or equal to 20 characters'],
        minLength: [5, 'A tour must have more or equal to 10 characters'],
    },
    email: {
        type: String,
        required: [true, 'A Blog must have a email of the writer'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email address"]
    },
    title: {
        type: String,
        required: [true, "A Blog must have a title"]
    },
    description: {
        type: String,
        required: [true, "A Blog must have a short description"]
    },
    photo: {
        type: String
    },
    content: {
        type: [String],
        required: [true, "A Blog must have the content"],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    slug:String
});


blogData.index({ slug: 1 });

blogData.pre('save', function (next) {
  this.slug = slugify(this.title + this.description, { lower: true });
  next();
});

const blog = mongoose.model('Blog', blogData);

module.exports = blog;