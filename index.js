let db = require('./db.js');
const inquirer = require('inquirer');

module.exports.add = async (title) => {
    //读取任务 没有文件就添加
    let list = await db.read();
    list.push({ title: title, done: false })
    await db.write(list)
}
module.exports.clear = async () => {
    await db.write([])
}
module.exports.showAll = async () => {
    let list = await db.read()
    printTasks(list)
}
function printTasks(list) {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'index',
                message: '请选择你要操作的任务',
                choices: [
                    { name: '退出', value: '-1' }, ...list.map((task, index) => {
                        return { name: `${task.done ? '[ x ]' : '[ _ ]'}${index + 1} - ${task.title}`, value: index.toString() }
                    }), { name: '新建', value: '-2' }
                ]
            }
        )
        .then(answer => {
            let index = Number.parseInt(answer.index);
            if (index >= 0) {
                //操作任务
                selectTask(list, index)
            } else if (index === -2) {
                newTasks(list)
                //新建任务

            }
        });
}
function selectTask(list, index) {
    inquirer
        .prompt(
            {
                type: 'list', name: 'action',
                message: '请选择操作',
                choices: [
                    { name: '退出', value: 'quit' },
                    { name: '已完成', value: 'markAsdone' },
                    { name: '未完成', value: 'markAsundone' },
                    { name: '改标题', value: 'updateTitle' },
                    { name: '删除', value: 'remove' }
                ]
            }
        ).then((answer2) => {
            let actions = { markAsdone, markAsundone, updateTitle, remove };
            let action = actions[answer2.action]
            action && action(list, index)
        })
}

function markAsdone(list, index) {
    list[index].done = true;
    db.write(list);
    console.log('设置完成')
}
function markAsundone(list, index) {
    list[index].done = false;
    db.write(list);
    console.log('设置完成')
}
function updateTitle(list, index) {
    inquirer.prompt(
        {
            type: 'input', name: 'title',
            message: '新的标题:',
            default: list[index].title
        }
    ).then(answer => {
        list[index].title = answer.title;
        db.write(list)
        console.log('修改完成');
    })
}
function remove(list, index) {
    list.splice(index, 1);
    db.write(list);
    console.log('删除完成')
}


function newTasks(list) {
    inquirer.prompt(
        {
            type: 'input', name: 'task',
            message: '任务名称:',
        }
    ).then(answer => {
        list.push({
            title: answer.task,
            done: false
        })
        db.write(list)
        console.log('新建成功');
    });
}