import http from 'http'

function logRequest({ method, url }) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
}

const tasks = [{ name: 'Get tasks' }, { name: 'Clear task' }]
const server = http.createServer((req, res) => {
    logRequest(req)
    if (req.url === '/tasks') {
        if (req.method === 'GET') {
            res.writeHead(200, { 'Count-Type': 'application/json' })
            res.end(JSON.stringify(tasks))
        }
        else if (req.method === 'POST') {
            const date = []
            req.on('data', message => date.push(message))
            req.on('end', () => {
                const task = JSON.parse(date.push(chunk))
                task.push(task)
                req.writeHead(201, { 'Content-Type': 'application/json' })
                req.end(JSON.stringify(task))
            })
        }
        else {
            res.writeHead(404, 'Not Found')
            res.end()
        }

    }
    else {
        res.writeHead(404, 'Not Found')
        res.end()
    }
})

const port = 2000;
server.listen(port, () => {
    console.log(`Server started at localhost: ${port}`);
})