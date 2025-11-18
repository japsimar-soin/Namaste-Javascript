//CLOSURES
// function a(){
//     let aLet = 10;
//     var aVar = 20;
//     function b(){
//         console.log(aLet, aVar);
//     }
//     b();
//     return b;
// }

// a();

//Closures + SETTIMEOUT
// function a(){
//     for(var i=1; i<=5; i++){
//         setTimeout(function(){
//             console.log(i);
//         }, i*1000);
//     }
// }

// a();

// console.log(aLet);
// console.log(aVar);

//Callback function

setTimeout(function timer(){
    console.log("timer");
}, 3000);

function x(callbackParam){
    var z = 10;
    let s = 20;
    console.log("z: ", z, "s: ", s);
    callbackParam(z);
}
console.log("Start");
x(function y(z){
    console.log(z,"y");
})


// let a = 10
// let b = 20;
// const f = 3;



// // var b = 2;
// console.log(b);




// var globalVar = 1;
// const globalConstant = 2;
// let globalLet = 3;

// undefined = 2;
// console.log(undefined);
// console.log(globalVar);
// a();
// console.log(globalVar);
// // console.log(globalConstant);
// // console.log(globalLet);
// // console.log(a.funVar);
// // console.log(a.funConstant);
// // console.log(a.funLet);
// // console.log(funConstant);


// function a(){
//     var funVar = 4;
//     var globalVar = 5;
//     const funConstant = 5;
//     let funLet = 6;
//     console.log(globalVar);
// }