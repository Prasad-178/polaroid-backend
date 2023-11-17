const { Router } = require("express");
const session = require("../session/session");
const router = Router();
const getLatestMovies = require("../api/getTrendingMovies");
const getNowPlaying = require("../api/getNowPlaying");
const getUpcoming = require("../api/getUpcoming");
const getTrendingThisWeek = require("../api/getTrendingThisWeek");
const getMovieById = require("../api/getMovieById");
const getMovieCredits = require("../api/getMovieCredits");
const getWatchProviders = require("../api/getWatchProviders");
const getMovieByName = require("../api/getMovieByName");
const getReviews = require("../controllers/reviews/getReviewsAndRating");
const addReview = require("../controllers/reviews/addReview");
const getSimilarMovies = require("../api/getSimilarMovies");
const getRecentLists = require("../controllers/list/getRecentLists");
const getTrendingMovies = require("../api/getTrendingMovies");
const getUserByName = require("../controllers/user/getUserByName");
const follow = require("../controllers/follow/follow");
const unFollow = require("../controllers/follow/unfollow");
const getMyLists = require("../controllers/list/getMyLists");
const appendToList = require("../controllers/list/appendItemToList");
const getList = require("../controllers/list/getListByUserandListName");
const getListsByUser = require("../controllers/list/getListsOfUser");
const addToWatchlist = require("../controllers/watchlist/addToWatchlist");
const addToFavourites = require("../controllers/favourites/appendItemToFavourites");
const addToWatched = require("../controllers/watched/addToWatched");
const removeFromWatchlist = require("../controllers/watchlist/removeFromWatchlist");
const removeFromFavourites = require("../controllers/favourites/removeItemFromFavourites");
const removeFromWatched = require("../controllers/watched/removeFromWatched");
const checkIfFavourite = require("../controllers/user/checkIfFavourite");
const checkIfInWatchlist = require("../controllers/user/checkIfInWatchlist");
const checkIfWatched = require("../controllers/user/checkIfWatched");
const getFollowerDetails = require("../controllers/user/getFollowerDetails");
const getFollowingDetails = require("../controllers/user/getFollowingDetails");
const theatre = require("../models/theatre");
const getMovieAvailability = require("../controllers/bookings/getMovieAvailability");
const getSeats = require("../controllers/bookings/getSeats");
const variables = require("../config");
const addBooking = require("../controllers/bookings/addBooking");
const getTrendingListsToday = require("../api/getTrendingLists").day;
const getTrendingListsthisWeek = require("../api/getTrendingLists").week;
const stripe = require('stripe')(variables.stripe_secret_key)

// router.use('/', check)

router.get(
  "/list, username: session.username, email: session.emailsearch",
  (req, res) => {
    res.render("list_search", {
      check: session.isLoggedIn,
      username: session.username,
      email: session.email,
    });
  }
);

router.get("/lists", async (req, res) => {
  const lists = await getRecentLists()
  res.render("lists", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    lists: lists
  });
});

router.get("/booking/:id/getAvl", getMovieAvailability)

router.get("/booking/:venue/:id/:movieTiming", async (req, res) => {
  const venue = req.params.venue
  const id = req.params.id
  const movieTiming = req.params.movieTiming
  const movieAvl = await getMovieAvailability(req.params.id)
  // console.log(movieAvl)
  res.render("booking", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: movieAvl[venue],
    key: variables.stripe_publishable_key
  });
});

router.get('/followers/:username', async (req, res) => {
  let id = req.params.username
  id = id.split("%20").join(" ")
  const data = await getFollowerDetails(id)
  res.render('follower', {
    check: true,
    username: session.username,
    email: session.email,
    data: data,
    id: id
  })
})

router.get('/following/:username', async (req, res) => {
  let id = req.params.username
  id = id.split("%20").join(" ")
  const data = await getFollowingDetails(id)
  // console.log(id, data)
  res.render('following', {
    check: true,
    username: session.username,
    email: session.email,
    data: data,
    id: id
  })
})

router.get('/watchlist/:username', async (req, res) => {
  let username = req.params.username
  username = username.split("%20").join(" ")

  const user = await getUserByName(username)
  res.render("watchlist", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: user.user.planToWatch,
    userWatchList:  username,
    editable: false
  })
})

router.get('/watchedfilms/:username', async (req, res) => {
  let username = req.params.username
  username = username.split("%20").join(" ")

  const user = await getUserByName(username)
  res.render("watched_films", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: user.user.watched,
    userWatchList: username,
    editable: false
  })
})

router.post('/addtowatchlist/:id', addToWatchlist)

router.post('/removefromwatchlist/:id', removeFromWatchlist)

router.post('/addtofavs/:id', addToFavourites)

router.post('/removefromfavs/:id', removeFromFavourites)

router.post('/addtowatched/:id', addToWatched)

router.post('/removefromwatched/:id', removeFromWatched)

router.get('/lists/:username', async (req, res) => {
  let username = req.params.username
  username = username.split("%20").join(" ")

  const lists = await getListsByUser(username)
  res.render('otherUser_list', {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    lists: lists,
    usernameList: username
  })
})

router.get("/list/:username/:listName", async (req, res) => {
  let username = req.params.username
  let listName = req.params.listName;
  listName = listName.split("%20").join(" ") ;

  const list = await getList(username, listName);
  res.render("list_page", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: list,
    heading: "CREATED BY " + list.createdBy,
    time: "Created On " + list.createdAt.slice(0, 15),
    isTrending: false,
    listHeading: list.listName,
    editable: false
  });
});

router.post('/confirmticket', addBooking)

router.get('/retrieveseats/:id/:timing/:venue', getSeats)

router.get('/retrievebookingdetails/:id', getMovieAvailability)

router.get("/bookingdetails/:id", async (req, res) => {
  // if (req.params.id == 597) {
  //   await theatre.deleteMany({}).exec()
  //   const show = new theatre(
  //   {
  //     location: "Orion Mall New Delhi",
  //     movieInfo: [
  //       {
  //         movieName: "76600",
  //         timings: [
  //           {
  //             timing: "25th_Apr,_11AM"
  //           },
  //           {
  //             timing: "25th_Apr,_4.30PM"
  //           },
  //           {
  //             timing: "25th_Apr,_8PM"
  //           },
  //           {
  //             timing: "26th_Apr,_10.45AM"
  //           },
  //           {
  //             timing: "26th_Apr,_2PM"
  //           },
  //           {
  //             timing: "27th_Apr,_6.30PM"
  //           },
  //           {
  //             timing: "27th_Apr,_8.30PM"
  //           },
  //           {
  //             timing: "27th_Apr,_11.05PM"
  //           },
  //         ]
  //       }
  //     ,
  //       {
  //         movieName: "597",
  //         timings: [
  //           {
  //             timing: "15th_Apr,_11AM"
  //           },
  //           {
  //             timing: "15th_Apr,_4.30PM"
  //           },
  //           {
  //             timing: "15th_Apr,_8PM"
  //           },
  //           {
  //             timing: "16th_Apr,_10.45AM"
  //           },
  //           {
  //             timing: "16th_Apr,_2PM"
  //           },
  //           {
  //             timing: "17th_Apr,_6.30PM"
  //           },
  //           {
  //             timing: "17th_Apr,_8.30PM"
  //           },
  //           {
  //             timing: "17th_Apr,_11.05PM"
  //           },
  //         ]
  //       }
  //     ]
  //   })
  //   const show2 = new theatre(
  //     {
  //       location: "VR Mall Chennai",
  //       movieInfo: [
  //         {
  //           movieName: "76600",
  //           timings: [
  //             {
  //               timing: "15th_Apr,_11AM"
  //             },
  //             {
  //               timing: "15th_Apr,_4.30PM"
  //             },
  //             {
  //               timing: "15th_Apr,_8PM"
  //             },
  //             {
  //               timing: "16th_Apr,_10.45AM"
  //             },
  //             {
  //               timing: "16th_Apr,_2PM"
  //             },
  //             {
  //               timing: "17th_Apr,_6.30PM"
  //             },
  //             {
  //               timing: "17th_Apr,_8.30PM"
  //             },
  //             {
  //               timing: "17th_Apr,_11.05PM"
  //             },
  //           ]
  //         }
  //       ,
  //         {
  //           movieName: "597",
  //           timings: [
  //             {
  //               timing: "15th_Apr,_11AM"
  //             },
  //             {
  //               timing: "15th_Apr,_4.30PM"
  //             },
  //             {
  //               timing: "15th_Apr,_8PM"
  //             },
  //             {
  //               timing: "16th_Apr,_10.45AM"
  //             },
  //             {
  //               timing: "16th_Apr,_2PM"
  //             },
  //             {
  //               timing: "17th_Apr,_6.30PM"
  //             },
  //             {
  //               timing: "17th_Apr,_8.30PM"
  //             },
  //             {
  //               timing: "17th_Apr,_11.05PM"
  //             },
  //           ]
  //         }
  //       ]
  //   })

  //   try {
  //     await show.save()
  //     await show2.save()
  //   } catch (err) {
  //     console.log(err)
  //   }

  //   }
  const movieAvl = await getMovieAvailability(req.params.id)
  // console.log(movieAvl)

  res.render("bookingdetails", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: movieAvl
  });
});

router.get("/faq", (req, res) => {
  res.render("faq", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
  });
});

router.post("/payment", async (req, res) => {
  try {
    const movie = await getMovieById(req.body.id)
    console.log(movie)
    const movieName = movie.title
    // console.log("items is : ", req.body)
    let seat_string = ""
    for (let i=0; i<req.body.seat_list.length; i++) {
      let second = +req.body.seat_list[i]%10
      second++
      let first = (Math.floor(req.body.seat_list[i]/10))%10
      first = String.fromCharCode(65+first)

      // console.log(first, second)

      let final_seat = first.toString() + second.toString()

      seat_string += final_seat + ", "
    }

    seat_string = seat_string.slice(0, seat_string.length-2)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode:'payment',
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: movieName + " at " + req.body.venue.trim(),
                description: "Seat List : " + seat_string
              },
              unit_amount: 100*300
            },
            quantity: req.body.seat_list.length
          }
        ],
        success_url: 'http://localhost:3500/payment/success',
        cancel_url: 'http://localhost:3500/payment/failure'
    })

    res.json({url:session.url})
} catch (e) {
    console.log(e);
    res.status(500).json({error:e.message})
}
});

router.get("/trending/week", async (req, res) => {
  const data = await getTrendingListsthisWeek()
  console.log(data)
  res.render("list_page", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: data,
    heading: "TRENDING THIS WEEK",
    time: "Updated 6h ago",
    isTrending: true,
    listHeading: "Movies Most Popular This Week",
    editable: false
  });
});

router.get("/trending/day", async (req, res) => {
  const data = await getTrendingListsToday()
  res.render("list_page", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: data,
    heading: "TRENDING TODAY",
    time: "Updated 6h ago",
    isTrending: true,
    listHeading: "Movies Most Popular Today",
    editable: false
  });
});

let latest;
let nowPlaying;
let upcomingData;
let popularThisWeek;

let dataObtained = false;

router.get("/", async (req, res) => {
  if (!dataObtained) {
    latest = await getLatestMovies();
    nowPlaying = await getNowPlaying();
    upcomingData = await getUpcoming();
    popularThisWeek = await getTrendingThisWeek();
    dataObtained = true;
  }
  res.render("polaroid", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    results: latest.results,
    playing: nowPlaying.results,
    upcoming: upcomingData.results,
    popular: popularThisWeek.results,
  });
});

router.get("/about", (req, res) => {
  res.render("aboutus", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
  });
});

router.get('/profile/:name', async (req, res) => {
  const name = req.params.name.split("%20").join(" ")
  if (name == session.username) {
    res.redirect('/user/profile')
    return
  }
  const data = await getUserByName(name)
  console.log(data)
  if (!data.user) {
    res.redirect('/usernotfound')
    return
  }
  res.render("othersProfile", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    currentUser: false,
    data: data.user,
    listLength: data.listLength
  });
})

router.post('/profile/follow/:name', follow)

router.post('/profile/unfollow/:name', unFollow)

router.get("/films", async (req, res) => {
  const nowPlaying = await getNowPlaying()
  const trendingMovies = await getTrendingMovies()
  const upcoming = await getUpcoming()
  res.render("films", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    upcoming: upcoming,
    nowPlaying: nowPlaying,
    trendingMovies: trendingMovies
  });
});

// router.post("/booking", (req, res) => {
//   res.redirect("/payment");
// });

router.get("/filmreviews/:id", getReviews)

router.post("/checkiffav/:id", checkIfFavourite)

router.post("/checkifinwatchlist/:id", checkIfInWatchlist)

router.post("/checkifwatched/:id", checkIfWatched)

router.post("/getmylists", getMyLists)

router.get("/film/:id", async (req, res) => {
  const id = req.params.id
  const movieData = await getMovieById(id);
  const cast = await getMovieCredits(id);
  const watch = await getWatchProviders(id);
  const reviews = await getReviews(id)
  const similar = await getSimilarMovies(id)
  const isFavourite = await checkIfFavourite(id)
  const isWatchlist = await checkIfInWatchlist(id)
  const isWatched = await checkIfWatched(id)
  if (session.username === "") lists = []
  else lists = await getMyLists()
    res.render("film", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: movieData,
    cast: cast,
    watchProviders: watch.results.IN,
    reviews: reviews,
    errorReview: "",
    similar: similar,
    lists: lists,
    isFavourite: isFavourite,
    isWatched: isWatched,
    isWatchlist: isWatchlist
  });
});

router.get("/list/add/:listName/:listItem", appendToList)

router.get("/list/add/:listName/:id", async (req, res) => {
  let listName = req.params.listName
  listName = listName.split("%20").join(" ")
  const id = req.params.id
  const result = await appendToList(listName, id)

  res.redirect('/user/list/'+listName)
})

router.post("/film/:id", addReview)

module.exports = router;
