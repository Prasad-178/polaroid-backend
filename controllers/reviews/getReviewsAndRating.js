const Review = require("../../models/reviews");

const getReviews = async (id) => {
  // get rating also using mongoose $sum
  let reviews;
  try {
    reviews = await Review.find({ movie: id }).exec();
  } catch (err) {
    console.log(err);
    return undefined;
  }

  let sum = 0
  for (let i=0; i<reviews.length; i++) {
    sum += reviews[i].stars
  }

  if (reviews.length === 0) {
    return {
        comment: "There have been no reviews for this movie yet!",
        reviews: []
    };
  }

  return {
    comment: "",
    reviews: reviews,
    avg: sum/reviews.length
  }
};

module.exports = getReviews;
