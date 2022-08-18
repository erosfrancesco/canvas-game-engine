const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 8080
const app = express()
app.use(cors())
app.use('/src', express.static('src'))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(port, err => console[err ? 'error' : 'log'](err || 'Started at port ' + port))