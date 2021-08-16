const { Client } = require('pg')
const config = require('./config')

const knex = require('./knexconfig');

class ToDO {

    async findAll() {
        /* const client = new Client(config);
        client.connect();
        let sqlComand = await client.query('SELECT task, done, id FROM tasks');
        return sqlComand.rows; */
        return knex('tasks')
            .select('id', 'task', 'done')
            /* .then((data) => {
                return clean(data);
            }); */
    }

    async findList(listId) {
        return knex('tasks')
        .join('group', 'tasks.list_id', '=', 'group.id')
        .select('tasks.id', 'task', 'done')
        .where('group.id', +listId)
        /* .then((data) => {
            return clean(data);
        }); */

       /*  const client = new Client(config);
        client.connect();
        let sqlComand = await client.query('SELECT task, done, tasks.id FROM tasks  RIGHT JOIN "group" ON tasks.list_id = "group".id WHERE tasks.list_id = $1', [listId])
        return sqlComand.rows; */
//
    }

    async findTask(taskId, listId) {
        return knex('tasks')
        .join('group', 'tasks.list_id', '=', 'group.id')
        .select('tasks.id', 'task', 'done')
        .where({ 'group.id': +listId, 'tasks.id': +taskId })
        /* .then((data) => {
            return this.clean(data);
        }); */
        
        /* const client = new Client(config);
        client.connect();
        let sqlComand = await client.query('SELECT task, done, tasks.id FROM tasks  RIGHT JOIN "group" ON tasks.list_id = "group".id WHERE tasks.list_id = $1', [listId])
        return sqlComand.rows[+taskId - 1] */
    }

    async createTask(listId, data) {
        if (typeof data.done === 'boolean   ') {
            return knex('tasks').insert({ task: data.name, list_id: +listId, done: false});
        }
        else if (data.name) {
            return knex('tasks').insert({ task: data.name, list_id: +listId, done: data.done });
        }

        /* const client = new Client(config);
        client.connect();
        let hasId =  await client.query('SELECT id FROM "group" WHERE id = $1', [+listId]);
        await client.query('INSERT INTO tasks (task, done, list_id) VALUES ($1, false, $2);', [data['name'], +listId]);
        if (hasId.rows.length == 0)
            await client.query('INSERT INTO "group" (id) VALUES ($1) ;', [ +listId]); */
    }

    async update(taskId, NewUpdateTask) {
        

        /* const client = new Client(config);
        client.connect();
        await client.query('UPDATE tasks SET task = $1 WHERE id = $2;', [NewUpdateTask['name'], taskId]) */
    }

    async changeTask(taskId, newTask) {
        const client = new Client(config);
        client.connect();

        /* let task = newTask.task ?? 'Default task';
        let done = newTask.done ?? false;
        let list_id = newTask.list_id ?? 0; */
        await client.query('UPDATE tasks SET task = $1, done = $2, list_id = $3  WHERE id = $4;', [task, done, +list_id, +taskId])
        let hasId =  await client.query('SELECT id FROM "group" WHERE id = $1', [+list_id]);
        if (hasId.rows.length == 0)
            await client.query('INSERT INTO "group" (id) VALUES ($1) ;', [ +list_id]);
    }

    async deleteTask(taskId) {
        const client = new Client(config);
        client.connect();
        await client.query('DELETE FROM tasks WHERE id = $1;', [+taskId])
    }

    async deleteList(listId){
        const client = new Client(config);
        client.connect();
        await client.query('DELETE FROM tasks WHERE list_id = $1;', [listId])
        await client.query('DELETE FROM "group" WHERE id = $1;', [listId])  
    }
}

let listOut = new ToDO()

module.exports = listOut