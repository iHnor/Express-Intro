const router = require('express').Router()
const controller = require('../controllers/taskController');

    
router.get('/', function (req, res) {
    console.log(req.query);
    let showRezult
    if (req.query.hasOwnProperty('listId') && req.query.hasOwnProperty('taskId'))
        showRezult = controller.findTask(req.query['listId'], req.query['taskId'])
    else {
        if (req.query.hasOwnProperty('listId')){
            showRezult = controller.findList(req.query['listId'])
        }
        else 
            showRezult = controller.findAll()
    }
     
    res.send(showRezult)
});    

module.exports = router;