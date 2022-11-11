const { authJwt } = require("../middleware");

module.exports = app => {
    const medicine = require("../controllers/medicine.controller.js");
    
    const router = require("express").Router();
    
    router.post("/add", /*[authJwt.verifyToken, authJwt.isAdmin],*/ medicine.create); 
  
    router.get("/", [authJwt.verifyToken], medicine.findAll);
  
    router.get("/:id", /*[authJwt.verifyToken],*/ medicine.findOne);

    router.put("/:id", /*[authJwt.verifyToken,  authJwt.isAdmin],*/ medicine.update);
    router.delete("/:id", /*[authJwt.verifyToken,  authJwt.isAdmin],*/ medicine.delete);
    router.delete("/", /*[authJwt.verifyToken,  authJwt.isAdmin],*/ medicine.deleteAll);

    router.get("/:id/log", /*[authJwt.verifyToken,  authJwt.isAdmin],*/ medicine.getTransactionLog)
    router.put("/:id/log", /*[authJwt.verifyToken,  authJwt.isAdmin],*/ medicine.addTransactionLog)

    router.get("/:id/stock", medicine.getMedicineStock)
  
    
    app.use('', router);
};
