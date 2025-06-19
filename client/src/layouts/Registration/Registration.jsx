import styles from "./Registration.css"

export const Login = () => {

    return (<div className={styles["wrapper"]}>
    <h2>Registration</h2>
    <form action="#">
      <div className={styles["input-box"]}>
        <input type="text" placeholder="Enter your name" required/>
      </div>
      <div className={styles["input-box"]}>
        <input type="text" placeholder="Enter your email" required/>
      </div>
      <div className={styles["input-box"]}>
        <input type="password" placeholder="Create password" required/>
      </div>
      <div className={styles["input-box"]}>
        <input type="password" placeholder="Confirm password" required/>
      </div>
      <div className={styles["policy"]}>
        <input type="checkbox"/>
        <h3>I accept all terms & condition</h3>
      </div>
      <div className={styles["input-box button"]}>
        <input type="Submit" value="Register Now"/>
      </div>
      <div className={styles["text"]}>
        <h3>Already have an account? <a href="#">Login now</a></h3>
      </div>
    </form>
  </div>)
}