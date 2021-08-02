const express = require('express')
const router = express.Router();


const inc = (index = 0) => () => ++index
const genId = inc()
const todoitems = [
    { id: genId(), name: 'Test task', done: false },
    { id: genId(), name: 'We create new task', done: false }
]

const createTask = data => {
    return {
        id: genId(),
        name: data.name,
        done: false
    }
}

router.get('/todoitems', (req, res) => res.json(todoitems))

router.post('/todoitems', (req, res) => {
    const todoitem = createTask(req.body)
    todoitems.push(todoitem)
    res.json(todoitem)
})

router.patch('/todoitems/:id', (req, res) => {
    const todoitemId = parseInt(req.params.id)
    const todoitem = todoitems.find(t => t.id === todoitemId)
    if (todoitem) {
        Object.assign(todoitem, req.body)
        res.json(todoitem)
    }
    else {
        res.status(404).json({ error: 'Task not found' })
    }
})

module.exports = router