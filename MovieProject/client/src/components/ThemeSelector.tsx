import { useEffect, useState } from "react";
import { RadioGroup, RadioProps } from "./elements/RadioGroup";
import {Helmet} from 'react-helmet';

const OPTIONS: RadioProps[] = [
    {
        label: "Light mode",
        value: "light"
    },
    {
        label: "Dark mode",
        value: "dark"
    }
];

export function ThemeSelector() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    console.log(theme);

    return(
        <>
        <Helmet>
            <link rel="stylesheet" href={`https://jenil.github.io/bulmaswatch/${theme === "light" ? "default" : "darkly"}/bulmaswatch.min.css` }/>
        </Helmet>

        <RadioGroup 
            options= {OPTIONS} 
            onChange= {(value) => setTheme(value as "light" | "dark")}
            value= {theme}
        />
        </>
    )
}
