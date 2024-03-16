export interface RadioProps {
    label: string,
    value: string
}

interface RadioGroupProps {
    options: RadioProps[],
    onChange: (value: string) => unknown,
    value: string
};

export function RadioGroup({options, onChange, value}: RadioGroupProps) {
    return (
        <>
        {options.map((option) => 
            (<label key={option.value}>
                {option.label}
                <input 
                    type="radio" 
                    value={option.value} 
                    onChange={e => onChange(e.target.value)} 
                    checked={value == option.value}
                />
            </label>)
        )}
        </>
    )
}