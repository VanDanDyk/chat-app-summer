import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../features/auth/authSlice'

const RegisterPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await dispatch(registerUser({ username, email, password })).unwrap()
			navigate('/')
		} catch {
			alert('Register failed')
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={username}
				onChange={e => setUsername(e.target.value)}
				placeholder='Username'
			/>
			<input
				value={email}
				onChange={e => setEmail(e.target.value)}
				placeholder='Email'
			/>
			<input
				value={password}
				onChange={e => setPassword(e.target.value)}
				type='password'
				placeholder='Password'
			/>
			<button type='submit'>Register</button>
		</form>
	)
}

export default RegisterPage
