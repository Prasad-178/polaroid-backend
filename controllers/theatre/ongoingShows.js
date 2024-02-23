const Theatre = require("../../models/theatre");

const ongoingShows = async (req, res) => {
  // Get the current date
  const currentDate = new Date();

  // Aggregate to find movies with future shows
  Theatre.aggregate(
    [
      {
        $unwind: "$movieInfo", // Deconstruct the movieInfo array for processing
      },
      {
        $match: {
          "movieInfo.timings.startTiming": { $gte: currentDate },
        },
      },
      {
        $group: {
          _id: {
            movieName: "$movieInfo.movieName",
            location: '$location'
          },
          movieInfo: { $push: "$movieInfo" },
        },
      },
    ],
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        return res
            .status(200)
            .json(result)
      }
    }
  );
};

module.exports = ongoingShows;
