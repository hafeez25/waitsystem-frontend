export const isValidPinCode = (pincode) =>{
    if(Number.isNaN(pincode)) return false;
    const stringified = pincode.toString();
    const length = stringified.length;
    // let valid = true;
    if(length !== 6) return false;
    let result = true;
    let diff;
    for(let i = 0;i<6;i+=1){
        diff = stringified.charCodeAt(i) - 48;
        if(diff > 9 || diff < 0){
            result = false;
            break;
        }
    }
    return result;
}

export const isValidLatitude = (value) =>{
    if(Number.isNaN(value)) return false;
    const number = Number(value);
    return number <= 90 && number >= -90;
}

export const isValidLongitude = (value) =>{
    if(Number.isNaN(value)) return false;
    const number = Number(value);
    return number <= 180 && number >= -180;
}

export const isValidSerialNo = (value) =>{
    if(Number.isNaN(value)) return false;
    const number = Number(value);
    const IntVal = Number.parseInt(value,10);
    return number === IntVal;
}