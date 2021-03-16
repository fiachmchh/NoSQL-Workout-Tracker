const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");

router.get("/exercise", ({ body }, res) => {
    console.log("we hit the route")
    res.sendFile(path.join(__dirname, '../public', 'exercise.html'));
});

router.get("/api/workouts", ({ body }, res) => {
    console.log("we hit the 2nd route")
    Workout.find({})
    .sort({ day: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
    
});

router.post("/api/workouts", ({ body }, res) => {
    Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  router.put("/api/workouts/:id", (req, res) => {
      console.log('we hit the put route this is my body', req.body)
      console.log('This is my paramssss', req.params)

      Workout.findOneAndUpdate(
        { _id:req.params.id },
        { $push: { "workout": req.body}}
      ).then(function(data) {
        res.json(data)
      })
  });

  router.get("/stats", ({ body }, res) => {
    console.log("we hit the route")
    res.sendFile(path.join(__dirname, '../public', 'stats.html'));
});


// router.post("/api/transaction/bulk", ({ body }, res) => {
//   Transaction.insertMany(body)
//     .then(dbTransaction => {
//       res.json(dbTransaction);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// router.get("/api/transaction", (req, res) => {
//   Transaction.find({})
//     .sort({ date: -1 })
//     .then(dbTransaction => {
//       res.json(dbTransaction);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

module.exports = router;
