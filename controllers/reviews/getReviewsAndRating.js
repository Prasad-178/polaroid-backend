const Review = require("../../models/reviews");
const { getOrSetCache } = require("../../redisProvider");

const getReviews = async (req, res) => {
    const { id } = req.params
    let reviews;

    getOrSetCache(`reviews?id=${id}`, 60, async() => {
        try {
            reviews = await Review.find({ movie: id }).exec();
            
            let sum = 0
            for (let i = 0; i < reviews.length; i++) {
                sum += reviews[i].stars;
            }

            if (reviews.length === 0) {
                return {
                    comment: "There have been no reviews for this movie yet!",
                    reviews: [],
                }
            }

            return {
                comment: "",
                reviews: reviews,
                avg: sum / reviews.length,
            }
        } catch (err) {
            throw new Error(err)
        }
    })
    .then((data) => {
        return res
            .status(200)
            .json(data)
    })
    .catch((err) => {
        return res
            .status(500)
            .json(err)
    })
};

module.exports = getReviews;
