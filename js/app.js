const tasks = class_element("task-box")
class Task {
    constructor(name, description, boss, urgency, day, hour) {
        this.name = name
        this.description = description
        this.boss = boss
        this.urgency = urgency
        this.day = day
        this.hour = hour
    }
}
let green1 = "#01fc55"
let yellow1 = "#f4dd44"
let red1 = "#df3719"
for (let x in tasks) {
    tasks[x].id = hc(x)[0] + '-' + hc(x)[1]
    tasks[x].innerHTML = `<div class="badge badge-secondary" id="badge-${hc(x)[0]}-${hc(x)[1]}"></div>`
    if (localStorage.getItem("allTasks")) {
        let allTasks = get_from_storage("allTasks")
        for (let y in allTasks) {
            if (allTasks[y].day == hc(x)[0] && allTasks[y].hour == `${hc(x)[1]}:00-${Number(hc(x)[1]) + 1}:00`) {
                id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).innerText = allTasks[y].name
                switch (allTasks[y].urgency) {
                    case "Urgent":
                        id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).style.backgroundColor = red1
                        break;
                    case "Better start":
                        id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).style.backgroundColor = yellow1
                        break;
                    case "Take the time":
                        id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).style.backgroundColor = green1
                        break;
                }
            }
        }
    }
    tasks[x].addEventListener("click", () => {
        if (localStorage.getItem("allTasks")) {
            let allTasks = get_from_storage("allTasks")
            for (let y in allTasks) {
                id_element("show").innerHTML = `<h4>${hc(x)[0]} ${hc(x)[1]}:00-${Number(hc(x)[1]) + 1}:00</h4>
                    <p>No tasks here</p>
                    <button id="add">Add Task</button>
                    <button id="ok">OK</button>
                `
                id_element("ok").addEventListener("click",()=>{
                    id_element("show").close()
                })
                if (allTasks[y].day == hc(x)[0] && allTasks[y].hour == `${hc(x)[1]}:00-${Number(hc(x)[1]) + 1}:00`) {
                    id_element("show").innerHTML = `<div class="card" style="width: 18rem;">
                        <div class="card-body" id="tcard">
                            <h3 class="card-title">${allTasks[y].name}</h3>
                            <p class="card-text">${allTasks[y].description}</p>
                            <p><label>Gave by:</lable>${allTasks[y].boss}</p>
                            <div><button id="ok">OK</button> 
                            <button id="edit">Edit</button>
                            <button id="move">Move</button>
                            <button id="delete">Delete</button></div>
                        </div>
                </div>`
                    switch (allTasks[y].urgency) {
                        case "Urgent":
                            id_element("tcard").style.backgroundColor = red1
                            break;
                        case "Better start":
                            id_element("tcard").style.backgroundColor = yellow1
                            break;
                        case "Take the time":
                            id_element("tcard").style.backgroundColor = green1
                            break;
                    }
                    id_element("ok").addEventListener("click",()=>{id_element("show").close()})
                    id_element("edit").addEventListener("click", () => {
                        edit()
                        id_element("tname").value = allTasks[y].name
                        id_element("description").value = allTasks[y].description
                        id_element("boss").value = allTasks[y].boss
                        id_element("urgency").value = allTasks[y].urgency
                        switch (id_element("urgency").value) {
                            case "Urgent":
                                id_element("urgency").style.backgroundColor = red1
                                break
                            case "Better start":
                                id_element("urgency").style.backgroundColor = yellow1
                                break
                            case "Take the time":
                                id_element("urgency").style.backgroundColor = green1
                                break
                            default:
                                id_element("urgency").style.backgroundColor = "white"
                                break
                        }
                        id_element("close").addEventListener("click", () => { id_element("show").close() })
                        id_element("save").addEventListener("click", () => {
                            let tname = id_element("tname").value
                            let description = id_element("description").value
                            let boss = id_element("boss").value
                            let urgency = id_element("urgency").value
                            let day = id_element("day").value
                            let hour = id_element("hour").value
                            if (tname == "" || description == "" || boss == "" || urgency == "Select Urgency") {
                                alert("Missing data")
                            }
                            else {
                                allTasks[y] = new Task(tname, description, boss, urgency, day, hour)
                                set_to_storage("allTasks", allTasks)
                                id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).innerText = allTasks[y].name
                                switch (allTasks[y].urgency) {
                                    case "Urgent":
                                        id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).style.backgroundColor = red1
                                        break;
                                    case "Better start":
                                        id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).style.backgroundColor = yellow1
                                        break;
                                    case "Take the time":
                                        id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).style.backgroundColor = green1
                                        break;
                                }
                                id_element("wait").style.display = "flex"
                                wait(1.8).then(() => { id_element("wait").style.display = "none", id_element("show").close() })
                            }
                        })
                    })
                    id_element("move").addEventListener("click", () => {
                        id_element("show").innerHTML = `<h3>${allTasks[y].name}</h3>
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
        <button id="save">Save</button>
        <div id="wait"></div>`
                        id_element('day').value = allTasks[y].day
                        id_element("hour").value = allTasks[y].hour
                        id_element("save").addEventListener("click", () => {
                            let hour = id_element("hour").value
                            let day = id_element("day").value
                            let flag = true
                            for (let z in allTasks) {
                                if (z != y && allTasks[z].hour == hour && allTasks[z].day == day) {
                                    alert("Task already exists in this hour")
                                    flag = false
                                }
                            }
                            if (flag) {
                                if (allTasks[y].hour != hour || allTasks[y].day != day) {
                                    allTasks[y].hour = hour
                                    allTasks[y].day = day
                                    set_to_storage("allTasks", allTasks)
                                    id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).innerText = ""
                                    id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).style.backgroundColor = "white"
                                    for (let z in tasks) {
                                        if (hc(z)[0] == day && hour == `${hc(z)[1]}:00-${Number(hc(z)[1]) + 1}:00`) {
                                            id_element(`badge-${hc(z)[0]}-${hc(z)[1]}`).innerText = allTasks[y].name
                                            switch (allTasks[y].urgency) {
                                                case "Urgent":
                                                    id_element(`badge-${hc(z)[0]}-${hc(z)[1]}`).style.backgroundColor = red1
                                                    break;
                                                case "Better start":
                                                    id_element(`badge-${hc(z)[0]}-${hc(z)[1]}`).style.backgroundColor = yellow1
                                                    break;
                                                case "Take the time":
                                                    id_element(`badge-${hc(z)[0]}-${hc(z)[1]}`).style.backgroundColor = green1
                                                    break;
                                            }
                                        }
                                    }
                                }
                                id_element("wait").style.display="flex"
                                wait(1.8).then(()=>{id_element("wait").style.display="none",id_element("show").close()}) 
                            }
                        })
                    })
                    id_element("delete").addEventListener("click", () => {
                        allTasks.splice(y, 1)
                        set_to_storage("allTasks", allTasks)
                        id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).innerText = ""
                        id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).style.backgroundColor = "white"
                        id_element("show").close()
                    })
                    break;
                }
            }
        }
        else {
            id_element("show").innerHTML = `<h3>${hc(x)[0]} ${hc(x)[1]}:00-${Number(hc(x)[1]) + 1}:00</h3>
            <p>No tasks here</p>
            <button id="add">Add Task</button>
            <button id="close">Close</button>`
        }
        id_element("show").show()
        id_element("add").addEventListener("click", () => {
            edit()
            id_element("save").addEventListener("click", () => {
                let tname = id_element("tname").value
                let description = id_element("description").value
                let boss = id_element("boss").value
                let urgency = id_element("urgency").value
                let day = id_element("day").value
                let hour = id_element("hour").value
                if (tname == "" || description == "" || boss == "" || urgency == "Select Urgency") {
                    alert("Missing data")
                }
                else {
                    let newTask = new Task(tname, description, boss, urgency, day, hour)
                    if (localStorage.getItem("allTasks")) {
                        let allTasks = get_from_storage("allTasks")
                        allTasks.push(newTask)
                        set_to_storage("allTasks", allTasks)
                    }
                    else {
                        set_to_storage("allTasks", [newTask])
                    }
                    id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).innerText = tname
                    switch (urgency) {
                        case "Urgent":
                            id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).style.backgroundColor = red1
                            break;
                        case "Better start":
                            id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).style.backgroundColor = yellow1
                            break;
                        case "Take the time":
                            id_element(`badge-${hc(x)[0]}-${hc(x)[1]}`).style.backgroundColor = green1
                            break;
                    }
                    id_element("wait").style.display = "flex"
                    wait(1.8).then(()=>{id_element("wait").style.display = "none", id_element("show").close()}) 
                }

            })
        })

        function edit() {

            id_element("show").innerHTML = `<div id="chin"><label>Name:</label><input id="tname">
        <label>Description:</label><textarea id="description"></textarea>
        <label>Gave by:</label><input id="boss">
        <label>Urgency:</label><select id="urgency">
        <option>Select Urgency</option>
        <option class="u">Urgent</option>
        <option class="u">Better start</option>
        <option class="u">Take the time</option>
        </select>
        <label>Day:</label><select id="day" disabled>
        <option>Sunday</option>
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        </select>
        <label>Hours:</label><select id="hour" disabled>
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
        <button id="save">Save</button>
        <button id="close">Close</button></div>
        <div id="wait"></div>`
            id_element("day").value = hc(x)[0]
            id_element("hour").value = `${hc(x)[1]}:00-${Number(hc(x)[1]) + 1}:00`
            id_element('urgency').addEventListener("click", function () {
                switch (id_element("urgency").value) {
                    case "Urgent":
                        id_element("urgency").style.backgroundColor = red1
                        break
                    case "Better start":
                        id_element("urgency").style.backgroundColor = yellow1
                        break
                    case "Take the time":
                        id_element("urgency").style.backgroundColor = green1
                        break
                    default:
                        id_element("urgency").style.backgroundColor = "white"
                        break
                }
                for (let y in class_element("u")) {
                    class_element("u")[y].style.backgroundColor = "white"
                }
            })
            id_element("close").addEventListener("click", () => { id_element("show").close() })
        }
    })
}
function wait(s) {
    return new Promise(resolve => setTimeout(resolve, s*1000));
}
const sleep = (time) => new Promise((resolve, reject) => setTimeout(resolve, time * 1000))
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
