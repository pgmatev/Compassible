import classes from "../../styles/Checkbox.module.sass"
import cls from "classnames"

export interface CheckBoxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>
{
    label: string
    value: string
    variant?: "switch" | "default"
}

export function CheckBox({label, value, variant="default", className, ...checkBoxProps}:CheckBoxProps) {
    return (
        <>
            <label className={cls(classes[variant], className)}>
                <input type="checkbox" value={value} {...checkBoxProps}/>
                {variant == "switch" ? <span className={classes.slider}></span> : label }
            </label>
        </>)

}