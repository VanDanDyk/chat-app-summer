import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { Server as IOServer } from 'socket.io'
import { errorHandler } from './middlewares/errorMiddleware.js'
import Chat from './models/chatModel.js'
import Message from './models/messageModel.js'
import authRouter from './routes/authRoutes.js'
import chatRouter from './routes/chatRoutes.js'
import userRouter from './routes/userRoutes.js'

dotenv.config()

// Подключение к MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch(err => {
		console.log(err)
	})

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/chats', chatRouter)

app.use(errorHandler)

const port = process.env.PORT || 3000
const server = http.createServer(app)

const io = new IOServer(server, {
	cors: {
		origin: '*',
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
	}
})

io.on('connection', socket => {
	console.log('Новый пользователь подключился', socket.id)

	// присоединение к комнате
	socket.on('joinRoom', async ({ chatId, userId, username }) => {
		socket.join(chatId)
		console.log(`Пользователь ${username} присоединился к комнате ${chatId}`)
		socket.to(chatId).emit('userJoined', { userId, username, chatId })
	})

	// выход из комнаты
	socket.on('leaveRoom', ({ chatId, userId, username }) => {
		socket.leave(chatId)
		console.log(`Пользователь ${username} вышел из комнаты ${chatId}`)
		socket.to(chatId).emit('userLeft', { userId, username, chatId })
	})

	// отправка сообщения
	socket.on('sendMessage', async ({ chatId, authorId, text }) => {
		try {
			const message = await Message.create({
				author: authorId,
				chat: chatId,
				text
			})

			await Chat.findByIdAndUpdate(chatId, { updatedAt: Date.now() })

			const fullMessage = await Message.findById(message._id).populate(
				'author',
				'username'
			)

			io.to(chatId).emit('newMessage', fullMessage)
		} catch (err) {
			console.log('Ошибка при сохранении сообщения', err)
		}
	})

	socket.on('disconnect', () => {
		console.log('Пользователь отключился')
	})
})

server.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
