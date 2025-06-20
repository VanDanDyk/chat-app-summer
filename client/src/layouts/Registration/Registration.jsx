import { useState } from "react"
import { NavLink, useNavigate} from 'react-router'
import styles from "./Registration.module.css"
import axios from 'axios'

const Registration = () => {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [firstPassword,setFirstPassword] = useState('')
  const [secondPassword,setSecondPassword] = useState('')
  const [formErr , setFormErr] = useState('')
  const [errorTimeout, setErrorTimeout] = useState()

  const nav = useNavigate()

  const TimeOutFunc = () => {
  document.querySelector('.editClass').style.display = 'none'
  document.querySelector('.editClass').style.transform = 'translateY(-100px)'  
  }

  const RegFunc = async () => {
      try {
      if(username.length < 3 || username.length > 20){
        setFormErr(username < 3 ? 'Имя не должно быть меньше 3 символов' : 'Имя не должно быть больше 20 символов')
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
      if(firstPassword.length == 0 || secondPassword.length == 0){
        setFormErr('Пароль не может быть пустым')
        document.querySelector('.editClass').style.display = 'flex'
        document.querySelector('.editClass').style.transform = 'translateY(0)'
        errorTimeout ? clearTimeout(errorTimeout) : null
        setErrorTimeout(setTimeout(TimeOutFunc, 3000))
        throw new Error(
          'Пароли не совпадают'
        )
      }
      if(!(firstPassword == secondPassword)){
        setFormErr('Пароли не совпадают')
        document.querySelector('.editClass').style.display = 'flex'
        document.querySelector('.editClass').style.transform = 'translateY(0)'
        errorTimeout ? clearTimeout(errorTimeout) : null
        setErrorTimeout(setTimeout(TimeOutFunc, 3000))
        throw new Error(
          'Пароли не совпадают'
        )
      }
      if(firstPassword.length < 6 || firstPassword.length > 25 ){
        setFormErr(firstPassword.length < 6 ? 'Пароль не должен быть меньше 6 символов' : 'Пароль не должно быть больше 25 символов')
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
      const res = await axios.post('http://localhost:3000/auth/register', {
        username,
        email,
        password: firstPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })
      console.log(res)
      nav('/login')
    } catch (error) {
      console.error(error)
    }
    }
    return (
    <div className={styles["wrapper"]}>
      <div className={styles["errorMessageBl"]}><span className={`${styles["errorMessage"]} editClass`}>{formErr}</span></div>
    <h2>Registration</h2>
    <form action="#">
      <div className={styles["input-box"]}>
        <input type="text" placeholder="Enter your name" onChange={(e) => {setUsername(e.target.value)}} required/>
      </div>
      <div className={styles["input-box"]}>
        <input type="text" placeholder="Enter your email" onChange={(e) => {setEmail(e.target.value)}} required/>
      </div>
      <div className={styles["input-box"]}>
        <input type="password" placeholder="Create password" onChange={(e) => {setFirstPassword(e.target.value)}} required/>
      </div>
      <div className={styles["input-box"]}>
        <input type="password" placeholder="Confirm password" onChange={(e) => {setSecondPassword(e.target.value)}} required/>
      </div>
      <div className={styles["button"]}>
        <input type="Submit" value="Register" onClick={() => {RegFunc()}}/>
      </div>
      <div className={styles["text"]}>
        <h3>Already have an account? <NavLink to="/login">Login now</NavLink></h3>
      </div>
    </form>
  </div>)
}

export default Registration