import { useState } from "react"
import { NavLink, useNavigate} from 'react-router'
import axios from 'axios'
import styles from "./Login.module.css"

const Login = () => {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [formErr , setFormErr] = useState('')
  const [errorTimeout, setErrorTimeout] = useState()

  const nav = useNavigate()

  const TimeOutFunc = () => {
  document.querySelector('.editClass').style.display = 'none'
  document.querySelector('.editClass').style.transform = 'translateY(-100px)'  
  }

  const LogFunc = async () => {
      try {
      if(username.length < 3 || username.length > 20){
        setFormErr(username < 3 ? 'Имя не может быть меньше 3 символов' : 'Имя не иожет быть больше 20 символов')
        document.querySelector('.editClass').style.display = 'flex'
        document.querySelector('.editClass').style.transform = 'translateY(0)'
        errorTimeout ? clearTimeout(errorTimeout) : null
        setErrorTimeout(setTimeout(TimeOutFunc, 3000))
        throw new Error(
          'Неправильно введено имя'
        )
      }
      if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)){
        setFormErr('Введите корректный email')
        document.querySelector('.editClass').style.display = 'flex'
        document.querySelector('.editClass').style.transform = 'translateY(0)'
        errorTimeout ? clearTimeout(errorTimeout) : null
        setErrorTimeout(setTimeout(TimeOutFunc, 3000))
        throw new Error(
          'Неправильно введен email'
        )
      }
      if(password.length == 0){
        setFormErr('Пароль не может быть пустым')
        document.querySelector('.editClass').style.display = 'flex'
        document.querySelector('.editClass').style.transform = 'translateY(0)'
        errorTimeout ? clearTimeout(errorTimeout) : null
        setErrorTimeout(setTimeout(TimeOutFunc, 3000))
        throw new Error(
          'Пароли не совпадают'
        )
      }
      
      if(password.length < 6 || password.length > 25 ){
        setFormErr(password.length < 6 ? 'Пароль не может быть меньше 6 символов' : 'Пароль не может быть больше 25 символов')
        document.querySelector('.editClass').style.display = 'flex'
        document.querySelector('.editClass').style.transform = 'translateY(0)'
        errorTimeout ? clearTimeout(errorTimeout) : null
        setErrorTimeout(setTimeout(TimeOutFunc, 3000))
        throw new Error(
          'Неправильно введён пароль'
        )
      }
    } catch (error) {
        console.error(error)
        return null
    }
    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        username,
        email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })
      console.log(res)
      nav('/main')
    } catch (error) {
      console.error(error)
    }
    }
    return (<div className={styles["wrapper"]}>
      <div className={styles["errorMessageBl"]}><span className={`${styles["errorMessage"]} editClass`}>{formErr}</span></div>
    <h2>Login</h2>
    <form action="#">
      <div className={styles["input-box"]}>
        <input type="text" placeholder="Enter your name" onChange={(e) => setUsername(e.target.value)} required/>
      </div>
      <div className={styles["input-box"]}>
        <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required/>
      </div>
      <div className={styles["input-box"]}>
        <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required/>
      </div>
      <div className={styles["button"]}>
        <input type="Submit" value="Login" onClick={LogFunc}/>
      </div>
      <div className={styles["text"]}>
        <h3>Don't have an account yet? <NavLink to='/main' >Register now</NavLink></h3>
      </div>
    </form>
  </div>)
}

export default Login