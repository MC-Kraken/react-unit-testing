import {MenuItem, Select} from "@mui/material";
import {ChangeEvent, useState} from "react";


interface SelectorProps {
   label: string,
    placeholder: string,
    input: typeof MenuItem[]
}


export const Selector = (props: SelectorProps) => {

    const [value, setValue] = useState<string>("");

    return (
        <Select value={value} label={props.label} onChange={e => setValue(e.target.value)} placeholder={props.placeholder} input={props.input}/>
    );

};