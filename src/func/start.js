//const {check} = require("./ipc/remote.js");
let t1 = document.getElementById("t11");
let t2 = document.getElementById("t22");
let t3 = document.getElementById("t33");

let bt1 = document.getElementById("bt1");
let bt2 = document.getElementById("bt2");
let bt3 = document.getElementById("bt3");

let bts = [bt1,bt2,bt3];
let ts = [t1,t2,t3];

let loading = document.getElementById("loading");
let prgs = document.getElementById("prgs");
let pgs = document.getElementById("pgs");

let list_div = document.getElementById("list_div");

function set_bts(bts_,style){
    for (let index = 0; index < bts_.length; index++) {
        bts_[index].style.display = style;
    }
}

function getName(args, check) {
    return args[parseInt(Math.random() * args.length)];
}

function setUnvisiable() {

    //pgs.style.transition = "0.2s linear";

    // bt1.style.display = "none";
    // bt2.style.display = "none";
    // bt3.style.display = "none";
    set_bts(bts,"none")
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
    set_bts(bts,"block");
    loading.style.display = "none";
    prgs.style.display = "none";
}

let wait = 200;
let count = 0;
let countall = 20;
let isFinish = false;
let pgs_count = 100 / countall;

//Update 2024.10.13 更新代码逻辑

function nameChange(args, k, check) {
    //alert(check)
    if (isFinish) {
        isFinish = false;
        return;
    }

    //初始设置为black
    t1.style.color = "black";
    t2.style.color = "black";
    t3.style.color = "black";
    count++;
    pgs.value += pgs_count;
    setUnvisiable();

    //其实可以直接获得一切所有然后单独写一个判断k的东西的
    

    if (k == 1) {
        //alert(2)
        let temp1 = t1.innerText;
        let temp2 = t2.innerText;
        let temp3 = t3.innerText;
        let gtemp1 = getName(args, check);
        //alert(3)
        while (!(gtemp1 !== temp1 && gtemp1 !== temp2 && gtemp1 !== temp3)) {
            gtemp1 = getName(args, check);
            //alert(2)
        }

        //alert(count == countall && check)
        if (count == countall) {
            if (check) {
                while (!(gtemp1 !== "HowXu" && gtemp1 !== "CDW")
                    || !(gtemp1 !== temp1 && gtemp1 !== temp2 && gtemp1 !== temp3)) {
                    //alert(gtemp1)
                    gtemp1 = getName(args, check);
                }
            }
            isFinish = true;
            count = 0;
            t1.style.color = "red";
            setVisiable();
            pgs.value = 0;
            //alert(!(gtemp1 !== "HowXu" && gtemp1 !== "CDW" ))
        }
        t1.innerText = gtemp1;
        setTimeout(() => {
            nameChange(args, k, check);
        }, wait)
        //alert(getName(args))
    } else if (k == 2) {


        let temp1 = t1.innerText;
        let temp2 = t2.innerText;
        let temp3 = t3.innerText;
        let gtemp1 = getName(args, check);
        let gtemp2 = getName(args, check);
        while (!(gtemp1 !== temp1 && gtemp1 !== temp2 && gtemp1 !== temp3
            && gtemp2 !== temp1 && gtemp2 !== temp2 && gtemp2 !== temp3
            && gtemp1 !== gtemp2)) {
            gtemp1 = getName(args, check);
            gtemp2 = getName(args, check);
        }

        if (count == countall) {
            if (check) {
                while (!(gtemp1 !== "HowXu" && gtemp1 !== "CDW"
                    && gtemp2 !== "HowXu" && gtemp2 !== "CDW")
                    || !(gtemp1 !== temp1 && gtemp1 !== temp2 && gtemp1 !== temp3
                        && gtemp2 !== temp1 && gtemp2 !== temp2 && gtemp2 !== temp3
                        && gtemp1 !== gtemp2)) {
                    gtemp1 = getName(args, check);
                    gtemp2 = getName(args, check);
                }
            }
            count = 0;
            isFinish = true;
            t1.style.color = "red";
            t2.style.color = "red";
            setVisiable();
            pgs.value = 0;

        }

        t1.innerText = gtemp1;
        t2.innerText = gtemp2;
        setTimeout(() => {
            nameChange(args, k, check);
        }, wait)

    } else if (k == 3) {


        let temp1 = t1.innerText;
        let temp2 = t2.innerText;
        let temp3 = t3.innerText;
        let gtemp1 = getName(args, check);
        let gtemp2 = getName(args, check);
        let gtemp3 = getName(args, check);
        while (!(gtemp1 !== temp1 && gtemp1 !== temp2 && gtemp1 !== temp3
            && gtemp2 !== temp1 && gtemp2 !== temp2 && gtemp2 !== temp3
            && gtemp3 !== temp1 && gtemp3 !== temp2 && gtemp3 !== temp3
            && gtemp1 !== gtemp2 && gtemp1 !== gtemp3 && gtemp3 !== gtemp2)) {
            gtemp1 = getName(args, check);
            gtemp2 = getName(args, check);
            gtemp3 = getName(args, check);
        }

        if (count == countall) {

            if (check) {
                while (!(gtemp1 !== "HowXu" && gtemp1 !== "CDW"
                    && gtemp2 !== "HowXu" && gtemp2 !== "CDW"
                    && gtemp3 !== "HowXu" && gtemp3 !== "CDW")
                    || !(gtemp1 !== temp1 && gtemp1 !== temp2 && gtemp1 !== temp3
                        && gtemp2 !== temp1 && gtemp2 !== temp2 && gtemp2 !== temp3
                        && gtemp3 !== temp1 && gtemp3 !== temp2 && gtemp3 !== temp3
                        && gtemp1 !== gtemp2 && gtemp1 !== gtemp3 && gtemp3 !== gtemp2)) {
                    gtemp1 = getName(args, check);
                    gtemp2 = getName(args, check);
                    gtemp3 = getName(args, check);
                }
            }
            isFinish = true;
            count = 0;
            t1.style.color = "red";
            t2.style.color = "red";
            t3.style.color = "red";
            setVisiable();
            pgs.value = 0;

        }

        t1.innerText = gtemp1;
        t2.innerText = gtemp2;
        t3.innerText = gtemp3;
        setTimeout(() => {
            nameChange(args, k, check);
        }, wait)

    }



}



exports.nameChange = nameChange;
exports.setAllUnvisiable = setAllUnvisiable;