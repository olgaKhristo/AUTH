const bcrypt = require('bcrypt')
const prompt = require('prompt-sync')()

//function to hash a password
const hashPassword = async (password) => {
    const saltRounds = 10;
   const hash =  await bcrypt.hash(password, saltRounds)
   return hash
}

// const password = prompt('Enter password ')
// hashPassword(password)
// .then(hashedPassword => {
//     console.log(hashedPassword) 
// }
//     )

const main = async () => {
    const password = prompt('Enter password ')
    const hashedPassword = await hashPassword(password)
    const {version, cost, salt, hash} = splitHash(hashedPassword)
    console.log(`Hashed pass: ${hash}`)
    console.log(`version: ${version}`)
    console.log(`cost: ${cost}`)
    console.log(`Salt: ${salt}`)
    console.log(`hash: ${hash}`)
}

const splitHash = (hashedPassword) => {
    const parts = hashedPassword.split('$')
    const version = parts[1]
    const cost = parts[2]
    const saltAndHash = parts[3]
    const salt = saltAndHash.substring(0,22)
    const hash = saltAndHash.substring(22)
    return { version, cost, salt, hash }

}

main()