const jwt = require('jsonwebtoken');

export const encodeBase64 = word => {
    let encodedStringBtoA = undefined;
    if (word !== null && word !== undefined && word.length > 0) {
        encodedStringBtoA = btoa(word);
    }
    return encodedStringBtoA;
};

export const wordToCapitalize = words => {
    if (words !== null && words !== undefined && words.length > 0) {
        return words.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
    return words;
};

export const validateTokenExp = token => {
    const decoded = jwt.decode(token, { complete: true});

    if(decoded) {
        const currentTime = Math.floor(Date.now()/1000);
        if(decoded.payload.exp < currentTime){
            return false;
        }
        else { 
            return true;
        }
    }else{
        return false;
    }
}

export const getEmailUserLogged = token => {
    const decoded = jwt.decode(token, { complete: true});

    return decoded.payload.email;

}

export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
}

export const validateNumber = (number) => {
    const re = /^[0-9]+$/
    return re.test(number);
}


export const formatCurrency = (value, locale = 'es-ES', currency = 'COP') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
    }).format(value);
};