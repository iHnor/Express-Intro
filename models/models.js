const {Client} = require('pg')
const config = require('./config')

class ToDO {
    async findAll(){
        const client = new Client(config);
        client.connect();
        let sqlComand = await client.query('SELECT task, done, id FROM items');
        return sqlComand.rows;
    }

    async findList(listId) {
        const client = new Client(config);
        client.connect();
        let sqlComand = await client.query('SELECT task, done, id FROM items WHERE "group"=$1;', [listId])
        return sqlComand.rows;
    }

    // Функція на виведеня конкретної вибраної задачі з вибраного списку

    async createTask(listId, data) {
        const client = new Client(config);
        client.connect();
        await client.query('INSERT INTO items (task, done, "group") VALUES ($1, false, $2);', [ data['name'], listId])
    }

    async update(taskId, listId, NewUpdateTask) {
        const client = new Client(config);
        client.connect();
        await client.query('UPDATE items SET task = $1 WHERE "group" = $2;', [])
        // Створить нову бібліотеку в якій назви стовпчиків - назви групок, а рядки - це унікальні номерки кожного Task`s
        // Розробить заміну елемента по індексу групи ----> по індексу елемента в даній групі
    }

    async changeTask(taskId, listId, newTask) {
        const client = new Client(config);
        client.connect();
    }

    async rewriteTask(listId, id, body) {
        const client = new Client(config);
        client.connect();
        // return client.query('UPDAE public.tasks SET done=$1, name=$2 WHERE tasks.id=$3', [body.done, body.name, +body.id])
    }

    async deleteTask(listId, taskId) {
        const client = new Client(config);
        client.connect();
        // return client.query('DELETE FROM public.tasks WHERE tasks.id=$1;', [+taskId])
    }
}

let listOut = new ToDO()
    
module.exports = listOut