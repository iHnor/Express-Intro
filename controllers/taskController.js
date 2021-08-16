const ToDO = require('../models/models');

class TaskController {

    findAll() {
        return ToDO.findAll();
    }

    findList(listId) {
        return ToDO.findList(listId);
    }

    findTask(taskId, listId) {

        return ToDO.findTask(taskId, listId);
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

    todayTasks(){ 
        return ToDO.todayTasks()
    }
    unDone(){
        return ToDO.unDone()
    }
    collectTodey(){
        return ToDO.collectTodey()
    }
}

module.exports = new TaskController()