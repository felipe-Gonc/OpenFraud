const cpfChecking = (cpf: string) => {
    cpf = cpf.replace(/[^\d]+/g, '')

    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

const phoneChecking = (telefone: string) => {
    telefone = telefone.replace(/\D/g, '');

    if (telefone.length < 10 || telefone.length > 11) return false;

    if (telefone.length === 11 && telefone[2] !== '9') return false;

    return true;
}

const cnpjChecking = (cnpj: string) => {
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14) return false;

    if (/^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);

    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += Number(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado !== Number(digitos.charAt(0))) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += Number(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    return resultado === Number(digitos.charAt(1));
}

const isValidEmail = (e: string) => {
    const res = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return res.test(e);
};

export const validations = (scanType: string, pixKey: string):boolean => {
    let isValid = false;

    switch (scanType) {
        case "cpf":
            isValid = cpfChecking(pixKey)
            break;
        case "telefone":
            isValid = phoneChecking(pixKey)
            break;
        case "pix":
            isValid =
                cnpjChecking(pixKey) ||
                cpfChecking(pixKey) ||
                phoneChecking(pixKey) ||
                isValidEmail(pixKey)
            break;
        default:
            return isValid = false
    }

    return isValid
}