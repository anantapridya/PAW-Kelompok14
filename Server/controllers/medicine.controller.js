const db = require('../models')
const Medicine = db.medicines.Medicine
const medicineLog = db.medicines.medicineLog

module.exports = {

    /* .post /add, JSON { name, manufacturer, description, stock } */
    // stock & price harus sudah berupa int
    create(req, res) {
        if (!(req.body.name 
            && req.body.manufacturer
            && req.body.description
            && req.body.stock
            && req.body.price)) {
            res.status(400).send({
                message: "request's body must contain 'name', 'manufacturer', 'description', and 'stock' field"
            })
        } else {
        const medicine = new Medicine({
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price,
            log: [medicineLog(
                req.body.stock,
                'data obat ditambahkan'
            )]
        })
        medicine.save()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || 'Error creating medicine.'
                })
            })
        }
    },

    /* .get /, /?id=<id>&name=<name>&manufacturer=<manufacturer>
    optional, jika req.query kosong, send semua isi database */
    findAll(req, res) {
        const query = {}

        if (req.query.name)
            query.name = {
                $regex: new RegExp(req.query.name),
                $options: "i"
            }
        if (req.query.manufacturer)
            query.manufacturer =  {
                $regex: new RegExp(req.query.manufacturer),
                $options: "i"
            }

        Medicine.find(query)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occured while retreiving medicines"
                })
            })

    },

    /* .get /:id */
    findOne(req, res) {
        const id = req.params.id

        Medicine.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Medicine with id ${id} not found`
                    })
                } else res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retreiving medicine with id ${id}`
                })
            })
    },

    /* .put /:id JSON { ... }  */
    update(req, res) {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            })
        }
        const id = req.params.id

        // note: kode inefisien, refactor soon
        // mengupdate "log" secara otomatis jika "stock" diupdate
        if (req.body.stock) {
            Medicine.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Medicine with id ${id} not found`
                    })
                } else {
                    const stockIncrement = req.body.stock - parseInt(data.stock)
                    if (stockIncrement != 0) {
                        const newLog = [
                            stockIncrement,
                            "Stok telah di ubah secara manual",
                            new Date().toLocaleString()
                        ]
                        const newTransLog = data.log
                        newTransLog.push(newLog)
                        req.body.log = newTransLog
    
    
                        Medicine.findByIdAndUpdate(id, { $set: req.body }, { useFindAndModify: false })
                        .then(data => {
                            if (!data)
                                res.status(404).send({
                                    message: `Medicine with id ${id} not found`
                                })
                            else {
                                // updating transaction log if "stock" was also updated
                                res.send({ message: "medicine was updated successfully" })
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || `Error updating medicine with id ${id}`
                            })
                        })
                    } else updateMedicine()
                    
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || `Error updating medicine with id ${id}`
                })
            })
        } else updateMedicine()
        
        function updateMedicine() {
            Medicine.findByIdAndUpdate(id, { $set: req.body }, { useFindAndModify: false })
                .then(data => {
                    if (!data)
                        res.status(404).send({
                            message: `Medicine with id ${id} not found`
                        })
                    else {
                        // updating transaction log if "stock" was also updated
                        res.send({ message: "medicine was updated successfully" })
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || `Error updating medicine with id ${id}`
                    })
                })
        }
    },

    /* .put /:id/log JSON { stock, description } */
    addTransactionLog(req, res) {
        const id = req.params.id
        let log, newLog

        if ('stock' in req.body
            && typeof req.body.stock === 'number'
            && isFinite(req.body.stock)
            && req.body.stock != 0 ) {

            newLog = [
                req.body.stock,
                req.body.description
                    ? req.body.description
                    : '',
                req.body.date
                    ? req.body.date // format HARUS "MM/DD/YYYY, hh:mm:ss"
                    : new Date().toLocaleString()
            ]

            Medicine.findById(id).then(data => {
                log = data.log
                const updatedStock = data.stock + req.body.stock
                if (updatedStock < 0) 
                    return res.status(400).send({
                        message: 'medicine stock cannot be less than zero.'
                    })
                log.push(newLog)

                Medicine.findByIdAndUpdate(id, { $set: { log, stock: updatedStock }})
                .then(data => {
                    if (!data)
                        res.status(404).send({
                            message: `Medicine with id ${id} not found`
                        })
                    else res.send({ message: `Transaction log added for medicine with id ${id}` })
                })

            }).catch(() => {
                res.status(404).send({
                    message: `Medicine with id ${id} not found`
                })
            })

        } else return res.status(400).send({
            message: "cannot add empty transaction log"
        })

    },

    /* .get /:id/log */
    getTransactionLog(req, res) {
        const id = req.params.id

        Medicine.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Medicine with id ${id} not found`
                    })
                } else res.send(data.log)
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retreiving medicine log with id ${id}`
                })
            })
    },

    /* .get /:id/stock  */
    getMedicineStock(req, res) {
        const id = req.params.id

        Medicine.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Medicine with id ${id} not found`
                    })
                } else res.send(data.stock)
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retreiving medicine stock with id ${id}`
                })
            })
    },

    deleteAll(req,res){
        Medicine.deleteMany({}).then(data =>{
            res.send({message: "All Medicine Data has been Successfully Delete"})
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Delete Failed"
            })
        })
    },

    /* .delete /:id  */
    delete(req, res) {
        const id = req.params.id

        Medicine.findByIdAndDelete(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                    message: `Cannot delete medicine with id=${id}`
                    })
                } else {
                    res.send({
                    message: `Medicine with id ${id} was deleted successfully!`
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Cannot delete medicine with id ${id}`
                })
            })
    }
}