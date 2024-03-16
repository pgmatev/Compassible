import cls from "classnames"
import classes from "../../styles/Input.module.sass"

export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>
{
    variant?: "primary" | "info" | "danger"
}

export function Input({variant="primary", className, children, ...inputProps}:InputProps) {
    return  <input className={cls(classes.input, classes[variant], className)} {...inputProps}>{children}</input>
}