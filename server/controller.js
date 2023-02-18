let spiceData = require('./db.json')
let spiceId = 4

module.exports = {
    getSpices: (req,res) =>{
        res.status(200).send(spiceData)
    },
    addSpices: (req,res) =>{
        console.log(req.body)
        let newSpice = {...req.body, id:spiceId}
        console.log(newSpice)
        spiceData.push(newSpice)
        res.status(200).send(spiceData)
        spiceId++
    },
    deleteSpices: (req,res) =>{
        let { id } = req.params
        console.log(id)
        let index = spiceData.findIndex(spices => spices.id === +id)
        spiceData.splice(index, 1)
        res.status(200).send(spiceData)
    },

    updateSpices: (req, res) => {
        console.log(req.body)
        console.log(req.params)
        let { type } = req.body
        let { id } = req.params
        let index = spiceData.findIndex(spices => spices.id === +id)
        if (type === "minus" && spiceData[index].stock > 0){
            spiceData[index].stock -= 1

        } else if (type === "plus" && spiceData[index].stock < 50){
            spiceData[index].stock += 1
        }
        res.status(200).send(spiceData)
    }

}