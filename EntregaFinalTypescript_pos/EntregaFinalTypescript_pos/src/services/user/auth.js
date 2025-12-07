import User from "../../model/user/user.js"
import bcrypt from "bcrypt"


const login = async (email, password) => {
    const user = await User.findOne({
        where: {
            email
        }
    })

    if (!user) {
        return false
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return false
    }

    return user
}

export default login