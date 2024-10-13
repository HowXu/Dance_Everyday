//const {check} = require("./ipc/remote.js");
let t1 = document.getElementById("t11");
let t2 = document.getElementById("t22");
let t3 = document.getElementById("t33");

let bt1 = document.getElementById("bt1");
let bt2 = document.getElementById("bt2");
let bt3 = document.getElementById("bt3");

let bts = [bt1, bt2, bt3];
let ts = [t1, t2, t3];

let loading = document.getElementById("loading");
let prgs = document.getElementById("prgs");
let pgs = document.getElementById("pgs");

let list_div = document.getElementById("list_div");

function set_bts(bts_, style) {
    for (let index = 0; index < bts_.length; index++) {
        bts_[index].style.display = style;
    }
}

function getName(args, check) {
    //这个随机数生成器问题很大
    return args[Math.floor(Math.random() * args.length)];
    //return args[parseInt(Math.random() * args.length)];
}

function setUnvisiable() {

    //pgs.style.transition = "0.2s linear";

    // bt1.style.display = "none";
    // bt2.style.display = "none";
    // bt3.style.display = "none";
    set_bts(bts, "none")
    loading.style.display = "block";
    prgs.style.display = "block";
}

function setAllUnvisiable() {
    setUnvisiable();
    list_div.style.display = "none";
}
function setVisiable() {
    // bt1.style.display = "block";
    // bt2.style.display = "block";
    // bt3.style.display = "block";
    set_bts(bts, "block");
    loading.style.display = "none";
    prgs.style.display = "none";
}

let wait = 200;
let count = 0;
let countall = 20;
let isFinish = false;
let pgs_count = 100 / countall;

//Update 2024.10.13 更新代码逻辑

function hasEquals() {
    //一个类似冒泡排序的东西来进行迭代防止有值相同
    for (let index = 0; index < arguments.length; index++) {
        //alert("args "+ index + "  "+ arguments[index]);
        
    }
    //这里应该有个判断参数个数的东西 不过用不上
    for (let i = 0; i < arguments.length; i++) {
        for (let j = i + 1; j < arguments.length; j++) {
            if (arguments[i] === arguments[j]) {
                return true;
            }
        }
    }

    return false;
}

function set_t_color(ts_, k, color) {
    for (let index = 0; index < k; index++) {
        ts_[index].style.color = color;
    }
}

function t_to_gtemp(ts_, gtemps_, k) {
    for (let index = 0; index < k; index++) {
        ts_[index].innerText = gtemps_[index];
    }
}

function nameChange(args, k, check) {

    //alert("nameChange Begin")

    if (isFinish) {
        isFinish = false;
        return;
    }

    //初始设置为black
    // t1.style.color = "black";
    // t2.style.color = "black";
    // t3.style.color = "black";
    set_t_color(ts, 3, "black");
    count++;
    pgs.value += pgs_count;
    setUnvisiable();

    //其实可以直接获得一切所有然后单独写一个判断k的东西的
    //相同的初始逻辑
    let temp1 = t1.innerText;
    let temp2 = t2.innerText;
    let temp3 = t3.innerText;
    let temps = [temp1, temp2, temp3];

    //gtemp至少有一个初始值

    // let gtemp1;
    // let gtemp2;
    // let gtemp3;
    
    let gtemp1 = getName(args, check);
    let gtemp2 = getName(args, check);
    let gtemp3 = getName(args, check);
    let gtemps = [gtemp1, gtemp2, gtemp3];
    //经典的JS传参有问题
    //gtemps_getName(gtemps, args, check)

    //判断六个temp值都不相同 否则不断更新 这里应该根据k的值来写切换的t有多少个 但是gtemp和temp可以一直切 直到切换innerText

    //注意到这里至少要有六个不同的值才行 然而一共参加的只有7人 程序会在极大的压力下崩溃
    while (hasEquals(gtemp1, gtemp2, gtemp3, temp1, temp2, temp3)) {
        //alert("gtemps  " + gtemps);
        //alert("temps:"+ temps);
        //因为无论k的值永远都是相同的切换方式 保证一定的公平
        gtemp1 = getName(args, check);
        //alert("gtemp1: " + gtemp1+"  "+"getnam  "+ getName(args, check))
        gtemp2 = getName(args, check);
        gtemp3 = getName(args, check);
        //这里也要更新
        gtemps = [gtemp1, gtemp2, gtemp3];
        //gtemps_getName(gtemps, args, check)
        //注意这里有可能因为temps被锁定无限
    }

    if (count == countall) {
        //alert("进入if")
        if (check) {
            //简洁且好改
            while (hasEquals(gtemp1, gtemp2, gtemp3, temp1, temp2, temp3, "HowXu", "CDW")) {
                //alert(gtemp1)
                gtemp1 = getName(args, check);
                gtemp2 = getName(args, check);
                gtemp3 = getName(args, check);
                //gtemps_getName(gtemps, args, check)
                gtemps = [gtemp1, gtemp2, gtemp3];
            }
        }

        isFinish = true;
        count = 0;
        set_t_color(ts, k, "red");
        setVisiable();
        pgs.value = 0;
        //alert(!(gtemp1 !== "HowXu" && gtemp1 !== "CDW" ))
    }

    t_to_gtemp(ts, gtemps, k);

    setTimeout(() => {
        nameChange(args, k, check);
    }, wait)

}



exports.nameChange = nameChange;
exports.setAllUnvisiable = setAllUnvisiable;