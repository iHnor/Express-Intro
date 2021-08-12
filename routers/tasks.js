const router = require('express').Router()
const controller = require('../controllers/taskController');

    
router.get('/', function (req, res) {
    console.log(req.query);
    if (req.query.hasOwnProperty('listId') && req.query.hasOwnProperty('taskId'))
        controller.findTask(req.query['taskId'], req.query['listId'])
        .then(data => {
            res.send(data)
        });
    else {
        if (req.query.hasOwnProperty('listId')){
            controller.findList(req.query['listId'])
            .then(data => {
                res.send(data)
            });
        }
        else 
            controller.findAll()
            .then(data => {
                res.send(data)
            });
    }
});    

module.exports = router;