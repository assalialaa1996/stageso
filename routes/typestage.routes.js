const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/auth");
const http = require('http');
//load User model
const Person = require("../models/User");
//load Question model
const TypeStage = require("../models/TypeStage");

//@type - POST
//@route -  /api/typestages
//@desc - route for submit a new stage type
//@access - PRIVATE
router.post(""/*, authorize*/, (req, res) => {
    const newType = new TypeStage({
      
        type: req.body.type
    });

    newType.save()
        .then(typestage => {
            res.json(typestage)
        })
        .catch(err => console.log("Unable to save new type to database", err));
})

//@type - DELETE
//@route -  /api/typestages/:q_id
//@desc - route for deleting a specific stage type
//@access - PRIVATE
router.delete("/:stage_id"/*, authorize*/, (req, res) => {
    TypeStage.find({ _id: req.params.stage_id })
        .then(stage => {
            if (!stage) {
                return res.json({ "NoStage": "Stage Type Not found" });
            }
            
            TypeStage.findOneAndRemove({ _id: req.params.q_id})
                .then(() => res.json({ Delete: "Deleted Successfully" }))
                .catch(err => console.log("Problem in removing Stage Type", err));
            

            
        })
        .catch(err => console.log("Problem in Deleting a specific question", err));
});
module.exports = router;