import store from '@/vuex/store'

/** 
*   Toast公共方法
*/
export function toast(str, icon) {
    store.dispatch('showToast', true)
    store.dispatch('toastMsg',str);
    setTimeout(() => {
        store.dispatch('showToast', false); 
    },1500); 
}

/**
 * dialog公共方法
 */
export function alert(str) {
    //console.log(str)
    store.dispatch('showAlert', true)
    store.dispatch('alertMsg', str)
    setTimeout(() => {
        store.dispatch('showAlert', false); 
    },1500);
}

/**
 * 商品金额处理的公共方法
 */
export function changeTwoDecimal_f(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        alert('function:changeTwoDecimal->parameter error');
        return false;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}

export function numHandle(n) {
    
    let smallNum = changeTwoDecimal_f(n)

    let numArr = smallNum.split(".")
    return numArr
}

/**
 * 将一个数组分成几个同等长度的数组的公共方法
 * array[分割的原数组]
 * size[每个子数组的长度]
 */
export function sliceArray(array, size) {
    var result = [];
    for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
    }
    return result;
}

/**
 * 倒计时
 */
// export function countDown(count) {
//     var res;
//     var t = window.setInterval(function(){
//     var hour=0,
//         minute=0,
//         second=0;

//     if(count > 0){
//         var hour = Math.floor(count/3600);
//         var minute = Math.floor((count - hour*3600)/60);
//         var second = count - hour*3600 - minute*60;
//     }
//     if (minute <= 9) minute = '0' + minute;
//     if (second <= 9) second = '0' + second;
//     return res = hour+':'+minute+':'+second;
//     console.log(res)
//     count--;
//     }, 1000);
// } 

/**
 * 格式化日期
 */
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}