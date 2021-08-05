
const inc = (index = 0) => () => ++index
// const genIdList = inc()
const genId = inc()

const toDoItem = [
    {idList: genIdList(), tasks: [{ id: genId(), name: 'Test task', done: false }]}
    // { id: genId(), name: 'We create new task', done: false },
    // { id: genId(), name: 'We create new task', done: false }
]


class ToDO {
    List;

    constructor(List){
        this.List = List;
    }

    allTasks() {
        return this.List
    }

    singleTask(taskId) {
        let taskIdInt = parseInt(taskId);
        let task = this.List.find(t => t.id === taskIdInt);
        return task
    }

    createTask(data) {
        let newitem = {
            id: genId(),
            name: data.name,
            done: false
        };
        this.List.push(newitem);
    }

    changeTask(taskId, newTask) {
        let taskIdInt = parseInt(taskId)
        let newList = Object.assign({id: taskIdInt}, newTask)
        this.List[taskId-1] = newList
    }

    update(taskId, NewUpdateTask) {

        let taskIdInt = parseInt(taskId);
        let updateItem = this.List.find(t => t.id === taskIdInt);
        Object.assign(updateItem, NewUpdateTask);
        return updateItem;
    }

    delete(taskId) {
        let taskIdInt = parseInt(taskId);
        this.List.splice(taskIdInt - 1, 1);
        console.log(this.List);
        return this.List
    }
}

let listOut = new ToDO(toDoItem)

module.exports = listOut