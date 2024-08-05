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