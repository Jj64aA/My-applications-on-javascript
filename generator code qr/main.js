let _main = document.getElementById("app");
let select = document.querySelector(".select") ;
let qrcode = document.getElementById("qrcode");
let text = document.getElementById("text-input");
function select_(){
   let select = document.querySelector(".select") ;
}

function click_bt(){
   console.log(_main)
   if(text.value.length > 0){
      qrcode.style.width = `${select.value}px`
      qrcode.style.height = `${select.value}px`
      qrcode.src = `https://api.qrserver.com/v1/create-qr-code/?size=${select.value}x${select.value}&data=${text.value}`
   };
}
