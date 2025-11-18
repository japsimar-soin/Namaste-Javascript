//CLOSURES
function a() {
    let aLet = 10;
    var aVar = 20;
    function b(){
        console.log(aLet, aVar);
    }
    b();
    return b;
}

a();
