import React from 'react';
import './Datepicker.css';

const singleDate = (props) =>
{
    if(props.available === 'true')
    {
        return <button onClick={props.click} className="single-date">{props.date}</button>
    }else{
        return <button className="single-date-disabled">{props.date}</button>
    }
}

export default singleDate;