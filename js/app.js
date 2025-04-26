//import { get_from_storage,set_to_storage,id_element,class_element } from "./utils(R)";
const tasks = class_element("task-box")
class Task {
    constructor(name, description, boss, urgency, day, hour) {
        name = this.name
        description = this.description
        boss = this.boss
        urgency = this.urgency
        day = this.day
        hour = this.hour
    }
}
for (let x in tasks) {
    tasks[x].id = hc(x)[0] + '-' + hc(x)[1]
    tasks[x].addEventListener("click", () => {
        if (localStorage.getItem("allTasks")) {
            allTasks = get_from_storage("allTasks")
            for (y in allTasks) {
                if (allTasks[y].day == hc(x)[0] && allTasks[y].hour == hc(x)[1]) {
                    id_element("show").innerHTML = `<div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${allTasks[y].name}</h5>
                            <p class="card-text">${allTasks[y].description}</p>
                            <p><label>Gave by:</lable>${allTasks[y].boss}</p>
                            <a href="#" class="btn btn-primary">Save</a>
                        </div>
                </div>`
                }
                else {
                    id_element("show").innerHTML = `<h4>${hc(x)[0]} ${hc(x)[1]}:00-${Number(hc(x)[1]) + 1}:00</h4>
                    <div>No tasks here</div>
                <button id="add">Add Task</button>`

                }
            }
        }
        else {
            id_element("show").innerHTML = `<h4>${hc(x)[0]} ${hc(x)[1]}:00-${Number(hc(x)[1]) + 1}:00</h4>
            <div>No tasks here</div>
            <button id="add">Add Task</button >`
        }
        id_element("show").show()
        id_element("add").addEventListener("click", () => {  id_element("show").innerHTML = `<div id="chin"><label>Name:</label><input id="tname">
        <label>Description:</label><textarea id="description"></textarea>
        <label>Gave by:</label><input id="boss">
        <label>Urgency:</label><select id="urgency">
        <option>Select Urgency</option>
        <option class="u">Urgent</option>
        <option class="u">Better start</option>
        <option class="u">Take the time</option>
        </select>
        <label>Day:</label><select id="day">
        <option>Sunday</option>
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        </select>
        <label>Hours:</label><select id="hour">
        <option>8:00-9:00</option>
        <option>9:00-10:00</option>
        <option>10:00-11:00</option>
        <option>11:00-12:00</option>
        <option>12:00-13:00</option>
        <option>13:00-14:00</option>
        <option>14:00-15:00</option>
        <option>15:00-16:00</option>
        <option>16:00-17:00</option>
        <option>17:00-18:00</option>
        </select>
        <button id="save">Save</button></div>`
            id_element("day").value = hc(x)[0]
            id_element("hour").value = `${hc(x)[1]}:00-${Number(hc(x)[1]) + 1}:00`
            id_element('urgency').addEventListener("click", function () {
                switch (id_element("urgency").value) {
                    case "Urgent":
                        id_element("urgency").style.backgroundColor = "#df3719"
                        break
                    case "Better start":
                        id_element("urgency").style.backgroundColor = "#f4dd44"
                        break
                    case "Take the time":
                        id_element("urgency").style.backgroundColor = "#01fc55"
                        break
                    default:
                        id_element("urgency").style.backgroundColor = "white"
                        break
                }
                for (let y in class_element("u")) {
                    class_element("u")[y].style.backgroundColor = "white"
                }
            }
            )
            id_element("save").addEventListener("click", () => {

                id_element("show").close()
            }) })
        function add(x) {
           
        }
    })
}

function hc(i) {
    let dh = []
    switch (i % 6) {
        case 0:
            dh.push("Sunday");
            break;
        case 1:
            dh.push("Monday");
            break;
        case 2:
            dh.push("Tuesday");
            break;
        case 3:
            dh.push("Wednesday");
            break;
        case 4:
            dh.push("Thursday");
            break;
        case 5:
            dh.push("Friday")
            break;
    }
    dh.push(`${Math.floor(i / 6) + 8}`)
    return dh
}

export function set_to_storage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
export function get_from_storage(item) {
    return JSON.parse(localStorage.getItem(item))
}
export function id_element(id) {
    return document.getElementById(id)
}
export function class_element(cls) {
    return document.getElementsByClassName(cls)
}
