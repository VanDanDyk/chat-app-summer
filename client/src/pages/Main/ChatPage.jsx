import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSocket } from '../../context/useSocket'
import { getChatByIdAPI } from '../../features/chat/chatAPI'
import {
	addMessage,
	fetchMessages,
	joinPrivateChat,
	joinPublicChat,
	setCurrentChat
} from '../../features/chat/chatSlice'
import { FaArrowUp } from "react-icons/fa";
import styles from './MainPages.module.css'

const ChatPage = () => {
	const { chatId } = useParams()
	const dispatch = useDispatch()
	const socket = useSocket()
	const { messages } = useSelector(state => state.chat)
	const { user } = useSelector(state => state.auth)

	const [input, setInput] = useState('')
	const [log, setLog] = useState([])

	useEffect(() => {
		if (!chatId) return

		const fetchChatData = async () => {
			
			try {
				const chat = await getChatByIdAPI(chatId)
				if (chat.privacy === 'private' && !(chat.members.includes(user._id))) {
					const password = prompt('Введите пароль для приватного чата')
					if (!password) return
					await dispatch(joinPrivateChat({ chatId, password })).unwrap()
				} else {
					await dispatch(joinPublicChat(chatId)).unwrap()
				}

				dispatch(setCurrentChat(chat))
				dispatch(fetchMessages(chatId))
			} catch (err) {
				alert('Ошибка подключения к чату: ', err.message)
			}
		}

		fetchChatData()
	}, [chatId, dispatch])

	useEffect(() => {
		if (!socket || !chatId || !user) return

		socket.emit('joinRoom', {
			chatId,
			userId: user._id,
			username: user.username
		})

		return () => {
			socket.emit('leaveRoom', {
				chatId,
				userId: user._id,
				username: user.username
			})
		}
	}, [socket, chatId, user])

	useEffect(() => {
		if (!socket) return

		const handleNewMessage = msg => {
			if (msg.chat === chatId) {
				dispatch(addMessage(msg))
			}
		}

		const handleUserJoined = ({ username, chatId: incomingChatId }) => {
			if (incomingChatId === chatId) {
				setLog(prev => [...prev, `${username} вошёл в чат`])
			}
		}

		const handleUserLeft = ({ username, chatId: incomingChatId }) => {
			if (incomingChatId === chatId) {
				setLog(prev => [...prev, `${username} вышел из чата`])
			}
		}

		socket.on('newMessage', handleNewMessage)
		socket.on('userJoined', handleUserJoined)
		socket.on('userLeft', handleUserLeft)

		return () => {
			socket.off('newMessage', handleNewMessage)
			socket.off('userJoined', handleUserJoined)
			socket.off('userLeft', handleUserLeft)
		}
	}, [socket, chatId, dispatch])

	// Отправка сообщения
	const sendMessage = () => {
		if (!socket || !input.trim()) return

		socket.emit('sendMessage', {
			text: input,
			authorId: user._id,
			chatId
		})
		setInput('')
	}

	return (
		<div className={styles["wrapper"]}>
		<span className={styles["header"]}>Чат</span>
		<div className={styles['chatWin']}>
			<div >
				{log.map((entry, idx) => (
					<div key={idx} style={{ color: 'gray', fontStyle: 'italic' }}>
						{entry}
					</div>
				))}

				{messages.map(msg => (
					<div key={msg._id}>
						<b>{msg.author?.username || msg.author}:</b> {msg.text}
					</div>
				))}
			</div>
			<div className={styles['chatInput']}>
			<input
				value={input}
				onChange={e => setInput(e.target.value)}
				onKeyDown={e => e.key === 'Enter' && sendMessage()}
			/>
			<FaArrowUp className={styles['sendBtn']} onClick={sendMessage}/>
			</div>
		</div>
		</div>
	)
}

export default ChatPage
