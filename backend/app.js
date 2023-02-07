const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('./models/users');
const path = require('path');

const app = new express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://Stebin:Stebin00@cluster0.ub6rc3f.mongodb.net/Employee?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, '/build')));

// GET all data
app.get('/api/users', (req, res) => {
    userModel.find((err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
})

// GET single data
app.get('/api/users/:id', (req, res) => {
    let id = req.params.id;
    userModel.findById({ "_id": id }, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
})

// POST data
app.post('/api/user', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 10);
    let role = req.body.role;
    let users = userModel({ name, email, password, role });
    users.save((err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
})


// PUT data
app.put('/api/users', (req, res) => {
    let id = req.body._id;
    let data = req.body;
    userModel.findByIdAndUpdate({ "_id": id }, data, (err, data) => {
        if (err) {
            res.send(err);;
        }
        else {
            res.send(data);
        }
    })
})

// DELETE data
app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    userModel.findByIdAndDelete({ "_id": id }, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
});

app.post('/api/users', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    userModel.find({ "email": email }, (err, data) => {
        if (data.length > 0) {
            const passwordValidator = bcrypt.compareSync(password, data[0].password);
            if (passwordValidator) {
                jwt.sign({ "email": email, id: data[0]._id }, "token", { expiresIn: "1d" }, (err, token) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send({ token, data });
                    }
                })
            }
            else {
                res.send("Invalid Passsword");
            }
        }
        else {
            res.send("Invalid Email Id");
        }
    })
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html')); 
});

app.listen(5000, () => {
    console.log("Server is running on the port 5000");
})