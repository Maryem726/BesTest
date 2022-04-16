var express = require('express');
var router = express.Router();
var teacherR=require('../models/teacherRequest.model');
var teacher=require('../models/teacher.model');
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function(req, res, next) {
    res.render('teacher');
  });

 
/* Ajouter admin. */
router.post('/', (req, res,next) =>{
    //    ajout(req, res);
        console.log(req.body);
    new teacherR({ lastname: req.body.lastname,
        firstname:req.body.firstname,
        password:req.body.password, 
        matricule:req.body.matricule, 
        email:req.body.email, 
        createdAt:Date.now(),
        address:req.body.address, 
        speciality:req.body.speciality, 
        birthday:req.body.birthday, 
        rib:req.body.rib
    }).save(function(err, msg)
    {   
        res.redirect('/teacherR/listT');
        console.log(msg);
    })
  
});

//afficher liste des admins
router.get('/listT', function(req, res){
    teacherR.find(function(err,teachers){   //tableau de teachers
        if(err){
            console.error(err);
            return; 
        } res.render('listteacher', {listTeacher:teachers}) // objet tableau pour l utiliser dans la for twig  
    })
})
module.exports = router;

router.get('/:id', (req, res) => {
    teacherR.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("teacher", {
                teacherR: doc
            });
        }
    });
});


router.get('/update/:id', (req, res) => {
        admin.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => 
        {
        if (!err) { res.redirect('admin/listA'); }
        else {
            if (err.matricule == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("admin", {
                  //  viewTitle: 'Update Employee',
                    admin: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
        });
    });
