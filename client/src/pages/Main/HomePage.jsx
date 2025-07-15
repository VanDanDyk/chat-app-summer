import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createChat, createGroupChat } from '../../features/chat/chatSlice'
import { getAllUsers } from '../../features/users/usersSlice'

const HomePage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { user } = useSelector(state => state.auth)
	const { users } = useSelector(state => state.users)
	const [selectedUsers, setSelectedUsers] = useState([])
	const [groupChatTitle, setGroupChatTitle] = useState('')

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

	const startGroupChat = async chatType => {
		if (selectedUsers.length < 1) {
			alert('Для создания групппового чата нужно минимум 2 участника')
			return
		}

		let chatPassword = null
		if (chatType === 'private') {
			chatPassword = prompt('Введите пароль для приватного чата')
			if (!chatPassword) return
		}

		try {
			const createdChat = await dispatch(
				createGroupChat({
					title: groupChatTitle,
					privacy: chatType,
					password: chatType === 'private' ? chatPassword : null,
					members: [user._id, ...selectedUsers]
				})
			).unwrap()
			const chatId = createdChat._id
			if (chatId) navigate(`/chat/${chatId}`)
		} catch (err) {
			alert(err.message)
		} finally {
			setSelectedUsers([])
			setGroupChatTitle('')
		}
	}

	const toggleUserSelection = userId => {
		setSelectedUsers(prev =>
			prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
		)
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
			<h3>Пользователи для добавления:</h3>
			{users.map(u => (
				<div key={u._id}>
					<input
						type='checkbox'
						id={`user-${u._id}`}
						checked={selectedUsers.includes(u._id)}
						onChange={() => toggleUserSelection(u._id)}
					/>
					<label htmlFor={`user-${u._id}`}>{u.username}</label>
				</div>
			))}
			<input
				placeholder='Название группового чата'
				type='text'
				value={groupChatTitle}
				onChange={e => {
					setGroupChatTitle(e.target.value)
				}}
			/>
			<button onClick={() => startGroupChat('public')}>
				Начать публичный групповой чат
			</button>
			<button onClick={() => startGroupChat('private')}>
				Начать приватный групповой чат
			</button>
		</div>
	)
}

export default HomePage
