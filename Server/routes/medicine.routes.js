    module.exports = app => {
    const medicine = require("../controllers/medicine.controller.js");
    
    const router = require("express").Router();
    
    router.post("/add", medicine.create);
  
    router.get("/", medicine.findAll);
  
    router.get("/:id", medicine.findOne);
    router.put("/:id", medicine.update);
    router.delete("/:id", medicine.delete);

    router.get("/:id/log", medicine.getTransactionLog)
    router.put("/:id/log", medicine.addTransactionLog)

    router.get("/:id/log", medicine.getMedicineStock)
  
    
    app.use('', router);
};