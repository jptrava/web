let btns = document.querySelectorAll("button")

function color(){
    return Math.random()*255
}

btns.forEach((btn)=>{
    btn.addEventListener("mouseover",(el)=>{

        btn.style.backgroundColor=`rgb(${color()},${color()},${color()})`
        
        btn.style.borderColor=`rgb(${color()},${color()},${color()})`
        
    })
    
    btn.addEventListener("click",(el)=>{
        btn.style.backgroundColor="white"
        btn.style.borderColor="black"
    })
})