const db = require('../models')
const Medicine = db.medicines.Medicine
const medicineLog = db.medicines.medicineLog

module.exports = {

    /* .post /add, JSON { name, manufacturer, description, stock } */
    create(req, res) {
        if (!(req.body.name 
            && req.body.manufacturer
            && req.body.description
            && req.body.stock)) {
            res.status(400).send({
                message: "request's body must contain 'name', 'manufacturer', 'description', and 'stock' field"
            })
        } else {
        const medicine = new Medicine({
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            stock: req.body.stock,
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
        // res.send(req.body)
        const id = req.params.id

        Medicine.findByIdAndUpdate(id, { $set: req.body }, { useFindAndModify: false })
            .then(data => {
                if (!data)
                    res.status(404).send({
                        message: `Medicine with id ${id} not found`
                    })
                else res.send({ message: "medicine was updated successfully" })
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || `Error updating medicine with id ${id}`
                })
            })
    },

    /* .put /:id/log JSON { stock, description } */
    addTransactionLog(req, res) {
        const id = req.params.id
        let log, newLog

        if ('stock' in req.body) {

            newLog = [
                req.body.stock,
                req.body.description
                    ? req.body.description
                    : '',
                new Date().toLocaleString()
            ]

            Medicine.findById(id).then(data => {
                log = data.log
                log.push(newLog)

                Medicine.findByIdAndUpdate(id, { $set: { log }})
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

        // log.push(newLog)
        // res.send({log, newLog})

        // Medicine.findByIdAndUpdate(id, { $set: { log }})
        //     .then(data => {
        //         if (!data)
        //             res.status(404).send({
        //                 message: `Medicine with id ${id} not found`
        //             })
        //         else res.send({ message: `Transaction log added for medicine with id ${id}` })
        //     })

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
                    message: `Could not delete medicine with id ${id}`
                })
            })
    }
    

}