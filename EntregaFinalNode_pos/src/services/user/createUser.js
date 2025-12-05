import User from "../../model/user/user.js"
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const create = async (user) => {

    const hash = await bcrypt.hash(user.password, 10)

    const now = Date.now().toString()

    const token = crypto.createHash("md5").update(now).digest("hex")
    
    const userCreate = await User.create({
        name: user.name,
        email: user.email,
        password: hash,
        token: token
    })

    return userCreate
}

export default create