const Review = require("../../models/reviews");
const session = require("../../session/session");

const addReview = async (req, res) => {
  const { rating, body } = req.body;
  const username = session.username;
  const movie = req.params.id;

  let existingReview;
  try {
    existingReview = await Review.findOne({
      username: username,
      movie: movie,
    }).exec();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Internal server error!" })
  }

  if (existingReview) {
    return res
      .status(402)
      .json({ error: "You have already posted a review!" })
  }

  const newReview = new Review({
    movie: movie,
    username: username,
    body: body,
    stars: rating,
  });

  try {
    await newReview.save();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Internal server error!" })
  }

  return res
    .status(200)
    .json({ message: "Review added successfully!" })
};

module.exports = addReview;
