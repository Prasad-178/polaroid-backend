const Review = require("../../models/reviews");

const getReviews = async (req, res) => {
    const { id } = req.params
    let reviews;

    try {
        reviews = await Review.find({ movie: id }).exec();
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ 
                error: "Internal server error!" 
            });
    }

    let sum = 0;
    for (let i = 0; i < reviews.length; i++) {
        sum += reviews[i].stars;
    }

    if (reviews.length === 0) {
        return res
            .status(200)
            .json({
                comment: "There have been no reviews for this movie yet!",
                reviews: [],
            });
    }

    return res
        .status(200)
        .json({
            comment: "",
            reviews: reviews,
            avg: sum / reviews.length,
        });
};

module.exports = getReviews;
