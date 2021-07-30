import express from 'express'
const app = express()

function logRequest({ method, url }, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next()
}

app.use(express.json())
app.use(logRequest)


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

app.get('/todoitems', (req, res) => res.json(todoitems))

app.post('/todoitems', (req, res) => {
    const todoitem = createTask(req.body)
    todoitems.push(todoitem)
    res.json(todoitem)
})

app.patch('/todoitems/:id', (req, res) => {
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

const port = 2000;
app.listen(port, () => {
    console.log(`Server started at localhost: ${port}`);
})