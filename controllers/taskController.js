const ToDO = require('../models/models');

class TaskController {
    findAll() {
        return ToDO.allTasks();
    }

    findSingle(taskId) {
        return ToDO.singleTask(taskId);
    }

    addNewPost(newTask) {
        return ToDO.createTask(newTask);
    }

    updateTask(taskId, NewUpdateTask) {
        return ToDO.update(taskId, NewUpdateTask);
    }

    deleteTask(taskId) {
        return ToDO.delete(taskId)
    }
}

module.exports = new TaskController()