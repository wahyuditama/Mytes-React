const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { json } = require('body-parser');
const mysql = require("mysql2");
const { error } = require('console');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testing"
});

db.connect((err)=> {
    if(err){
        console.error("Koneksi gagal");
    }else{
        console.log("data terhubung");
    }
});


app.get("/users", (req, res)=> {
    db.query("SELECT * FROM users", (err, result)=>{
        if(err) return res.status(500).json({error: err.message});
        res.json(result);
    });
});

app.post("/users", (req, res)=>{
    const {name, email, telepon} = req.body;
    db.query("INSERT INTO users (name, email, telepon) VALUES (?,?,?)", [name, email, telepon], (err, result)=>{
        if(err) return res.status(500).json({ error: err.message});
        res.json({id: result.insertId, name, email, telepon});
    });
})

app.put("/users/:id", (req, res)=>{
    const {id} = req.params;
    const {name, email, telepon} = req.body;
    db.query("UPDATE users SET name=? , email=?, telepon=? WHERE id=?", [name, email, telepon, id], (err)=> {
        if(err) return res.status(500).json({error : err.message});
        res.json({id, name, email, telepon});
    });
});

app.delete("/users/:id", (req, res)=>{
    const {id} = req.params;
    db.query("DELETE FROM users WHERE id=?", [id], (err)=>{
        if(err) return res.status(500).json({ error :err.message});
        res.json({ message: "User berhasil dihapus"});
    });
});

app.listen(5000, ()=> {
    console.log("Server berjalan di http://localhost:5000");
});