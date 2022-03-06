var express = require('express');
var router = express.Router();
var admin=require('../models/admin.model');
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  

router.get('/', function(req, res, next) {
    res.render('admin');
  });

 
/* Ajouter admin. */
router.post('/', (req, res,next) =>{

    new admin({ matricule: req.body.matricule }).save(function(err, msg)
    {   
        res.redirect('/admin/listA');
    })
    
});
 
//afficher liste des admins
router.get('/listA', function(req, res){
    admin.find(function(err,admins){   //tableau de admins
        if(err){
            console.error(err);
            return; 
        } res.render('index', {listAdmin:admins}) // objet tableau pour l utiliser dans la for twig  
    })
})
module.exports = router;
