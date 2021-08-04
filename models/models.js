
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
        // console.log(taskIdInt);
        let updateItem = todoitems.find(t => t.id === taskIdInt);
        Object.assign(updateItem, NewUpdateTask);
        return updateItem;
    }
}

module.exports = new ToDO()



// router.get('/todoitems', (req, res) => res.json(todoitems))

// router.post('/todoitems', (req, res) => {
//     const todoitem = createTask(req.body)
//     todoitems.push(todoitem)
//     res.json(todoitem)
// })

// router.patch('/todoitems/:id', (req, res) => {
//     const todoitemId = parseInt(req.params.id)
//     const todoitem = todoitems.find(t => t.id === todoitemId)
//     if (todoitem) {
//         Object.assign(todoitem, req.body)
//         res.json(todoitem)
//     }
//     else {
//         res.status(404).json({ error: 'Task not found' })
//     }
// })

// module.exports = router