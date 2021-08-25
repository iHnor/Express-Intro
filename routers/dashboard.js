
const router = require('express').Router()
const controller = require('../controllers/taskController');


function read() {
    router.get('/today', function (req, res) {
        controller.todayTasks() // dashboard
            .then(data => {
                console.log(data);
                res.send(data);
            });
    });
}

read();

module.exports = router