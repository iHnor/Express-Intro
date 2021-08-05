const router = require('express').Router()
const controller = require('../controllers/taskController');

function read() {

    router.get('/', function (req, res) {
        // console.log(req.params.id);
        // console.log(req.params.listId);

        let showAll = controller.findAll()
        res.send(showAll)
    });

    router.get('/:id', function (req, res) {
        let showSingle = controller.findSingle(req.params.id)
        res.send(showSingle)
    });
}

function write() {

    router.post('/', function (req, res) {
        let newPost = controller.addNewPost(req.body)
        res.send(newPost)
    });

    router.patch('/:id', function (req, res) {
        let update = controller.updateTask(req.params.id, req.body)
        res.send(update)
    });

    router.put('/:id', function (req, res){
        let changeTask = controller.changeTask(req.params.id, req.body)
        res.send(changeTask)
    })

    router.delete('/:id', function (req, res) {
        let del = controller.deleteTask(req.params.id)
        res.send(del);
    });

}

function crud() {
    read();
    write();
}

crud();

module.exports = router;