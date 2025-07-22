import cn from 'classnames'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from './MainLayout.module.css'

function MainLayout() {
	return (
		<div className={cn(styles['main-layout'])}>
			<div className={cn(styles['main-layout__container'])}>
				<Sidebar />
			</div>
		</div>
	)
}

export default MainLayout
