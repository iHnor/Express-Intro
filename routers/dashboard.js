
const router = require('express').Router()
const controller = require('../controllers/taskController');


function read() {
    router.get('/today', function (req, res) {
        controller.todayTasks()
            .then(data => {
                res.send(data[0].count + ' tasks for today');
            });
    });

    router.get('/status', function (req, res) {
        controller.unDone()
            .then(data => {
                res.send(data);
            });
    });
}

read();

module.exports = router