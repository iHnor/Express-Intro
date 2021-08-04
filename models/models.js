let index = 1
const todoitems = [
    { id: index++, name: 'Test task', done: false },
    { id: index++, name: 'We create new task', done: false }
]


class ToDO {
    allTasks() {
        return todoitems
    }

    singleTask(taskId) {
        let taskIdInt = parseInt(taskId);
        let task = todoitems.find(t => t.id === taskIdInt);
        return task
    }

    createTask(data) {
        let newitem = {
            id: index++,
            name: data.name,
            done: false
        };
        todoitems.push(newitem);
    }

    update(taskId, NewUpdateTask) {

        let taskIdInt = parseInt(taskId);
        let updateItem = todoitems.find(t => t.id === taskIdInt);
        Object.assign(updateItem, NewUpdateTask);
        return updateItem;
    }

    delete(taskId){
        let taskIdInt = parseInt(taskId);
        todoitems.splice(taskIdInt-1, 1);
        index--

        for(let i = taskIdInt-1; i < todoitems.length; i++){
            todoitems[i].id -= 1; 
        }
        return todoitems
    }
}

module.exports = new ToDO()