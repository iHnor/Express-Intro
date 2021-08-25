const knex = require('./knexconfig');

class ToDO {

    async findAll() {
        return knex('tasks')
            .select('id', 'task', 'done', 'date')
    }

    async findList(listId) {
        return knex('tasks')
            .join('group', 'tasks.list_id', '=', 'group.id')
            .select('tasks.id', 'task', 'done', 'date')
            .where('group.id', +listId)
    }

    async findTask(taskId, listId) {
        return knex('tasks')
            .join('group', 'tasks.list_id', '=', 'group.id')
            .select('tasks.id', 'task', 'done', 'date')
            .where({ 'group.id': +listId, 'tasks.id': +taskId })
    }

    async createTask(listId, data) {
        if (data.done) {
            return knex('tasks')
                .insert({ task: data.name, list_id: +listId, done: data.done, date: todayDate() });

        }
        else if (data.name) {
            return knex('tasks')
                .insert({ task: data.name, list_id: +listId, done: false, date: todayDate() });
        }
    }

    async update(taskId, data) {
        return knex('tasks')
            .where('tasks.id', '=', +taskId)
            .update(data);
    }

    async changeTask(taskId, data) {
        let newTask = data.task ?? 'Default task';
        let newDone = data.done ?? false;
        let newDate = data.date ?? todayDate();
        return knex('tasks')
            .where('tasks.id', '=', +taskId)
            .update({
                task: newTask,
                done: newDone,
                date: newDate
            });

    }

    async deleteTask(taskId) {
        return knex('tasks')
            .where('tasks.id', '=', +taskId)
            .del();
    }

    async todayTasks() {
        let count = await knex('tasks')
            .count('task', { as: 'Today`s tasks' })
            .whereBetween('date', [todayDate(), todayDate()]);;
        let lists = await knex
            .from('tasks')
            .count('done', { as: 'Unfinished tasks in list' })
            .rightJoin('group', 'tasks.list_id', 'group.id')
            .where('done', '=', 'false')
            .groupByRaw('list_id'); 
        let result = count.concat(lists);
        return result;   
    }



    async collectToday() {
        return knex('tasks')
            .select('list_id', 'task', 'date')
            .join('group', 'tasks.list_id', '=', 'group.id')
            .where('date', '=', todayDate());
    }


}

function todayDate() {
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

let listOut = new ToDO()

module.exports = listOut


/*     async getRes1() {
        return knex('tasks')
            .count('task')
            .whereBetween('date', [todayDate(), todayDate()])
            .then(data => {
                console.log(data);
                return data;
            });
    }

    async getRes2() {
        return knex('tasks')
        .count('done', { as: 'False_tasks' })
        .where('done', '=', 'false')

        .then((date2 => {
            console.log(date2);
            return date2;
        }))
    } */
    