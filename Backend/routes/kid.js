var express = require('express');
var router = express.Router();
const KidModel=require('../models/kid.model');
var bodyParser = require('body-parser');  
const ParentModel = require('../models/Parent.model');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');

router.get('/', async(req, res, next) =>{
    res.render('kid');
  });

  
/* Ajouter kid. */
router.post("/:id", async(req, res) =>{
    try {
    console.log(req.body);
    const kid = new KidModel({ 
    lastname: req.body.lastname,
    firstname:req.body.firstname,
    password:req.body.password, 
    matricule:req.body.matricule, 
    email:req.body.email, 
    createdAt:Date.now(),
    address:req.body.address, 
    birthday:req.body.birthday, 
    level:req.body.level
});
console.log(req.body);
// exercice.lesson = lesson._id; <=== Assign user id from signed in publisher to publisher key
kid.parent = parent._id;
await kid.save();
const parent = await ParentModel.findOneAndUpdate({_id: kid.parent},{$push:{kids:kid}});  
console.log(parent);
res.status(200).json({success:true, data: parent })


} catch (err) {
res.status(400).json({success: false, message:err.message})
console.log(err)
}
});




//afficher liste des kids
router.get('/listk', async(request,res)=>{
    const myList = await KidModel.find().populate({path: 'parent'});  
 res.json(myList);
});


router.get('/:id', (req, res) => {
    KidModel.findOne({_id:req.params.id}).populate("parent")
    .then(function(kid){
      res.json(kid);
    })
  .catch(function(err){
    res.json(err);
  });
  });

  router.delete('/delete/:id/:idP', async(req, res) => {
    try{
   await KidModel.findByIdAndRemove(req.params.id);
    const parent = await ParentModel.findOneAndUpdate(req.params.idP, {$pull :{kids: {
      _id:req.params.id
    }} })
    res.send(parent)
    }
    catch(error){
      console.log(error)
      res.send(error)
      
    }
  });

module.exports = router;
