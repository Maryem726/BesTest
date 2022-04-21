var express = require("express");
var router = express.Router();
var admin = require("../models/admin.model");
var teacherR = require("../models/teacherRequest.model");
var teacher = require("../models/teacher.model");
var parentR = require("../models/parentRequest.model");
var parent = require("../models/parent.model");
const User = require("../models/User");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const nodemailer = require("nodemailer");
// const nodemailer = require('../lib/nodemailer');

async function main(mail,msg) {
    // Generate SMTP service account from ethereal.email
    let account = await nodemailer.createTestAccount();

    console.log('Credentials obtained, sending message...');

    // NB! Store the account object values somewhere if you want
    // to re-use the same account for future mail deliveries

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport(
        {
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            },
            logger: false,
            debug: false // include SMTP traffic in the logs
        },
        {
            // default message fields

            // sender info
            from: 'Pangalink <no-reply@pangalink.net>',
            headers: {
                'X-Laziness-level': 1000 // just an example header, no need to use this
            }
        }
    );

    // Message object
    let message = {
        // Comma separated list of recipients
        to: mail,

        // Subject of the message
        subject: 'Nodemailer is unicode friendly ✔',

        // plaintext body
        text: 'BestTest Validation',

        // HTML body
        html:
            '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
            '<p>'+msg+'</p>',
        // An array of attachments
        attachments: [
            // String attachment
            {
                filename: 'notes.txt',
                content: 'Some notes about this e-mail',
                contentType: 'text/plain' // optional, would be detected from the filename
            },

            // Binary Buffer attachment
            {
                filename: 'image.png',
                content: Buffer.from(
                    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                        '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                        'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                    'base64'
                ),

                cid: 'note@example.com' // should be as unique as possible
            },

            // // File Stream attachment
            // {
            //     filename: 'nyan cat ✔.gif',
            //     path: __dirname + '/assets/nyan.gif',
            //     cid: 'nyan@example.com' // should be as unique as possible
            // }
        ]
    };

    let info = await transporter.sendMail(message);

    console.log('Message sent successfully!');
    console.log(nodemailer.getTestMessageUrl(info));

    // only needed when using pooled connections
    transporter.close();
}


router.get("/", function (req, res, next) {
  res.render("admin");
});

/* liste requettes teachers. */

router.get("/listrequestTeachers", async (req, res) => {
  try {
    const findteachers = await teacherR.find();
    res.status(200).send({ teachers: findteachers });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "cannaot get teachers" }] });
  }
});

/* liste requettes parents. */

router.get("/listrequestP", async (req, res) => {
  try {
    const findparents = await parentR.find();
    res.status(200).send({ parents: findparents });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "Cannot get parents" }] });
  }
});

router.get("/listTV", async (request, res) => {
  const myList = await User.find({ typeuser: "TEACHER" });
  res.send(myList);
});

/* Ajouter admin. */
router.post("/", (req, res, next) => {
  //    ajout(req, res);
  console.log(req.body);
  new admin({
    matricule: req.body.matricule,
    password: req.body.password,
    email: req.body.email,
    createdAt: Date.now(),
  }).save(function (err, msg) {
    res.redirect("/admin/listA");
    console.log(msg);
  });
});

//afficher liste des admins
router.get("/listA", function (req, res) {
  admin.find(function (err, admins) {
    //tableau de admins
    if (err) {
      console.error(err);
      return;
    }
    res.render("index", { listAdmin: admins }); // objet tableau pour l utiliser dans la for twig
  });
});

/*get admin by ID */
router.get("/:id", function (req, res) {
  admin
    .findOne({ _id: req.params.id })
    .then(function (admin) {
      res.json(admin);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/delete/:id", (req, res) => {
  admin.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/admin/listA");
    } else {
      console.log("Error in employee delete :" + err);
    }
  });
});

/* validate teacher. */
router.get("/validateT/:id", async (req, res, next) => {
  teacherR.findById(req.params.id, (err, doc) => {
    if (!err) {
      console.log(doc);
      new User({
        lastname: doc.lastname,
        firstname: doc.firstname,
        password: doc.password,
        matricule: doc.matricule,
        email: doc.email,
        createdAt: doc.createdAt,
        address: doc.address,
        typeuser: "TEACHER",
        rib: doc.rib,
      }).save(function (err, msg) {
        teacherR.findByIdAndRemove(req.params.id, (err, doc) => {
          if (!err) {
            console.log("success :" + err);
          } else {
            console.log("Error in teacher delete :" + err);
          }
        });
      });
      console.log(doc.email)
      main(doc.email,"Your request has been aproved, you have access to BesTest").catch(err => {
        console.error(err.message);
        process.exit(1);
    });
      
    }
  });
});



router.get("/getT/:id", function (req, res) {
  teacher
    .findOne({ _id: req.params.id })
    .populate("Exercices", "Lessons")
    .then(function (teacher) {
      res.json(teacher);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.delete("/deleteT/:id", (req, res) => {
  teacherR.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      // res.redirect("/admin/listrequestT");
      main(doc.email,"Your request has been denied").catch(err => {
        console.error(err.message);
        process.exit(1);
    });
    } else {
      console.log("Error in teacher delete :" + err);
    }
  });
});

/* validate parent. */
router.get("/validateP/:id", (req, res, next) => {
  console.log(req.body);
  parentR.findById(req.params.id, (err, doc) => {
    if (!err) {
      new User({
        lastname: doc.lastname,
        firstname: doc.firstname,
        password: doc.password,
        email: doc.email,
        createdAt: doc.createdAt,
        typeuser: "PARENT",
        address: doc.address,
        rib: doc.rib,
      }).save(function (err, msg) {
        console.log(err)
        parentR.findByIdAndRemove(req.params.id, (err, doc) => {
          if (!err) {
            console.log("success :" + err);
          } else {
            console.log("Error in parent delete :" + err);
          }
        });
      });
      main(doc.email,"Your request has been aproved, you have access to BesTest").catch(err => {
        console.error(err.message);
        process.exit(1);
    });
    }
  });
});

router.get("/listPV/valider", async (request, res) => {
  const myList = await User.find({ typeuser: "PARENT" }).populate("kid");
  res.send(myList);
});

router.delete("/deleteP/:id", (req, res) => {
  parentR.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      main(doc.email,"Your request has been denied").catch(err => {
        console.error(err.message);
        process.exit(1);
    });
    } else {
      console.log("Error in parent delete :" + err);
    }
  });
});

router.get("/update/:id", (req, res) => {
  admin.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("admin/listA");
      } else {
        if (err.matricule == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("admin", {
            //  viewTitle: 'Update Employee',
            admin: req.body,
          });
        } else console.log("Error during record update : " + err);
      }
    }
  );
});

module.exports = router;
