const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/auth");
const http = require('http');
//load User model
const Person = require("../models/User");
//load Tache model
const Tache = require("../models/Tache");


//@type - POST
//@route -  /api/taches
//@desc - route for submit tache
//@access - PRIVATE
router.post(""/*, authorize*/, (req, res) => {
    const newTache = new Tache({
        users: req.body.users,
        sujet: req.body.sujet,
        date_deb: req.body.date_deb,
        date_fin: req.body.date_fin,
    });

  newTache.save()
        .then(tache => {
            res.json(tache)
        })
        .catch(err => console.log("Unable to save tache to database", err));
})

//@type - DELETE
//@route -  /api/taches/:q_id
//@desc - route for deleting a specific tache
//@access - PRIVATE
router.delete("/:tache_id"/*, authorize*/, (req, res) => {
  Tache.find({ _id: req.params.tache_id })
        .then(tache => {
            if (!tache) {
                return res.json({ "NoTache": "Tache Not found" });
            }
            
            Tache.findOneAndRemove({ _id: req.params.q_id})
                .then(() => res.json({ Delete: "Deleted Successfully" }))
                .catch(err => console.log("Problem in removing Tache", err));
            

            
        })
        .catch(err => console.log("Problem in Deleting a specific question", err));
});

//@type - DELETE
//@route -  /api/taches/all
//@desc - route for deleting all taches
//@access - PRIVATE
router.delete("/all/del", /*authorize ,*/ (req, res) => {
   
  Tache.find({ user: req.body.id }).remove(() => {
        return res.json({ Deleted_all: "Succesfully deleted!" })
    })
});

//@type - GET
//@route -  /api/taches
//@desc - route for showing all taches
//@access - PUBLIC
router.get("/", async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 3 } = req.query;
  
    try {
      // execute query with page and limit values
      const taches = await Tache.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort( {date: 'desc'})
        .exec();
  
      // get total documents in the Taches collection 
      const count = await Tache.countDocuments();
  
      // return response with taches, total pages, and current page
      res.json({
        taches,
          totalPages: Math.ceil(count / limit),
          currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
  });
  
















module.exports = router;