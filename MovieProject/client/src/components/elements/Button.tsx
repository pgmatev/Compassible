import cls from 'classnames'
import classes from "../../styles/Button.module.sass"

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,HTMLButtonElement>
{
    variant?: 'primary' | 'info' | 'danger'
}

export function Button({variant = "primary", children, className, ...buttonProps}: ButtonProps) {
    return (
        <button className={cls(classes.button, className, classes[variant])} {...buttonProps} >{children}</button>
    )
}