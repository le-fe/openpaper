import Api from "./service"

const login = async (payload) => await Api.post("/auth/login", payload)
const register = async (payload) => await Api.post("/auth/register", payload)

const AuthRepository = {
	login,
	register,
}

export default AuthRepository
