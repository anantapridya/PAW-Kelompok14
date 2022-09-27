module.exports = app => {
    const medicine = require("../controllers/medicine.controller.js");
    
    var router = require("express").Router();
    
    router.post("/add", medicine.create);
  
    router.get("/add", medicine.findAll);
  
    router.get("/medicines", medicine.findAllPublished);
  
    router.get("/:id", medicine.findOne);
  
    router.put("/:id", medicine.update);
  
    router.delete("/:id", medicine.delete);
  
    router.delete("/", medicine.deleteAll);
  
    app.use('', router);
};