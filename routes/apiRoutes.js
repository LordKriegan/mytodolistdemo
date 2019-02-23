var router = require('express').Router();
var db = require('../models');


router
    .get("/task", (req, res) => {
        db.Task
            .findAll({})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => {
                res.status(500).json(
                        {
                        error: err.message,
                        message: "Something went wrong while trying to access the database!"
                        }
                    );
            });
    })
    .get("/task/:id", (req, res) => {
        db.Task
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                res.status(500).json(
                        {
                        error: err.message,
                        message: "Something went wrong while trying to access the database!"
                        }
                    );
            });
    })
    .post("/task", (req, res) => {
        const newTask = {
           name: req.body.name,
           description: req.body.description,
           completed: false
        }
        db.Task
            .create(newTask)
            .then((response) => {
                res.json(response)
            })
            .catch((err) => {
                res.status(500).json(
                    {
                    error: err.message,
                    message: "Something went wrong while trying to access the database!"
                    }
                );
            });
    })
    .put("/task", (req, res) => {
        const newTask = {
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
         }
         db.Task
            .update(newTask, {
                where: {
                    id: req.body.id
                }
            })
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                res.status(500).json(
                    {
                    error: err.message,
                    message: "Something went wrong while trying to access the database!"
                    }
                );
            });
    })
    .delete("/task/:id", (req, res) => {
        db.Task
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((response) => {
                res.json(response);
            })
            .catch((err) => {
                res.status(500).json(
                    {
                    error: err.message,
                    message: "Something went wrong while trying to access the database!"
                    }
                );
            });
    });

module.exports = router;