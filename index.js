// xsharawi was here
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

class task{
    task(){
        this.name = ""
        this.id = 0;
        this.state = "in progress"
    }
};

task.prototype.description = ""
task.prototype.priority = 0;
task.prototype.dueDate = "31/12/2023"

let tasks = [];
let cnt = 1;

let choice = 0;

function printTasks(taskList){
        taskList.forEach(e =>{
            console.log(`Task id: ${e.id}`);
            console.log(`Task name: ${e.name}`);
            console.log(`Task state: ${e.state}`);
            console.log(`Task description: ${e.description}`);
            console.log(`Task dueDate: ${e.dueDate}`);
            console.log(`Task priority: ${e.priority}`);
        })
}

while(choice != 9){

    console.log("*****************")
    console.log("Welcome to nodejs ToDo list app")
    console.log("*****************")
    console.log("Select an action: ")
    console.log("1) Add a new task")
    console.log("2) List all tasks")
    console.log("3) List completed tasks")
    console.log("4) Mark a task as done")
    console.log("5) Delete a task")
    console.log("6) Sort tasks by due date")
    console.log("7) Sort tasks by priority")
    console.log("8) Clear task list")
    console.log("9) Exit")
    console.log("*****************")

    choice = Number(await rl.question('Your choice: '));

    if( choice == 1 ){
        let t1 = new task();
        t1.id = cnt;
        cnt++;
        let name = await rl.question('Task name: ');
        while( name == "" ){
            name = await rl.question('please enter a valid name: ');
        }
        t1.name = name;

        let state = await rl.question('Task state: ');
        while( state == "" ){
            state = await rl.question('please enter a valid state: ');
        }
        t1.state = state
        let des = await rl.question('Task description: ');
        while( des == "" ){
            des = await rl.question('please enter a valid description: ');
        }
        t1.description = des;
        let due = await rl.question('Task due date: ');
        while( due == "" ){
            due = await rl.question('please enter a valid due date: ');
        }
        t1.dueDate = due;
        let prio = await rl.question('Task priority (1-10): ');
        t1.priority = prio;
        tasks.push(t1);
    }
    if( choice == 2 ){
        printTasks(tasks)
    }
    if( choice == 3 ){
        let res = tasks.filter((tt) => tt.state == "completed")
        printTasks(res)
    }
    if( choice == 4 ){
        printTasks(tasks);
        let id = await rl.question('Which task would you like to mark as completed (by id): ');
        let index = tasks.findIndex((e) => e.id == id);
        if( index != -1 ){
            tasks[index].state = "completed"
        }
        else{
            console.log('Task not found');
        }
    }
    if( choice == 5 ){
        printTasks(tasks);
        let id = await rl.question('Which task would you like to delete (by id): ');
        let index = tasks.findIndex((e) => e.id == id);
        if( index != -1 ){
            tasks.splice(index,1)
        }
        else{
            console.log('Task not found');
        }
    }
    if( choice == 6 ){
        tasks.sort((a,b) => {
            return ((a.dueDate < b.dueDate) ? 1 : -1)
        })
    }
    if( choice == 7 ){
        tasks.sort((a,b) => {
            return ((a.priority < b.priority) ? 1 : -1)
        })
    }
    if( choice == 8 ){
        cnt = 0;
        tasks = [];
    }
    if( choice == 9 ){
        console.log("GOODBYE THANKS FOR USING MY TASKS APP!!!!");
        console.log("I HOPE YOU HAD A GREAT EXPERICNE");
    }
}

rl.close();