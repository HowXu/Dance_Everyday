const crypto = require("crypto-js")
//const fs = require("fs");
//const os = require("os");
//const path = require("path");

let key = "傻逼LZP几百年了不来玩真牛逼";

function encode(input) {
    //alert(crypto.MD5("asdd"));
    let arr = input.split("\r\n");
    arr.forEach((item, index) => {
        arr[index] = crypto.AES.encrypt(item, key).toString();
    });
    //alert(arr);
    //alert(os.homedir);
    //let a = os.homedir;
    //alert(a)
    //let dir = path.join();
    // alert(dir)

    //let tm = '';
    //arr.forEach(element => {
    //    tm += element + "\r\n";
    //});
    //alert(tm);
    //fs.writeFileSync("C:\\Users\\howxu\\Desktop\\AA.txt",tm);
    return arr;
}

function decode(input) {
    //let arr = input.split("\r\n");
    input.forEach((item, index) => {
        input[index] = crypto.AES.decrypt(item, key).toString(crypto.enc.Utf8);
    });
    //alert(input);
    return input;
}

function decode_file(input) {
    let arr = input.split("\r\n");
    arr.forEach((item, index) => {
        arr[index] = crypto.AES.decrypt(item, key).toString(crypto.enc.Utf8);
    });
    let tmp = "";
    let len = arr.length - 1;
    arr.forEach((item, index) => {
        if (index != len) {
            tmp += item + "\r\n";
        } else {
            tmp += item;
        }
    });
    return tmp;
}

function encode_file(input) {
    let arr = input.split("\r\n");
    arr.forEach((item, index) => {
        arr[index] = crypto.AES.encrypt(item, key).toString();
    });
    let tmp = "";
    let len = arr.length - 1;
    arr.forEach((item, index) => {
        if (index != len) {
            tmp += item + "\r\n";
        } else {
            tmp += item;
        }
    });
    return tmp;

}

exports.decode = decode;
exports.encode = encode;
exports.decode_file = decode_file;
exports.encode_file = encode_file;