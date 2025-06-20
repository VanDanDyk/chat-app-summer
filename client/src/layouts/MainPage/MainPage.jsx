import styles from "./MainPage.module.css"

const MainPage = () => {

    return (<div className={styles["wrapper"]}>
    <h2>Пользователи</h2>
    <ul className={styles["usersList"]}>
        <li>
            <div>
            <div className={styles["avatar"]} style={{backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")'}}></div>
            <div className={styles["userData"]}>
                <span className={styles["Name"]}>Name</span>
                <span className={styles["Email"]}>email@gmail.com</span>
            </div>
            </div>
            <div>
            <div className={styles["avatar"]} style={{backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")'}}></div>
            <div className={styles["userData"]}>
                <span className={styles["Name"]}>Name</span>
                <span className={styles["Email"]}>email@gmail.com</span>
            </div>
            </div>
        </li>
        
        </ul>
  </div>)
}

export default MainPage