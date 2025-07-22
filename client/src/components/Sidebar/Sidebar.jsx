import cn from 'classnames'
import { IoIosAdd } from 'react-icons/io'
import { LuSettings2 } from 'react-icons/lu'
import TextInput from '../TextInput/TextInput'
import styles from './Sidebar.module.css'
import Profile from '../Profile/Profile'

function Sidebar() {
	return (
		<div className={cn(styles['sidebar'])}>
			<h1 className={cn(styles['title'])}>Chat App</h1>
			<div className={cn(styles['underline'])}></div>
			<Profile />
			<TextInput
				type='search'
				name='search'
				placeholder='search'
				onClick={() => {
					console.log('search')
				}}
			/>
			<div className={cn(styles['chats-container'])}>
				<div className={cn(styles['chats-info'])}>
					<h4 className={cn(styles['chats-title'])}>chats</h4>
					<div className={cn(styles['chats-controls'])}>
						<IoIosAdd className={cn(styles['chat-controls__icon'])} />
						<LuSettings2 className={cn(styles['chat-controls__icon'])} />
					</div>
				</div>
				<ul className={cn(styles['chats-list'])}>
					<li className={cn(styles['chats-user'])}>
						<div className={cn(styles['chats-user__user-and-text'])}>
							<div className={cn(styles['chats-user__avatar'])}></div>
							<div className={cn(styles['chats-user__text'])}>
								<p className={cn(styles['chats-user__username'])}>Ivan Ivanov</p>
								<p className={cn(styles['chats-user__last-message'])}>
									Lorem ipsum dolor sit...
								</p>
							</div>
						</div>
						<p className={cn(styles['chats-user__date'])}>15:13</p>
					</li>
					<li className={cn(styles['chats-user'])}>
						<div className={cn(styles['chats-user__user-and-text'])}>
							<div className={cn(styles['chats-user__avatar'])}></div>
							<div className={cn(styles['chats-user__text'])}>
								<p className={cn(styles['chats-user__username'])}>Ivan Ivanov</p>
								<p className={cn(styles['chats-user__last-message'])}>
									Lorem ipsum dolor sit...
								</p>
							</div>
						</div>
						<p className={cn(styles['chats-user__date'])}>15:13</p>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Sidebar
