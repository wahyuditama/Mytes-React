const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = "users.json";

const loadUsers = ()=> {
    if(fs.existsSync(FILE_PATH)){
        const data = fs.readFileSync(FILE_PATH);
        return JSON.parse(data);
    }
    return[];
};


const saveUsers = (users)=> {
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
};


let users = loadUsers(); 

app.get("/users", (req, res)=>{
    res.json(users);
});

app.post("/users", (req, res)=> {
    const {name, email} = req.body;
    if(!name || !email){
        return res.status(400).json({Message: "Nama dan email harus diisi"});
    }
    const newUsers = {id: users.length + 1, name, email};
    users.push(newUsers);
    saveUsers(users)
    return res.status(201).json(newUsers);
});

app.put("/users/:id", (req, res)=>{
    const {id} = req.params;
    const {name, email} = req.body;

    const userIndex = users.findIndex(user=> user.id == id);
    if(userIndex.id === -1){
        return res.status(404).json({message: "User tidak ditemukan"});
    }

    users[userIndex] = {
        id: users[userIndex].id,
        name : name || users[userIndex].name,
        email: email || users[userIndex].email
    };

    saveUsers(users);
    res.json(users[userIndex]);
});

app.delete("/users/:id", (req, res)=> {
    const {id} = req.params;
    users = users.filter(user=> user.id !== id);
    saveUsers(users);
    res.json({message: "User berhasil dihapus"})
});

app.listen(5000, ()=> {
    console.log("Server berjalan di http://localhost:5000")
});