const express = require('express');
var router = express.Router();
const lessonModel=require('../models/lesson.model');
const exerciceModel=require('../models/exercice.model');

var bodyParser = require('body-parser'); 
const multer = require('multer');
var mongoose = require('mongoose')



var urlencodedParser = bodyParser.urlencoded({ extended: false });
//const upload = require('../middleware/upload')
 
const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, 'uploads/lessons/');
    },
  
    //add back the extension
    filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });
  
  //upload parameters for multer
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  });



router.get('/', function(req, res, next) {
   res.render('lesson', { title: 'Express' });
  });

/* Ajouter lesson. */
router.post('/',upload.single('type'),async(req, res,next) =>{
    //    ajout(req, res);
        console.log(req.file);
   const lesson = new lessonModel({ 
    title: req.body.title,
        subject:req.body.subject,
        level:req.body.level, 
        price:req.body.price , 
        description:req.body.description,
        type:req.file.filename,
        createdAt:Date.now(), 
     });
    try {
 await lesson.save();
    res.json(lesson)
        // response.redirect('/');
      } catch (error) {
        console.log(error);
      }

     
});

router.post("/lesson/:id", function(req, res){
  exerciceModel.create(req.body).then(function(dbExercices){
return lessonModel.findByIdAndUpdate({_id:req.params.id}, 
  {$push: 
  {exercices:dbExercices._id}}, {new:true});
  })
  .then(function(dbLessons){
    res.json(dbLessons);
  })
  .catch(function(err){
  res.json(err);
  });
});


//get list exercices
router.get('/listE' , async(request,res)=>{
  const myList = await exerciceModel.find()
  res.json(myList);
 });

router.get('/deleteL/:id', (req, res) => {
    lesson.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/lesson/listL');
        }
        else { console.log('Error in lesson delete :' + err); }
    });
});


//afficher liste des lessons
var config = {
  headers: {'Access-Control-Allow-Origin': '*'}
};
router.get('/listL/:level', async(request,res,config )=>{
    const {level} = request.params;
    const myList = await lessonModel.find({level}).populate("Exercices");
  res.json(myList);
})

router.get('/:id', function(req, res) {
  lessonModel.findOne({_id: req.params.id }).populate("Exercices")
  .then(function(Lesson){
    res.json(Lesson);
  })
.catch(function(err){
  res.json(err);
});
});

//get lesson by subject
router.get('/subject/:subject', async(req, res) => {
  
  lessonModel.find({subject: req.params.subject}, function(err,lessons){   //tableau 
    if(err){
        console.error(err);
        return; 
    } res.json(lessons) // objet tableau pour l utiliser dans la for twig  
}).populate("Exercices");

  });

  //get lesson by subject return title
router.get('/findlessonName', async(req, res) => {
  
  lessonModel.find({subject: "Arabic"}, {title: 1 },function(err,lessons){   //tableau 
    if(err){
        console.error(err);
        return; 
    } res.json(lessons) // objet tableau pour l utiliser dans la for twig  
})

  });


  router.get('/findlevel/:level', async(req, res) => {
  
    lessonModel.find({level: req.params.level}, function(err,lessons){   //tableau 
      if(err){
          console.error(err);
          return; 
      } res.json(lessons) // objet tableau pour l utiliser dans la for twig  
  }).populate("Exercices");
  
    });


  
    router.get('/findlevelandsubject/:level/:subject', async(req, res) => {
  
      lessonModel.find({level: req.params.level, subject: req.params.subject}, function(err,lessons){   //tableau 
        if(err){
            console.error(err);
            return; 
        } res.json(lessons) // objet tableau pour l utiliser dans la for twig  
    }).populate("Exercices");
    
      });    
//get exercices by lesson
router.get('/exbylesson/:id', async(req,res) =>{
  lessonModel.find({_id:req.params.id}, {Exercices: 1 },function(err,lessons){   //tableau 
    if(err){
        console.error(err);
        return; 
    } res.json(lessons) // objet tableau pour l utiliser dans la for twig  
}).populate("Exercices");

  });

  router.get('/filtrbyname/bysubject' , async(request,res)=>{
    const listsubject = await lessonModel.find({subject:"Arabic"})  
    res.json(listsubject);
   });

   
   router.get('/filtrbyname/english' , async(request,res)=>{
    const listsubject = await lessonModel.find({subject:"English"})  
    res.json(listsubject);
   });

     
   router.get('/filtrbyname/math' , async(request,res)=>{
    const listsubject = await lessonModel.find({subject:"Mathematique"})  
    res.json(listsubject);
   });

   router.get('/filtrbyname/french' , async(request,res)=>{
    const listsubject = await lessonModel.find({subject:"French"})  
    res.json(listsubject);
   });

   router.get('/filtrbyname/sciences' , async(request,res)=>{
    const listsubject = await lessonModel.find({subject:"Sciences of life and earth"})  
    res.json(listsubject);
   });

   router.get('/filtrbyname/social' , async(request,res)=>{
    const listsubject = await lessonModel.find({subject:"Social Science"})  
    res.json(listsubject);
   });

   
   router.get('/filterlevelsubject/arabic/3eme' , async(request,res)=>{
    const listsubject = await lessonModel.find({subject:"Arabic",level:"3 class"})  
    res.json(listsubject);
   });


module.exports = router;