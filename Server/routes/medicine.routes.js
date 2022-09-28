module.exports = app => {
    const medicine = require("../controllers/medicine.controller.js");
    
    const router = require("express").Router();
    
    router.post("/add", medicine.create);
  
    router.get("/", medicine.findAll);
  
    router.get("/:id", medicine.findOne);

    router.put("/:id/log", medicine.addTransactionLog)
  
    router.put("/:id", medicine.update);
  
    router.delete("/:id", medicine.delete);
    
    app.use('', router);
};