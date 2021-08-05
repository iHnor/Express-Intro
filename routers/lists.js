const router = require('express').Router()
const controller = require('../controllers/taskController');

function read() {
    
    router.get('/', function (req, res) {
        let showAll = controller.findAll()
        res.send(showAll)
    });    

    
    router.get('/:listId/tasks', function (req, res) {
        let showAll = controller.findList(req.params.listId)
       
        if (Number.isInteger(showAll))
            res.sendStatus(showAll)
        else    
            res.send(showAll)
    });

    router.get('/:listId/tasks/:id', function (req, res) {
        let showSingle = controller.findTask(req.params.id, req.params.listId)
        res.send(showSingle)
    });
}

function write() {

    router.post('/:listId/tasks', function (req, res) {
        let newPost = controller.addNewPost(req.params.listId,req.body)
        res.send(newPost)
    });

    router.patch('/:listId/tasks/:id', function (req, res) {
        let update = controller.updateTask(req.params.id, req.params.listId, req.body)
        res.send(update)
    });

    router.put('/:listId/tasks/:id', function (req, res){
        let changeTask = controller.changeTask(req.params.id, req.params.listId, req.body)
        res.send(changeTask)
    })

    router.delete('/:listId/tasks/:id', function (req, res) {
        let del = controller.deleteTask(req.params.id, req.params.listId)
        res.send(del);
    });

    router.delete('/:listId', function (req, res) {
        let del = controller.deleteList(req.params.listId)
        res.send(del);
    });
}

function crud() {
    read();
    write();
}

crud();

module.exports = router;