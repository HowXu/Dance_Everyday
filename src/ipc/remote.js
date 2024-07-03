const { ipcRenderer } = require('electron');
let code = require("./func/code.js");
//const app = require('electron').app;
let start = require("./func/start.js");

const path = require("path");
const fs = require("fs");
let dir;
let names_dir;
let timetable_dir;


let names;
let weektimes = [];

let names_base;

let names_str;
let timetable_str;


ipcRenderer.on("can-get-path", () => {
    ipcRenderer.send("getPath");
    //console.log("can-get-path");
});

ipcRenderer.send("getPath");

ipcRenderer.on("path", (event, data) => {
    dir = data;
    names_dir = path.join(dir, "resources/res/names.config");
    timetable_dir = path.join(dir, "libTB.dll");
    ipcRenderer.send("ready-to-loadFiles");
    //console.log("path")
});


let loadNamesfinish = false;
let loadTimefinish = false;


function load() {
    //console.log("Im load");
    fs.readFile(
        names_dir, { encoding: "utf-8" }, (err, res) => {
            if (err) {
                start.setAllUnvisiable();
                alert("未找到配置文件!请检查你的安装目录下res/names.config文件")
            } else {
                //alert(res);
                names_str = res.toString();
                loadNamesfinish = true;
                if (loadTimefinish) {
                    ipcRenderer.send("loadFiles-finish");
                }
                //names_base = names_str.split("\r\n");
                //console.log(names_str)
            }
        }
    );

    fs.readFile(
        timetable_dir, { encoding: "utf-8" }, (err, res) => {
            if (err) {
                start.setAllUnvisiable();
                alert("运行库文件丢失!请重新安装飞饼のLove!")
            } else {
                timetable_str = res.toString();
                loadTimefinish = true;
                if (loadNamesfinish) {
                    ipcRenderer.send("loadFiles-finish");
                }
                //console.log( names_str + "?")
            }

        }

    );


    //return;
}




//let names = ["赵尔文", "知识库", "顺手", "十大", "软件", "的撒", "阿斯顿", "sa"];

ipcRenderer.on("loadFiles", (event, data) => {
    load();
});

let week = {
    "Day1": {
        index: 1,
        is: false,
        times: []
    }, "Day2": {
        index: 2,
        is: false,
        times: []
    }, "Day3": {
        index: 3,
        is: false,
        times: []
    }, "Day4": {
        index: 4,
        is: false,
        times: []
    }, "Day5": {
        index: 5,
        is: false,
        times: []
    }, "Day6": {
        index: 6,
        is: false,
        times: []
    }, "Day0": {
        index: 0,
        is: false,
        times: []
    },
};

//let haveCheck = [];

function which() {
    //let temp;
    for (x in week) {
        //alert(x);
        //console.log("scacas" + week[x].is)
        if (week[x].is) {
            //haveCheck.push(week[x.toString()].index);
            //alert(week[x].index);
            //console.log("week[x].index " + week[x.toString()].index)
            //console.log("scacas")
            return week[x.toString()].index;
        }
    }
}


ipcRenderer.on("ready-to-process", (event, data) => {
    //code.encode(timetable_str);
    //console.log(names_str + "??")
    names = code.decode(names_str.split("\r\n"));
   //weektimes = ["true", "1", "12:10", "11:54", "2", "3:25", "6:36", "5", "20:14", "20:26"];
    let tmp = code.decode(timetable_str.split("\r\n"));
    tmp.forEach(element => {
        //console.log(element);
        let tmp2 = element.split(" ");
        if (tmp2 instanceof Array) {
            tmp2.forEach(element => {
                weektimes.push(element);
            });
        } else {
            weektimes.push(element);
        }
    });
    //console.log(weektimes);
    let len = weektimes.length;
    //console.log("let len = weektimes.length;" + "  "+ len)
    for (let i = 1; i < len; i++) {
        //console.log("parseInt(weektimes[i]" + parseInt(weektimes[i]) +"aa"+ i);
        switch (parseInt(weektimes[i])) {
            case 1:
                for (const key in week) {
                    week[key].is = false;
                }
                week["Day1"].is = true;
                //console.log("case Day1" + week["Day1"].is);
                break;
            case 2:
                for (const key in week) {
                    week[key].is = false;
                }
                week["Day2"].is = true;
                //console.log("case " + week["Day2"].is);
                break;
            case 3:
                for (const key in week) {
                    week[key].is = false;
                }
                week["Day3"].is = true;
                //console.log("case " + week["Day3"].is);
                break;
            case 4:
                for (const key in week) {
                    week[key].is = false;
                }
                week["Day4"].is = true;
                //console.log("case " + week["Day4"].is);
                break;
            case 5:
                for (const key in week) {
                    week[key].is = false;
                }
                week["Day5"].is = true;
                //console.log("case " + week["Day5"].is);
                break;
            case 6:
                for (const key in week) {
                    week[key].is = false;
                }
                week["Day6"].is = true;
                //console.log("case " + week["Day6"].is);
                break;
            case 0:
                for (const key in week) {
                    week[key].is = false;
                }
                week["Day0"].is = true;
                //console.log("case Day0" + week["Day0"].is);
                break;
            default:
                //alert("Day" + which())
                //alert("Day" + which())
                //console.log()
                if (week["Day" + which()].times.indexOf(weektimes[i]) == -1) {
                    week["Day" + which()].times.push(weektimes[i]);
                }

                //alert("Day" + which())
                //alert(week[])
                //.times.push(weektimes[i]);
                break;
        }
    }
    for (const key in week) {
        week[key].is = false;
    }
    //code.decode(arr);
});

ipcRenderer.on("remote-check", (event, data) => {

});


//alert("?")

document.getElementById('btClose').addEventListener('click', () => {
    ipcRenderer.send('onClose');
});

document.getElementById('btMiniliaze').addEventListener('click', () => {
    ipcRenderer.send('onMiniliaze');
});

document.getElementById('name').addEventListener('click', () => {
    ipcRenderer.send('name');
});

document.getElementById('login').addEventListener('click', () => {
    ipcRenderer.send('login');
});

document.getElementById('about').addEventListener('click', () => {
    ipcRenderer.send('about');
    //alert(11)
});

let isDebug = false;

document.getElementById('clo').addEventListener('click', () => {
    if (isDebug) {
        isDebug = false;
        document.getElementById("tx").innerText = "开启调试";
    } else {
        document.getElementById("tx").innerText = "关闭调试";
        isDebug = true;
    }

});



document.getElementById('bt1').addEventListener('click', () => {
    //ipcRenderer.send('onMiniliaze');
    //alert("?")
    //document.body.setBackground = "/asserts/background/background" + (Math.random() * 4).toString + ".webp";
    //alert(11)
    //alert(check())
    start.nameChange(names, 1, check());
    if (isDebug) {
        alert("参与人员共计" + names.length + " ,为: \r\n" + names);
    }
});

document.getElementById('bt2').addEventListener('click', () => {
    //ipcRenderer.send('onMiniliaze');
    //alert("?")
    //console.log(names_str);
    //console.log(names);
    start.nameChange(names, 2, check());
    if (isDebug) {
        alert("参与人员共计" + names.length + " ,为: \r\n" + names);
    }
});

document.getElementById('bt3').addEventListener('click', () => {
    //ipcRenderer.send('onMiniliaze');
    //alert("?")

    start.nameChange(names, 3, check());
    if (isDebug) {
        alert("参与人员共计" + names.length + " ,为: \r\n" + names);
    }
});

function checktime(weekindex) {
    let time = week["Day" + weekindex].times;
    let len = time.length;
    //console.log(len)
    for (let i = 0; i < len; i += 2) {
        let strb = time[i].split(":");
        if (strb.length != 2) {
            return false;
        }
        let stre = time[i + 1].split(":");
        if (stre.length != 2) {
            return false;
        }
        let b = new Date();
        let e = new Date();
        let n = new Date();
        b.setHours(strb[0]);
        b.setMinutes(strb[1]);
        e.setHours(stre[0]);
        e.setMinutes(stre[1]);
        if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
            //console.log(true)
            //console.log("你在我想要的场景里");
            return true;
        }
    }

    return false;
}


function check() {

    //alert(112)
    //console.log(names);
    if (weektimes[0] == "true") {
        let date = new Date();
        let theweek = date.getDay();
        //console.log(checktime(theweek));
        return checktime(theweek);
        /*
        for (const x in week) {
            for (const v in week[x]) {
                console.log(week[x][v].toString())
            }
        }
        */
        //console.log(theweek);
        //return true;
    }
    return false;
}
//ipcRenderer.send('setBackground');

//exports.check = check;




