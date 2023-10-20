const express = require('express')	
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const db = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
})
db.connect((err)=>{
    if (err) throw err;
    else 
    console.log('Database Connected!')
})
