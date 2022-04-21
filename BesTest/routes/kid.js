var express = require('express');
var router = express.Router();
const KidModel=require('../models/kid.model');
var bodyParser = require('body-parser');  
const ParentModel = require('../models/Parent.model');
const User = require("../models/User")
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

router.get('/', async(req, res, next) =>{
    res.render('kid');
  });

  
/* Ajouter kid. */
router.post("/:id", async(req, res) =>{
    try {
      const {id} = req.params
    console.log(req.body);
    const findparent = await User.findOne({_id:id});
    if(!findparent){
      return res.status(400).send({msg:"Cannot find parent"})
    }
    const kid = new User({ 
    lastname: req.body.lastname,
    firstname:req.body.firstname,
    password:req.body.password, 
    matricule:req.body.matricule, 
    email:req.body.email, 
    typeuser:"STUDENT",
    createdAt:Date.now(),
    address:req.body.address, 
    birthday:req.body.birthday, 
    level:req.body.level
});
console.log(req.body);
// exercice.lesson = lesson._id; <=== Assign user id from signed in publisher to publisher key
kid.parent = findparent._id;
// Hash password
const hashedpassword = bcrypt.hashSync(kid.password, salt);
kid.password = hashedpassword;
await kid.save();
const parent = await User.findOneAndUpdate({_id: kid.parent},{$push:{kid:kid}});  
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

//afficher liste des kids validé
router.get('/listKV', async(request,res)=>{
  const myList = await User.find({typeuser:"STUDENT"}).populate({path: 'parent'});  
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
