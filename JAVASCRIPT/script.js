function VernamEncrypt(input, key) {
    if (input.length !== key.length) {
        return "Error, The key must be the same length as the input.";
    }

    let encrypted = "";

    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i) ^ key.charCodeAt(i);
        encrypted += '\\x' + charCode.toString(16).padStart(2, '0');
    }

    return encrypted;
}

function VernamDecrypt(encrypted, key) {
    if (encrypted.length !== key.length * 4) { 
        return "Error: Key length doesn't match encrypted text length.";
    }

    let decrypted = "";

    for (let i = 0; i < encrypted.length; i += 4) { 
        const hexValue = encrypted.slice(i + 2, i + 4);
        const charCode = parseInt(hexValue, 16);
        decrypted += String.fromCharCode(charCode ^ key.charCodeAt(i / 4));
    }

    return decrypted;
}

function CaesarEncrypt(input, shift) {
    let result = '';
    
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const code = char.charCodeAt(0);

        if (code >= 65 && code <= 90) {
            result += String.fromCharCode((code - 65 + shift) % 26 + 65);
        }
        else if (code >= 97 && code <= 122) {
            result += String.fromCharCode((code - 97 + shift) % 26 + 97);
        }
        else if (code >= 48 && code <= 57) {
            result += String.fromCharCode((code - 48 + shift) % 10 + 48);
        }
        else {
            result += char;
        }
    }

    return result;
}

function CaesarDecrypt(input, shift) {
    let result = '';

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const code = char.charCodeAt(0);

        if (code >= 65 && code <= 90) {
            result += String.fromCharCode((code - 65 - shift + 26) % 26 + 65);
        }
        else if (code >= 97 && code <= 122) {
            result += String.fromCharCode((code - 97 - shift + 26) % 26 + 97);
        }
        else if (code >= 48 && code <= 57) {
            result += String.fromCharCode((code - 48 - shift + 10) % 10 + 48);
        }
        else {
            result += char;
        }
    }

    return result;
}

document.querySelector('.machineBtn.encryptV').addEventListener('click', function() {
    let input = document.querySelector('.iVE').value;
    let key = document.querySelector('.kVE').value;

    if (input === "" || key === "") {
        alert("Input or key is Null, please input valid data.");
        return;
    }

    let encrypted = VernamEncrypt(input, key);

    document.querySelector('.oVE').value = encrypted;
});

document.querySelector('.machineBtn.decryptV').addEventListener('click', function() {
    let input = document.querySelector('.iVD').value;
    let key = document.querySelector('.kVD').value;

    if (input === "" || key === "") {
        alert("Input or key is Null, please input valid data.");
        return;
    }

    let encrypted = VernamDecrypt(input, key);

    document.querySelector('.oVD').value = encrypted;
});

document.querySelector('.machineBtn.encryptC').addEventListener('click', function() {
    let input = document.querySelector('.iCE').value;
    let shift = parseInt(document.querySelector('.kCE').value);

    if (input === "" || shift === "") {
        alert("Input or shift is Null, please input valid data.");
        return;
    }
    if (isNaN(shift)) {
        alert("Please enter a valid numeric key.");
        return;
    }

    let encrypted = CaesarEncrypt(input, shift);

    document.querySelector('.oCE').value = encrypted;
});

document.querySelector('.machineBtn.decryptC').addEventListener('click', function() {
    let input = document.querySelector('.iCD').value;
    let shift = parseInt(document.querySelector('.kCD').value);
    
    if (input === "" || shift === "") {
        alert("Input or shift is Null, please input valid data.");
        return;
    }

    if (isNaN(shift)) {
        alert("Please enter a valid numeric key.");
        return;
    }

    let encrypted = CaesarDecrypt(input, shift);

    document.querySelector('.oCD').value = encrypted;
});