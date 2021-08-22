const ToDO = require('../models/models_ORM');

class TaskController {

    findList(listId) {
        return ToDO.findList(listId);
    }

    findTask( listId) {

        return ToDO.findTask(listId);
    }

    addNewPost(listId, newTask) {
        return ToDO.createTask(listId, newTask);
    }

    updateTask(taskId, NewUpdateTask) {

        return ToDO.update(taskId, NewUpdateTask);
    }

    changeTask(taskId, newTask){

        return ToDO.changeTask(taskId, newTask)
    }

    deleteTask(taskId){
        return ToDO.deleteTask(taskId)
    }
}

module.exports = new TaskController()