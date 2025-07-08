import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createChat } from '../../features/chat/chatSlice'
import { getAllUsers } from '../../features/users/usersSlice'

const HomePage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { user } = useSelector(state => state.auth)
	const { users } = useSelector(state => state.users)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				await dispatch(getAllUsers()).unwrap()
			} catch (err) {
				alert(err.message)
			}
		}
		fetchUsers()
	}, [dispatch])

	const startChat = async (otherUserId, chatType) => {
		let chatPassword = null

		if (chatType === 'private') {
			chatPassword = prompt('Введите пароль для приватного чата')
			if (!chatPassword) return
		}

		try {
			const createdChat = await dispatch(
				createChat({
					title: 'unnamed',
					privacy: chatType,
					password: chatType === 'private' ? chatPassword : null,
					members: [user._id, otherUserId]
				})
			).unwrap()
			const chatId = createdChat._id
			if (chatId) navigate(`/chat/${chatId}`)
		} catch (err) {
			alert(err.message)
		}
	}

	return (
		<div>
			<h2>Добро пожаловать, {user.username}</h2>
			<h3>Пользователи:</h3>
			<ul>
				{users.map(u => (
					<li key={u._id}>
						<span>{u.username}</span>
						<button onClick={() => startChat(u._id, 'public')}>Чат</button>
						<button onClick={() => startChat(u._id, 'private')}>
							Приватный чат
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default HomePage
