import styles from "./Button.module.css"

export const Button = ({label, fn, disabled, btnStyles}) => {
    return (
        <button className={styles.btn} type="button" onClick={fn} disabled={disabled} style={btnStyles}>{label}</button>
    )
}