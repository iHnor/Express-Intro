const { Client } = require('pg')
const config = require('./config')

class ToDO {

    async findAll() {
        const client = new Client(config);
        client.connect();
        let sqlComand = await client.query('SELECT text, done, id FROM tasks');
        return sqlComand.rows;
    }

    async findList(listId) {
        const client = new Client(config);
        client.connect();
        let sqlComand = await client.query('SELECT task, done FROM tasks  RIGHT JOIN "group" ON tasks.list_id = group.id WHERE tasks.list_id = $1', [listId])
        return sqlComand.rows;
    }

    async findTask(taskId, listId) {
        const client = new Client(config);
        client.connect();
        let sqlComand = await client.query('SELECT task, done FROM tasks  RIGHT JOIN "group" ON tasks.list_id = groups.id WHERE tasks.list_id = $1', [listId])
        return sqlComand.rows[+taskId - 1]
    }

    async createTask(listId, data) {
        const client = new Client(config);
        client.connect();
        let hasId =  await client.query('SELECT id FROM "group" WHERE id = $1', [+listId]);
        await client.query('INSERT INTO tasks (task, done, list_id) VALUES ($1, false, $2);', [data['name'], +listId]);
        if (hasId.rows.length == 0)
            await client.query('INSERT INTO "group" (id) VALUES ($1) ;', [ +listId]);
    }

    async update(taskId, NewUpdateTask) {
        const client = new Client(config);
        client.connect();
        await client.query('UPDATE tasks SET task = $1 WHERE id = $2;', [NewUpdateTask['name'], taskId])
    }

    // async changeTask(taskId, listId, newTask) {
    //     const client = new Client(config);
    //     client.connect();
    // }

    async deleteTask(taskId) {
        const client = new Client(config);
        client.connect();
        let hasId =  await client.query('SELECT list_id from tasks WHERE list_id = $1', [+taskId]);
        console.log(hasId.rows.length);
        if (hasId.rows.length == 0){
            let listId =  await client.query('SELECT list_id from tasks WHERE id = $1;', [+taskId])
            console.log(listId);
            // await client.query('DELETE FROM "group" WHERE id = $1;', [+listId])
        }
        await client.query('DELETE FROM tasks WHERE id = $1;', [+taskId])
    }
    async deleteList(listId){
        const client = new Client(config);
        client.connect();
        await client.query('DELETE FROM tasks WHERE list_id = $1;', [listId])
        await client.query('DELETE FROM "group" WHERE id = $1;;', [listId])  
    }
}

let listOut = new ToDO()

module.exports = listOut