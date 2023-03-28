import {MenuItem, Select} from "@mui/material";
import {ChangeEvent, ReactNode, useState} from "react";


interface SelectorProps {
   label: string,
    placeholder: string,
    children: ReactNode,
}


export const Selector = (props: SelectorProps) => {

    const [value, setValue] = useState<string>("");

    return (
        <Select value={value} label={props.label} onChange={e => setValue(e.target.value)} renderValue={(value) => (value !== '' ? value : 'Placeholder text')}>{props.children}</Select>
    );

};