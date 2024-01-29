import { NavLink } from "react-router-dom";
import React from 'react';

const ConditionalNavLink = ({ to, disabled, ...props })=>{
    if (disabled) {
        return (<span className="disabled" title={props.title}>{props.children}</span>);
    } else {
        return (<NavLink title={props.title} to={to} role="button">{props.children}</NavLink>);
    }
}

export default ConditionalNavLink