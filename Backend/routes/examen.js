var express = require('express');
var router = express.Router();
//var examen = require('../models/examen.model');
var bodyParser = require('body-parser');
const multer = require('multer')
const examModel = require('../models/examen.model');

//define storage for the images
const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, 'uploads/');
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


/* Ajouter examen.*/
router.post('/', upload.single('type'), async (request, response) => {
  console.log(request.file);

 const exam = new examModel({
    type: request.file.filename,
    subject: request.body.subject,
    level: request.body.level,
    title: request.body.title,
    price: request.body.price,
    createdAt:Date.now(),
  });

  try {
     await exam.save();

     response.json(exam);
  } 
  catch (error) {
    console.log(error);
  }
});

router.get('/read', async (request, res) => {
  examModel.find({}, (err,result) => {
    if (err) { 
      res.send(err);
    }
    res.send(result);
  })

 
});

//afficher par subject et level
router.get('/examsByLevelSubject', async (request, res) => {
  examModel.find({level:request.body.level,subject:request.body.subject}, (err,result) => {
    if (err) { 
      res.send(err);
    }
    res.send(result);
  })

 
});

//afficher par level
router.get('/examsByLevel', async (request, res) => {
  examModel.find({level:request.body.level}, (err,result) => {
    if (err) { 
      res.send(err);
    }
    res.send(result);
  })

 
});

//afficher par subject
router.get('/examsByarabic', async (request, res) => {
  examModel.find({subject:"arabic"}, (err,result) => {
    if (err) { 
      res.send(err);
    }
    res.send(result);
  })

 
});

router.get('/examsBymathematics', async (request, res) => {
  examModel.find({subject:"Mathematique"}, (err,result) => {
    if (err) { 
      res.send(err);
    }
    res.send(result);
  })

 
});

router.get('/examsByfrench', async (request, res) => {
  examModel.find({subject:"french"}, (err,result) => {
    if (err) { 
      res.send(err);
    }
    res.send(result);
  })

 
});

router.get('/examsByenglish', async (request, res) => {
  examModel.find({subject:"English"}, (err,result) => {
    if (err) { 
      res.send(err);
    }
    res.send(result);
  })

 
});

router.get('/examsBysciences', async (request, res) => {
  examModel.find({subject:"Sciences of life and earth"}, (err,result) => {
    if (err) { 
      res.send(err);
    }
    res.send(result);
  })

 
});

router.get('/examsBysocials', async (request, res) => {
  examModel.find({subject:"Social science"}, (err,result) => {
    if (err) { 
      res.send(err);
    }
    res.send(result);
  })

 
});



//afficher liste des examens
// router.get('/list', function (req, res) {
//   examen.find(function (err, examen) {   //tableau des examens
//     if (err) {
//       console.error(err);
//       return;
//     } else {
//       return res.status(200).json(examen)

//     }
//   })
// })

router.get('/:id', (req, res) => {
  examen.findById(req.params.id, (err, doc) => {
    if (!err) {
      return res.status(200).json(doc)
    }
    else {
      console.error(err);
      return

    }


  });
});

router.put(
  "/update/:id",
  async (req, res) => {
    try {

      const {
        type,
        subject,
        title,
        
      } = req.body;
      let examenFields = {};
      if (type) examenFields.type = type;
      if (subject) examenFields.subject = subject;
      if (title) examenFields.title = title;

      examen.findByIdAndUpdate(req.params.id, {
        $set: examenFields,
      })
        .then((result) => {
          res.status(200).json("updated successfully !");
        })
        .catch((error) => {
          return res.status(500).json(error.message);
        });
    }

    catch (error) {
      return res.status(500).json("error !");
    }
  }
);



   
router.get('/filterlevelsubject/arabic/3eme' , async(request,res)=>{
  const listsubject = await examModel.find({subject:"Arabic",level:"3 class"})  
  res.json(listsubject);
 });


module.exports = router;