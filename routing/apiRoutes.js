const path = require("path");
const db = require("../models");

module.exports = function(app) {

    app.post("/api/temp", (req, res)=> {

        console.log(req.body.Temp)
        db.led.findOne({ where: 
            {
            id: 1
            }
          })
          .then(led => {
            led.update({
              temp: req.body.Temp
            });
          });
    })

    app.post("/api/door", (req, res)=> {
        console.log(req.body.doorStatus)
        db.led.findOne({ where: 
            {
            id: 1
            }
          })
          .then(led => {
            led.update({
              door: req.body.doorStatus
            });
        });
    })

    app.get("/api/led/", (req, res) => {
      
        db.led.findAll({})  
          .then((dbled) => {
            res.json(dbled);
          });
      });

    app.get("api/led/:id", (req, res) => {
    
      db.led.findOne({ where: 
        {
          id: req.params.id
        }
      })
      .then( (result) => {
      
        res.json(result)
      })
      
    })

    app.post("/api/led/:id", (req, res) => {

        let state;
        console.log(req.body);

        if(req.body.state === "On"){
            state = 0;
        }
        else{
            state = 1;
        }

        db.led.findOne({ where: 
            {
            id: req.params.id
            }
          })
          .then(led => {
            led.update({
              position: state
            });
          });
      });

};