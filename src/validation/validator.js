
// name regex
const nameRegex = "^[A-Za-z\s]+$"
const validateName = (name)=> {
    return nameRegex.match(name)
}

// email regex
const emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
const validateEmail = (email) =>{
    return emailRegex.match(email)
}

module.exports = {validateName, validateEmail}

