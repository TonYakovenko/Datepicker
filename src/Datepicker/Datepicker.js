import React, { Component } from 'react';
import './Datepicker.css';
import SingleDate from './SingleDate.js';

class Datepicker extends Component {
    
    getCurrDayMonthYear = () => {
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        let monthYear = [day, month, year];
        return monthYear;
    }
    
    state = {
        choosenDate:[
            {year:this.getCurrDayMonthYear()[2], month:this.getCurrDayMonthYear()[1]}
        ], 
        monthsNames:[
            {
                a: 'ינואר',
                b: 'פברואר',
                c: 'מרץ',
                d: 'אפריל',
                e: 'מאי',
                f: 'יוני',
                g: 'יולי',
                h: 'אוגוסט',
                i: 'ספטמבר',
                j: 'אוקטובר',
                k: 'נובמבר',
                l: 'דצמבר'
            }
        ],
        dissableButton:[
            {next:false, prev:true}
        ]
    }
    
    getMonthsArr = () =>{
        let month = this.getCurrDayMonthYear()[1];
        let year = this.getCurrDayMonthYear()[2];
        let offset = month;
        const arr = Object.values(this.state.monthsNames[0]);
        let monthArr = [];
        for( let i=0; i < arr.length; i++) {
            let pointer = (i + offset) % arr.length;
            if(pointer === 0 && offset > 0) year++;
            if(i===0) {
                monthArr.push(<option key={i} index={i} value={pointer} selected>{arr[pointer]} {year}</option>);
            }else{
                monthArr.push(<option key={i} index={i} value={pointer}>{arr[pointer]} {year}</option>);        
            }
        }
        
        return monthArr;
    }
                              
    checkButtons = () => {
        
    }
    
    switchDateHandler = () => {
        let sel = document.getElementById("date-selector");
        let choosenValue = parseInt(sel.options[sel.selectedIndex].value); 
        let choosenYear = sel.options[sel.selectedIndex].text.split(" ")[1]; 
        let key = sel.options[sel.selectedIndex].index;
        
        if(key === 0){
            this.setState({
                dissableButton:[
                    {next:false, prev:true}
                ]
            })
        }else 
        if(key === 11){
            this.setState({
                dissableButton:[
                    {next:true, prev:false}
                ]
            })
        }else{
            this.setState({
                dissableButton:[
                    {next:false, prev:false}
                ]
            })
        }
        
        this.setState({
            choosenDate:[
                {year:choosenYear, month:choosenValue}
            ]
        })
    }
                
    nextDateHandler = () => {
        let e = document.getElementById("date-selector");
        let indexNew = e.selectedIndex +1 <= 11 ? e.selectedIndex +1 : e.selectedIndex;
        e.options[indexNew].selected = 'selected';
        let choosenValue = parseInt(e.options[indexNew].value); 
        let choosenYear = e.options[indexNew].text.split(" ")[1]; 
        
        if(indexNew < 11){
           this.setState({
                dissableButton:[
                    {next:false, prev:false}
                ]
           })
        }else{
           this.setState({
                dissableButton:[
                    {next:true, prev:false}
                ]
           })
        }
        
        this.setState({
            choosenDate:[
                {year:choosenYear, month:choosenValue}
            ]
        })
      
    }
    
    prevDateHandler = () => {
        let e = document.getElementById("date-selector");
        
        let indexNew = e.selectedIndex -1 >= 0 ? e.selectedIndex -1 : e.selectedIndex;
        e.options[indexNew].selected = 'selected'
        let choosenValue = parseInt(e.options[indexNew].value); 
        let choosenYear = e.options[indexNew].text.split(" ")[1]; 
        
        if(indexNew > 0){
           this.setState({
                dissableButton:[
                    {next:false, prev:false}
                ]
           })
        }else{
           this.setState({
                dissableButton:[
                    {next:false, prev:true}
                ]
           })
        }
        
        this.setState({
            choosenDate:[
                {year:choosenYear, month:choosenValue}
            ]
        })
        
    }

    
    getNumOfDays = (year, month) => {
        let daysInMonth = 32 - new Date(year, month, 32).getDate();
        return daysInMonth;
    }
    
    getDaysArr = (year, month) => {
        let days = [];
        for (let i = 0; i < this.getNumOfDays(year, month); i++) {
            days.push({i});
        }
        return days;
    }
    
    getDayOfAWeek = (year, month) => {
        let firstDate = new Date(year, month);
        let dayOfAWeek = firstDate.getDay();
        return dayOfAWeek;
    }
        
    getNumOfBlankDaysArr = (year, month) => {
        let blankDays = [];
        for (let i = 0; i < this.getDayOfAWeek(year, month); i++) {
            blankDays.push({i});
        }
        return blankDays;
    }
    
    checkAvailability = (day, month) => {
        let today = this.getCurrDayMonthYear()[0];
        let currMonth = this.getCurrDayMonthYear()[1];
        
        if(month === currMonth && day < today)
        {
            return "false";
        }else
        {
            return "true";
        }
    }
    
    fillValues = () => {
        let blankDays = this.getNumOfBlankDaysArr(this.state.choosenDate[0].year, this.state.choosenDate[0].month).map((value, index) => {
            return <SingleDate available='false' key={"blank"+index}/>
        })
        
        let values = this.getDaysArr(this.state.choosenDate[0].year, this.state.choosenDate[0].month).map((value, index) => {
            return <SingleDate key={index} date={index + 1} click={this.onClickHandler.bind(this, index + 1)} available = {this.checkAvailability(index + 1, this.state.choosenDate[0].month)} />
        })
        
        let merge = [...blankDays, ...values];
        
        return merge;
    }                                                                           
                                                                           
    onClickHandler = (day) => {
        console.log(new Date(this.state.choosenDate[0].year, this.state.choosenDate[0].month, day));
    }
        
                                                                                                          
    render() {
        return (
            
            <div className="Datepicker">
                <div className="close-button">✕</div>
                
                <h1>תאריך יציאה</h1>
            
                <div className="selector-holder">
                    <button id="nxt-btn" className="next" onClick={this.nextDateHandler.bind(this)} disabled={this.state.dissableButton[0].next}>&lsaquo;</button>
                    

                    <select id="date-selector" name="month" className="select-month" onChange={this.switchDateHandler}>  
                        
                        return (
                            {this.getMonthsArr()}
                        );     
            
                    </select>
            
                    <button id="prv-btn" className="previous" onClick={this.prevDateHandler.bind(this)} disabled={this.state.dissableButton[0].prev}>&rsaquo;</button>
                    
                    
                </div>
                
                <div className="week-days">
                    <ul>
                        <li className="week-day">&lsquo;א</li>
                        <li className="week-day">&lsquo;ב</li>
                        <li className="week-day">&lsquo;ג</li>
                        <li className="week-day">&lsquo;ד</li>
                        <li className="week-day">&lsquo;ה</li>
                        <li className="week-day">&lsquo;ו</li>
                        <li className="week-day">&lsquo;ש</li>
                    </ul>    
                </div>
                
                <div className="dates">
                    {this.fillValues()}
                </div>
            
            
                <div className="expl-section">
                    <div className="expl-holder">
                        <div className="bullet-green"></div>
                        <div className="expl-txt">תאריכי יציאה וחזרה אפשריים</div>
                    </div>
                    <div className="expl-holder">
                        <div className="bullet-pink"></div>
                        <div className="expl-txt">אפשרית טיסט צרטר בתאריכים אלו</div>
                    </div>
                </div>
            
            </div>
        )
    }
}

export default Datepicker;

