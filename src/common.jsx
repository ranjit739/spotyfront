export const debounce=(fun,delay)=>{
    let timer;
    return function(...args){
        if(timer){
            clearTimeout(timer)
        }
        timer=setTimeout(()=>{
            fun(...args)
        },delay)
    }
}