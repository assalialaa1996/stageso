const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/auth");
const http = require('http');
//load User model
const Person = require("../models/User");
//load Stage model
const Stage = require("../models/Stage");


//@type - POST
//@route -  /api/stages
//@desc - route for submit Stage
//@access - PRIVATE
router.post(""/*, authorize*/, (req, res) => {
    const newStage = new Stage({
        users: req.body.users,
        sujet: req.body.sujet,
        date_deb: req.body.date_deb,
        date_fin: req.body.date_fin,
        type: req.body.type
    });

  newStage.save()
        .then(stage => {
            res.json(stage)
        })
        .catch(err => console.log("Unable to save stage to database", err));
})

//@type - DELETE
//@route -  /api/stages/:q_id
//@desc - route for deleting a specific stage
//@access - PRIVATE
router.delete("/:stage_id"/*, authorize*/, (req, res) => {
    Stage.find({ _id: req.params.stage_id })
        .then(stage => {
            if (!stage) {
                return res.json({ "NoStage": "Stage Not found" });
            }
            
            Stage.findOneAndRemove({ _id: req.params.q_id})
                .then(() => res.json({ Delete: "Deleted Successfully" }))
                .catch(err => console.log("Problem in removing Stage", err));
            

            
        })
        .catch(err => console.log("Problem in Deleting a specific stage", err));
});

//@type - DELETE
//@route -  /api/stages/all
//@desc - route for deleting all stages
//@access - PRIVATE
router.delete("/all/del", authorize , (req, res) => {
   
    Stage.find({ user: req.body.id }).remove(() => {
        return res.json({ Deleted_all: "Succesfully deleted!" })
    })
});

//@type - GET
//@route -  /api/stages
//@desc - route for showing all stages
//@access - PUBLIC
router.get("/", async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 3 } = req.query;
  
    try {
      // execute query with page and limit values
      const stages = await Stage.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort( {date: 'desc'})
        .exec();
  
      // get total documents in the Stages collection 
      const count = await Stage.countDocuments();
  
      // return response with posts, total pages, and current page
      res.json({
        stages,
          totalPages: Math.ceil(count / limit),
          currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
  });
  
  module.exports = router;