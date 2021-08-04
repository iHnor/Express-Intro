
const inc = (index = 0) => () => ++index
const genId = inc()

const todoitems = [
    { id: genId(), name: 'Test task', done: false },
    { id: genId(), name: 'We create new task', done: false }
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
            id: genId(),
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
        todoitems.splice(taskIdInt-1,1);
        console.log(todoitems);
        return todoitems
    }
}

module.exports = new ToDO()