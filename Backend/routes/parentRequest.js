var express = require('express');
var router = express.Router();
var parentR=require('../models/parentRequest.model');
var parent=require('../models/parent.model');
var kid=require('../models/kid.model');
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function(req, res, next) {
    res.render('parent');
  });

 
/* Ajouter teacher. */
router.post('/', (req, res,next) =>{
        console.log(req.body);
    new parentR({ lastname: req.body.lastname,
        firstname:req.body.firstname,
        password:req.body.password, 
        matricule:req.body.matricule, 
        email:req.body.email, 
        createdAt:Date.now(),
        address:req.body.address, 
        rib:req.body.rib
    }).save(function(err, msg)
    {   
        res.redirect('/parentR/listP');
        console.log(msg);
    })
  
});


 



//afficher liste des parents
router.get('/listPR', function(req, res){
    parentR.find(function(err,parents){   //tableau de parents
        if(err){
            console.error(err);
            return; 
        } res.render('listparent', {listParent:parents}) // objet tableau pour l utiliser dans la for twig  
    })
})

router.get('/:id', (req, res) => {
    parentR.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("parent", {
                parentR: doc
            });
        }
    });
});

router.get('/getkids/:id', (req, res) => {
    parent.findById({_id:req.params.id}, {kids: 1 },function(err,parent){   //tableau 
        if(err){
            console.error(err);
            return; 
        } res.json(parent) // objet tableau pour l utiliser dans la for twig  
    }).populate("kids");
    
      });
module.exports = router;
