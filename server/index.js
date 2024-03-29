const express = require('express')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())

const {
    getSpices,
    addSpices,
    deleteSpices,
    updateSpices
} = require("./controller")

app.get('/api/spices', getSpices)
app.post('/api/spices', addSpices)
app.delete('/api/spices/:id', deleteSpices)
app.put('/api/spices/:id', updateSpices)
app.listen(4000, () => console.log("Server running on 4000"));
