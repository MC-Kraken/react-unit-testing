import { Select } from "@mui/material";
import { ReactNode } from "react";
import '../../styles/components/Selector/Selector.css';

interface SelectorProps {
    label: string,
    children: ReactNode,
    setToDoItemPriority: (priority: any) => void
    value: any,
    renderValue: any
}


export const Selector = (props: SelectorProps) => {
    return (
        <Select label={props.label} value={props.value}
                onChange={e => props.setToDoItemPriority(e.target.value)}
                renderValue={props.renderValue}>{props.children}</Select>
    );
};