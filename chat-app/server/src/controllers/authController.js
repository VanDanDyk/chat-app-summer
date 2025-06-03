import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

dotenv.config()

export const generateTokens = id => {
	const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
	})
	const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
	})
	return { accessToken, refreshToken }
}

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body
		const userExists =
			(await User.findOne({ email })) || (await User.findOne({ username }))

		if (userExists) {
			return res.status(400).json({
				message: 'Пользователь с таким email и(-или) username уже зарегистрирован'
			})
		}

		const user = await User.create({ username, email, password })
		const tokens = generateTokens(user._id)

		res.cookie('refreshToken', tokens.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
			httpOnly: true
		})

		res.cookie('accessToken', tokens.accessToken, {
			maxAge: 10 * 60 * 1000, // 10 минут
			httpOnly: true
		})

		return res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: `Ошибка регистрации: ${err.message}` })
	}
}
