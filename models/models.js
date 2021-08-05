
const incList = (indexL = 0) => () => ++indexL
const incId = (indexI = 0) => () => ++indexI
const genIdList = incList()
const genId = incId()

const toDoItem = [
    {
        idList: genIdList(), tasks: [
            { id: genId(), name: 'Test task first', done: false },
            { id: genId(), name: 'Test tasksecond', done: false }
        ]
    },
    {
        idList: genIdList(), tasks: [
            { id: genId(), name: 'Test text', done: false }
        ]
    }
]


class ToDO {
    List;

    constructor(List) {
        this.List = List;
    }

    findAll(){
        return toDoItem
    }

    findList(listId) {
        if (toDoItem.length < listId)
            return 404
        let allTasks = this.List[listId - 1]
        return allTasks.tasks
    }

    findTask(taskId, listId) {
        let getTask = this.List[+listId - 1].tasks
        return getTask[+taskId - 1]
    }

    createTask(listId, data) {

        if (toDoItem.length < listId) {
            let newList = {
                idList: genIdList(),
                tasks: {
                    id: genId(),
                    name: data.name,
                    done: false
                }
            };
            this.List.push(newList)
        }
        else { 
            let newList = {
                id: genId(),
                name: data.name,
                done: false   
            }
            this.List[listId-1].tasks.push(newList);    
        }
    }

    update(taskId, listId, NewUpdateTask) {
        let updateItem = this.List[+listId-1].tasks
        Object.assign(updateItem[+taskId], NewUpdateTask);
        return updateItem;
    }

    changeTask(taskId, listId, newTask) {
        let newList = Object.assign({ id: +listId }, newTask)
        this.List[listId - 1].tasks[+taskId] = newList
    }

    deleteTask(taskId, listId) {
        this.List[+listId-1].tasks.splice(+taskId - 1, 1);
    }

    deleteList(listId){
        this.List.splice(+listId - 1, 1)
    }
}

let listOut = new ToDO(toDoItem)

module.exports = listOut