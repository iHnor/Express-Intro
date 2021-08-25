const sequelize = require('./configORM');
const Sequelize = require('sequelize');

const lists = sequelize.define("group", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
});

const tasks = sequelize.define("tasks", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    task: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    done: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    list_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
});

tasks.hasOne(lists);

class ToDO_ORM {

   findList(listId) {
        return tasks.findAll({ where: { list_id: +listId }, raw: true }, { attributes: ['id', 'task', 'done', 'date'] })
            .then(list => {
                return list;
            }).catch(err => console.log(err));
    }

    findTask(taskId) {
        return tasks.findByPk(+taskId)
            .then(res => {
                return res;
            }).catch(err => console.log(err));       
    }

    createTask(listId, data) {
        return tasks.create({
            task: data.task,
            list_id: +listId,
            done: data.done,
            date: data.date
        }).then(res => {
            const task = { id: res.id, task: res.task, done: res.done, date: res.date };
            return task; // Возврат базы даных...
        }).catch(err => console.log(err));
    }

    update(listId, data) {
        return tasks.update({ done: Boolean(data.done) }, {
            where: { id: +listId }
        })
    }

    changeTask( taskId, date) {
        let newTask = date.task ?? 'Default task';
        let newDone = date.done ?? false;
        let newDate = date.date ?? todayDate();
        return tasks.update({ done: Boolean(newDone), task: newTask, date: newDate }, {
            where: { id: +taskId }
        })
    }    

    deleteTask(taskId) {
        return tasks.destroy({
            where: {
                id: +taskId
            }
        })
    }
}

function todayDate() {
    let date = new Date();
    let month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}` 
    let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
    return `${date.getFullYear()}-${month}-${day}`;
}

const List_orm = new ToDO_ORM();

module.exports = List_orm;
