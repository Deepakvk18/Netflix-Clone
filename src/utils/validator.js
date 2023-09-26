
export function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
}

export function isValidPassword(password){
    const passRegex = /^[\w]{4,60}$/
    return passRegex.test(password)
}