const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/auth");
const http = require('http');
//load User model
const Person = require("../models/User");
//load Profile  model
const Profile = require("../models/profile");
//load Question model
const Article = require("../models/Article");

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })

router.post('/file', upload.single('UploadFiles'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })


//@type - POST
//@route -  /api/article
//@desc - route for submit article
//@access - PRIVATE
router.post(""/*, authorize*/, (req, res) => {
    const newArt = new Article({
        user: req.body.user,
        content: req.body.content,
        date: Date.now()
    });
  newArt.save()
        .then(article => {
            res.json(article)
        })
        .catch(err => console.log("Unable to save article to database", err));
})
//@type - DELETE
//@route -  /api/article/:ar_id
//@desc - route for deleting a specific article
//@access - PRIVATE
router.delete("/:ar_id"/*, authorize*/, (req, res) => {
    Article.find({ _id: req.params.ar_id })
        .then(art => {
            if (!art) {
                return res.json({ "NoArticle": "Article Not found" });
            }
            
                Article.findOneAndRemove({ _id: req.params.ar_id})
                .then(() => res.json({ Delete: "Deleted Successfully" }))
                .catch(err => console.log("Problem in removing Article", err));
            

            
        })
        .catch(err => console.log("Problem in Deleting a specific article", err));
});

//get  my articles
router.get("/my/:id", async (req, res) => {
 
 
// destructure page and limit and set default values
const { page = 1, limit = 3 } = req.query;
  
try { 
  // execute query with page and limit values
  const arts = await Article.find({ user: req.params.id })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort( {date: 'desc'})
    .exec();

  // get total documents in the Posts collection 
  const count = await Question.countDocuments({ user: req.params.id });

  // return response with posts, total pages, and current page
  res.json({
    arts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
  });
} catch (err) {
  console.error(err.message);
}
});

//get article by ID
router.get("/one/:id", (req, res) => {
 

    Article.find({ _id: req.params.id })
    .then(art => {
        if (!art) {
            return res.json({ "NoArticle": "Article Not found" });
        }
        
            res.send(art);
    })
  });
  
//@type - GET
//@route -  /api/article
//@desc - route for showing all articles
//@access - PUBLIC
router.get("/", async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 6 } = req.query;
  
    try {
      // execute query with page and limit values
      const arts = await Article.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort( {date: 'desc'})
        .exec();

      // get total documents in the Posts collection 
      const count = await Article.countDocuments();
  
      // return response with posts, total pages, and current page
      res.json({
        arts,
          totalPages: Math.ceil(count / limit),
          currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
  });
//@type - GET
//@route -  /api/article
//@desc - route for searching articles
//@access - PUBLIC
router.get("/all", async (req, res) => {
  // destructure page and limit and set default values
 

  try {
    // execute query with page and limit values
    const arts = await Article.find()
      .sort( {date: 'desc'})
      .exec();

  

    // return response with posts, total pages, and current page
    res.json({
      arts
     
    });
  } catch (err) {
    console.error(err.message);
  }
});
    
//@type - POST
//@route -  /api/article/answers/:id
//@desc - route for submit answers to articles
//@access - PRIVATE
router.post("/answers/:id",/* authorize,*/ (req, res) => {
  Article.findById(req.params.id)
      .then(article => {
          const newAnswer = {
              user: req.body.id,
              text: req.body.text,
              name: req.body.name,
          };
          article.comments.unshift(newAnswer);
          article.save()
              .then(article => {
                  res.json(article)
              })
              .catch(err => console.log("Error in saving response", err));
      })
      .catch(err => console.log("Problem in submitting answer", err));
})

module.exports = router;