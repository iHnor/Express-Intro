const ToDO_ORM = require('../models/models_ORM');

class TaskController {

    findList(listId) {
        return ToDO_ORM.findList(listId);
    }

    findTask( listId) {

        return ToDO_ORM.findTask(listId);
    }

    addNewPost(listId, newTask) {
        return ToDO_ORM.createTask(listId, newTask);
    }

    updateTask(taskId, NewUpdateTask) {

        return ToDO_ORM.update(taskId, NewUpdateTask);
    }

    changeTask(taskId, newTask){

        return ToDO_ORM.changeTask(taskId, newTask)
    }

    deleteTask(taskId){
        return ToDO_ORM.deleteTask(taskId)
    }
}

module.exports = new TaskController()