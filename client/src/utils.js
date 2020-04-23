// 숫자 타입에서 쓸 수 있도록 format() 함수 추가
export function format(number){
    if(number === 0){ 
        return "0" 
    } else {
        const reg = /(^[+-]?\d+)(\d{3})/;
        let n = number.toString();
     
        while (reg.test(n)) { 
            n = n.replace(reg, '$1,$2'); 
        } 
        return n;
    }
};


export function formatInt(number){
    return format(Math.floor(number))
};
