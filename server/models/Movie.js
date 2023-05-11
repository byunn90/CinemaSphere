const { Schema } = require("mongoose");

const movieSchema = new Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
  },
  director: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = movieSchema;
