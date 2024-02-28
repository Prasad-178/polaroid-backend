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
    //   {
    //     $match: {
    //       "movieInfo.timings.startTiming": { $gte: currentDate },
    //     },
    //   },
      {
        $group: {
          _id: "$movieInfo.movieName",
        },
      },
    ],
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        const movieNames = result.map((entry) => entry._id);
        return res
            .status(200)
            .json(movieNames)
      }
    }
  );
};

module.exports = ongoingShows;
