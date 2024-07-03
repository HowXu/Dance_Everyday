const { ipcRenderer } = require('electron');
const code = require("../func/code.js");

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

//ipcRenderer.send("getPath");

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
            }
        }
    );
}

ipcRenderer.on("loadFiles", (event, data) => {
    load();
});

document.getElementById('btClose2').addEventListener('click', () => {
    ipcRenderer.send('onClose');
});

document.getElementById('btMiniliaze2').addEventListener('click', () => {
    ipcRenderer.send('onMiniliaze');
});

document.getElementById('login').addEventListener('click', () => {
    ipcRenderer.send('login');
});

document.getElementById('name').addEventListener('click', () => {
    ipcRenderer.send('name');
});

document.getElementById('about').addEventListener('click', () => {
    ipcRenderer.send('about');
});


const root = document.documentElement; // 获取根元素
const eye = document.querySelector('#eyeball'); // 获取眼睛按钮元素
const beam = document.querySelector('#beam'); // 获取光束元素
const passwordInput = document.querySelector('#password'); // 获取密码输入框元素
const usernameInput = document.querySelector('#username'); // 获取密码输入框元素
let h2 = document.getElementById("h2");

// 鼠标移动事件监听器
root.addEventListener('mousemove', (e) => {
    // 获取光束的位置和鼠标位置
    let rect = beam.getBoundingClientRect(); // 获取光束元素的位置信息
    let mouseX = rect.right + (rect.width / 2); // 光束的横坐标
    let mouseY = rect.top + (rect.height / 2); // 光束的纵坐标
    // 计算角度
    let rad = Math.atan2(mouseX - e.pageX, mouseY - e.pageY); // 计算鼠标和光束之间的角度
    let degrees = (rad * (20 / Math.PI) * -1) - 350; // 将弧度转换为角度
    // 设置根元素的样式变量
    root.style.setProperty('--beamDegrees', `${degrees}deg`); // 设置根元素的样式变量，控制光束的旋转角度
});

// 眼睛按钮点击事件监听器
eye.addEventListener('click', e => {
    e.preventDefault(); // 阻止默认行为
    // 切换显示密码的状态
    document.body.classList.toggle('show-password'); // 切换body元素的类名，控制密码是否显示
    // 切换密码输入框的类型
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password'; // 切换密码输入框的类型，控制密码是否显示
    // 聚焦到密码输入框
    passwordInput.focus(); // 将焦点聚焦到密码输入框
});

ipcRenderer.on("ready-to-process", (event, data) => {
    document.getElementById("submit").addEventListener('click', (e) => {
        e.preventDefault();
        let code_dir = usernameInput.value;
        //console.log(timetable_str);
        switch (passwordInput.value) {
            case "decode_timetable":
                fs.writeFileSync(code_dir, code.decode_file(timetable_str), (err) => {
                    //alert();
                    h2.innerText = "写不出来，我很绝望";
                });
                //alert(");
                h2.innerText = "写出完成";
                break;
            case "decode_names":
                fs.writeFileSync(code_dir, code.decode_file(names_str), (err) => {
                    //alert("写不出来，我很绝望");
                    h2.innerText = "写不出来，我很绝望";
                });
                //alert("写出完成");
                h2.innerText = "写出完成";
                break;
            case "encode_names":
                fs.readFile(
                    code_dir, { encoding: "utf-8" }, (err, res) => {
                        if (err) {
                            //alert("不给干，你看着办");
                            h2.innerText = "不给干，你看着办";
                        } else {
                            fs.writeFileSync(names_dir, code.encode_file(res.toString()), (err) => {
                                //alert("写出差错了家人");
                                h2.innerText = "写出差错了家人";
                            });
                            //alert("写入完成");
                            h2.innerText = "写入完成";
                        }
                    }
                );
                break;
            case "encode_timetable":
                fs.readFile(
                    code_dir, { encoding: "utf-8" }, (err, res) => {
                        if (err) {
                            h2.innerText = "不给干，你看着办";
                            //alert("不给干，你看着办");
                        } else {
                            fs.writeFileSync(timetable_dir, code.encode_file(res.toString()), (err) => {
                                //alert("写出差错了家人");
                                h2.innerText = "写出差错了家人";
                            });
                            //alert("写入完成");
                            h2.innerText = "写入完成";
                        }
                    }
                );
                break;
            default:
                //console.log()
                //alert("我知道你不知道账号密码\r\n想开挂速速滚n_n");
                h2.innerText = "我知道你不知道账号密码\r\n想开挂速速滚n_n";
                break;
        }
    });
});


