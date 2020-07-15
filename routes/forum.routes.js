const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/auth");
const http = require('http');

const Forum= require('../models/Forum')

//@type - POST
//@route -  /api/forum
//@desc - route for submit new topic
//@access - PRIVATE
router.post(""/*, authorize*/, (req, res) => { 
    const newTopic = new Forum({
        author: req.body.author,
        sujet: req.body.sujet,
    });

    newTopic.save()
        .then(topic => {
            res.json(topic)
        })
        .catch(err => console.log("Unable to save topic to database", err));
})


//@type - DELETE
//@route -  /api/forum/:topic_id
//@desc - route for deleting a specific topic
//@access - PRIVATE
router.delete("/:topic_id"/*, authorize*/, (req, res) => {
    Forum.find({ _id: req.params.topic_id })
        .then(topic => {
            if (!topic) {
                return res.json({ "NoTopic": "Topic Not found" });
            }
            
            Forum.findOneAndRemove({ _id: req.params.topic_id})
                .then(() => res.json({ Delete: "Deleted Successfully" }))
                .catch(err => console.log("Problem in removing Topic", err));                     
        })
        .catch(err => console.log("Problem in Deleting a specific Topic", err));
});

//@type - GET
//@route -  /api/forum/my/:id
//@desc - route for retreiving user's topics
//@access - PRIVATE
router.get("/my/:id", async (req, res) => {
 
 
    // destructure page and limit and set default values
    const { page = 1, limit = 3 } = req.query;
      
    try { 
      // execute query with page and limit values
      const topics = await Forum.find({ author: req.params.id })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort( {date: 'desc'})
        .exec();
    
      // get total documents in the Forum collection 
      const count = await Question.countDocuments({ authoe: req.params.id });
    
      // return response with topics, total pages, and current page
      res.json({
        topics,
          totalPages: Math.ceil(count / limit),
          currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
    });

//@type - GET
//@route -  /api/forum/:id
//@desc - route for retreiving  topic by its ID
//@access - PRIVATE
router.get("/:id", (req, res) => {
 

    Forum.find({ _id: req.params.id })
    .then(topic => {
        if (!topic) {
            return res.json({ "NoTopic": "Topic Not found" });
        }
        
            res.send(topic);
    })
  });

//@type - GET
//@route -  /api/forum
//@desc - route for showing all topics paginated
//@access - PUBLIC
router.get("/", async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 6 } = req.query;
  
    try {
      // execute query with page and limit values
      const topics = await Forum.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort( {date: 'desc'})
        .exec();
  
      // get total documents in the Forum collection 
      const count = await Forum.countDocuments();
  
      // return response with topics, total pages, and current page
      res.json({
        topics,
          totalPages: Math.ceil(count / limit),
          currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
  });


  //@type - POST
//@route -  /api/forum/answers/:id
//@desc - route for submit answers to topic
//@access - PRIVATE
router.post("/answers/:id",/* authorize,*/ (req, res) => {
    Forum.findById(req.params.id)
        .then(topic => {
            const newAnswer = {
                author: req.body.id,
                content: req.body.content
            };
            topic.comments.unshift(newAnswer);
            topic.save()
                .then(topic => {
                    res.json(topic)
                })
                .catch(err => console.log("Error in saving response", err));
        })
        .catch(err => console.log("Problem in submitting answer", err));
  })


module.exports = router;