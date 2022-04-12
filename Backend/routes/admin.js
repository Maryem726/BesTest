var express = require('express');
var router = express.Router();
var admin=require('../models/admin.model');
var teacherR=require('../models/teacherRequest.model');
var teacher=require('../models/teacher.model');
var parentR=require('../models/parentRequest.model');
var parent=require('../models/parent.model');
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function(req, res, next) {
    res.render('admin');
  });


  /* Ajouter admin. */
router.post('/', (req, res,next) =>{
    //    ajout(req, res);
        console.log(req.body);
    new admin({ matricule: req.body.matricule,
    password:req.body.password,
    email:req.body.email, 
    createdAt:Date.now()
    }).save(function(err, msg)
    {   
        res.redirect('/admin/listA');
        console.log(msg);
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


/*get admin by ID */
router.get('/:id', function(req, res) {
    admin.findOne({_id: req.params.id })
    .then(function(admin){
      res.json(admin);
    })
  .catch(function(err){
    res.json(err);
  });
  });

router.get('/delete/:id', (req, res) => {
    admin.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/admin/listA');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});



      /* liste requettes teachers. */

  router.get('/listrequestT', function(req, res, next) {
    teacherR.find(function(err,teachers){   //tableau de teachers
        if(err){
            console.error(err);
            return; 
        } res.render('listteacher', {listTeacher:teachers}) // objet tableau pour l utiliser dans la for twig  
    })  });
 

    
/* validate teacher. */
router.get('/validateT/:id', (req, res,next) =>{
    console.log(req.body);
    teacherR.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log(doc);
            new teacher ({ 
                lastname: doc.lastname,
                firstname:doc.firstname,
                password:doc.password, 
                matricule:doc.matricule, 
                email:doc.email, 
                createdAt:doc.createdAt,
                address:doc.address, 
                speciality:doc.speciality, 
                birthday:doc.birthday, 
                rib:doc.rib, 
            }).save(function(err, msg)
            {  
                res.redirect('/admin/listTV');
                console.log(msg);
                teacherR.findByIdAndRemove(req.params.id, (err, doc) => {
                    if (!err) {
                        console.log('success :' + err);

                    }
                    else { console.log('Error in teacher delete :' + err); }
                });
                
            })
        }
});

});


router.get('/listTV', async(request,res)=>{
  
      const myList = await teacher.find();  
    res.json(myList);
  })
// /*get teacher by ID */
// router.get('getT/:id', (req, res) => {
//     teacher.findById(req.params.id, (err, doc) => {
//         if (!err) {
//             res.render("listeacher", {
//                 admin: doc
//             });
//         }
//     });
// });
router.get('/getT/:id', function(req, res) {
    teacher.findOne({_id: req.params.id }).populate("Exercices","Lessons")
    .then(function(teacher){
      res.json(teacher);
    })
  .catch(function(err){
    res.json(err);
  });
  });



router.get('/deleteT/:id', (req, res) => {
    teacher.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/admin/listrequestT');
        }
        else { console.log('Error in teacher delete :' + err); }
    });
});


    /* liste requettes parents. */

    router.get('/listrequestP', function(req, res, next) {
        parentR.find(function(err,parents){   //tableau de teachers
            if(err){
                console.error(err);
                return; 
            } res.render('listparent', {listParent:parents}) // objet tableau pour l utiliser dans la for twig  
        })  });



/* validate parent. */
router.get('/validateP/:id', (req, res,next) =>{
    console.log(req.body);
    parentR.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log(doc);
            new parent ({ 
                lastname: doc.lastname,
                firstname:doc.firstname,
                password:doc.password, 
                matricule:doc.matricule, 
                email:doc.email, 
                createdAt:doc.createdAt,
                address:doc.address, 
                rib:doc.rib, 
            }).save(function(err, msg)
            {  
                res.redirect('/admin/listPV');
                console.log(msg);
                parentR.findByIdAndRemove(req.params.id, (err, doc) => {
                    if (!err) {
                        console.log('success :' + err);

                    }
                    else { console.log('Error in parent delete :' + err); }
                });
                
            })
        }
});

});


// //afficher liste des parents validés
// router.get('/listPV', function(req, res){
//     parent.find(function(err,parentsV){   //tableau de parents
//         if(err){
//             console.error(err);
//             return; 
//         } res.render('listparentV', {listParentV:parentsV}) // objet tableau pour l utiliser dans la for twig  
//     })
// })


router.get('/listPV', async(request,res)=>{

      const myList = await parent.find().populate("kids");  
    res.json(myList);
  })



module.exports = router;




router.get('/deleteP/:id', (req, res) => {
    parentR.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/admin/listrequestP');
        }
        else { console.log('Error in parent delete :' + err); }
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