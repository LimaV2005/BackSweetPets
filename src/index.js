const express = require('express')
const PORT = 3057
const routes = require('./routes')
const app = express()
const cors = require('cors')
require('./database/index')

app.use(express.json())
app.use(cors())
app.use(routes)
app.listen(PORT, ()=>{
    console.log('Server rodando, port 3057') 
    console.table(        {
        'API': 'CRUD USERS',      
        'port':PORT,
        'host':`http://localhost:${PORT}`})
})