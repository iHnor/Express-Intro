const router = require('express').Router()
const controller = require('../controllers/taskController');

function read() {
    
    router.get('/', function (req, res) {
        controller.findAll()
        .then(data => {
            res.send(data);
        });
            
    });    

    
    router.get('/:listId/tasks', function (req, res) {
        controller.findList(req.params.listId)
        .then(data => {
            res.send(data)
        });
    });

    router.get('/:listId/tasks/:id', function (req, res) {
        controller.findTask(req.params.id, req.params.listId)
        .then(data => {
            res.send(data)
        });
    });
}

function write() {

    router.post('/:listId/tasks', function (req, res) {
        controller.addNewPost(req.params.listId,req.body)
        .then(data => {
            res.send(data)
        });
    });

    router.patch('/:listId/tasks/:id', function (req, res) {
        console.log(req.body);
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
    })

    router.delete('/:taskId', function (req, res) {
        controller.deleteTask(req.params.taskId)
        .then(data => {
            res.send(data)
        });
    });
}

function crud() {
    read();
    write();
}

crud();

module.exports = router;