var express = require('express');
var router = express.Router();
var kid=require('../models/kid.model');
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function(req, res, next) {
    res.render('kid');
  });

  
/* Ajouter kid. */
router.post('/', (req, res,next) =>{
    console.log(req.body);
new kid({ lastname: req.body.lastname,
    firstname:req.body.firstname,
    password:req.body.password, 
    matricule:req.body.matricule, 
    email:req.body.email, 
    createdAt:Date.now(),
    address:req.body.address, 
    score:req.body.score,
    birthday:req.body.birthday, 
    level:req.body.level
}).save(function(err, msg)
{   
    res.redirect('/kid/listK');
    console.log(msg);
})

});



//afficher liste des kids
router.get('/listk', function(req, res){
    kid.find(function(err,kids){   //tableau de parents
        if(err){
            console.error(err);
            return; 
        } res.render('listkids', {listKid:kids}) // objet tableau pour l utiliser dans la for twig  
    })
})



router.get('/deleteK/:id', (req, res) => {
    kid.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/kid/listK');
        }
        else { console.log('Error in kid delete :' + err); }
    });
});


module.exports = router;
