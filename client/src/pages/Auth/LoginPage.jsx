import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../features/auth/authSlice'

const LoginPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await dispatch(loginUser({ email, password })).unwrap()
			navigate('/home')
		} catch {
			alert('Login failed')
		}
	}

	return (
		<form onSubmit={handleSubmit}>
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
			<button type='submit'>Login</button>
		</form>
	)
}

export default LoginPage
