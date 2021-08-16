// const { Client } = require('pg')
// const config = require('./config')

const knex = require('./knexconfig');

class ToDO {

    async findAll() {
        return knex('tasks')
            .select('id', 'task', 'done')
    }

    async findList(listId) {
        return knex('tasks')
            .join('group', 'tasks.list_id', '=', 'group.id')
            .select('tasks.id', 'task', 'done')
            .where('group.id', +listId)
    }

    async findTask(taskId, listId) {
        return knex('tasks')
            .join('group', 'tasks.list_id', '=', 'group.id')
            .select('tasks.id', 'task', 'done')
            .where({ 'group.id': +listId, 'tasks.id': +taskId })
    }

    async createTask(listId, data) {
        knex('group')
            .insert({ id: listId });

        if (data.done) {
            return knex('tasks')
                .insert({ task: data.name, list_id: +listId, done: data.done });

        }
        else if (data.name) {
            return knex('tasks')
                .insert({ task: data.name, list_id: +listId, done: false });
        }
    }

    async update(taskId, data) {
        console.log(data.name);
        console.log(taskId);
        // name , done , listid
        // if (date.name) {
        //     return knex('tasks')
        //         .where('tasks.id', '=', +taskId)
        //         .update(data.name);
            
        // }

        return knex('tasks')
            .where('tasks.id', '=', +taskId)
            .update({
                done: data.done
            });


        // return knex('tasks')
        //     .where('tasks.id', '=', +taskId)
        //     .update({ done: data.done });

        /* const client = new Client(config);
        client.connect();
        await client.query('UPDATE tasks SET task = $1 WHERE id = $2;', [NewUpdateTask['name'], taskId]) */
    }

    async changeTask(taskId, newTask) {

        // const client = new Client(config);
        // client.connect();

        // /* let task = newTask.task ?? 'Default task';
        // let done = newTask.done ?? false;
        // let list_id = newTask.list_id ?? 0; */
        // await client.query('UPDATE tasks SET task = $1, done = $2, list_id = $3  WHERE id = $4;', [task, done, +list_id, +taskId])
        // let hasId = await client.query('SELECT id FROM "group" WHERE id = $1', [+list_id]);
        // if (hasId.rows.length == 0)
        //     await client.query('INSERT INTO "group" (id) VALUES ($1) ;', [+list_id]);
    }

    async deleteTask(taskId) {
        return knex('tasks')
            .where('tasks.id', '=', +taskId)
            .del();
    }

    async deleteList(listId) {
        knex('group')
            .where('group.id', '=', +listId)
            .del();
        return knex('tasks')
            .where('tasks.list_id', '=', +listId)
            .del();
    }
    async todayTasks() {
        return knex('tasks')
            .count('task')
            .whereBetween('date', [todayDate(), todayDate()]);
    }
    async unDone() {
        return knex('tasks')
            .count('done', { as: 'False_tasks' })
            .where('done', '=', 'false')
    }

    async collectTodey() {
        return knex('tasks')
            .select('list_id', 'task', 'date')
            .where('date', '=', todayDate());
    }


}

function todayDate() {
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

let listOut = new ToDO()

module.exports = listOut