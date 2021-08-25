const router = require('express').Router()
const controller = require('../controllers/taskControllerORM');

function read() {
    router.get('/:listId/tasks/', function (req, res) {
        controller.findList(req.params.listId)
        .then(data => {
            res.send(data);
        });
    });

    router.get('/tasks/:id', function (req, res) {
        controller.findTask(req.params.id)
        .then(data => {
            res.send(data);
        });
    });
}

function write() {
    router.post('/:listId/tasks', function (req, res) {
        controller.addNewPost(req.params.listId,req.body)
        .then((data) => {
            res.send(data);
        });
    });
    router.patch('/:listId/tasks/:id', function (req, res) {
        controller.updateTask(req.params.id, req.body)
        .then(() => {
            controller.findTask(req.params.id, req.params.listId)
            .then(data => {
                res.send(data)
            })
        });
    });
    router.put('/:listId/tasks/:id', function (req, res){
        controller.changeTask(req.params.id, req.body)
        .then(() => {
            controller.findTask(req.params.id, req.params.listId)
            .then(data => {
                res.send(data)
            })
        });
    });
    router.delete('/:listId/task/:taskId', function (req, res) {
        controller.deleteTask(req.params.taskId)
        .then(() => {
            controller.findList(req.params.listId)
            .then(data => {
                res.send(data)
            })
        });
    });
}

read();
write();

module.exports = router