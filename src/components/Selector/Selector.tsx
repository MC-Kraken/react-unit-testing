import {Select} from "@mui/material";
import {ReactNode} from "react";


interface SelectorProps {
    label: string,
    children: ReactNode,
    setToDoItemPriority: (priority: number) => void
    renderValue: any
}


export const Selector = (props: SelectorProps) => {
    return (
        <Select label={props.label}
                onChange={e => props.setToDoItemPriority(e.target.value as number)} renderValue={props.renderValue}>{props.children}</Select>
    );
};