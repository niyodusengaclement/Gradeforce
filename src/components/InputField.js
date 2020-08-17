import React from "react";
import '../assets/styles/components/inputField.scss';

export default ({type,id,name,value,selectOptions,radioInputs,label,checked, placeholder,className,required, handleChange}) => {
  placeholder = required ? `${placeholder} *` : placeholder; 
  let options;
  console.log('selectOptions: ', selectOptions);
  if(selectOptions){
     options = selectOptions.map(selectOption => {
      if(name === 'members'){
        return <option id={selectOption.studentUniqueNumber} value={selectOption.fullName}> {`${selectOption.role}-${selectOption.studentUniqueNumber || ''}-${selectOption.fullName}`}</option>
      } 
      else return <option value={selectOption.value}> {selectOption.label}</option> 
     })
  }
  if(radioInputs){
    options = radioInputs.map(radioInput => {
     return(
       <span className={className}>
         <input type="radio" name={radioInput.name} value={radioInput.value} checked={radioInput.checked} onChange={(event)=>handleChange(event.target)}/>{radioInput.label}
       </span>
     )
    })
 }
  return (
    <div>
      {
        type==='select' ? <select name={name} id={id} value={value} className={`inputField--extra-large ${className}`} onChange={(event)=>handleChange(event.target)} multiple={name === 'members' ? true : false} > 
                              {options}
                          </select>
      : type==='checkbox' ? <div className={className}>
                               <input type={type} value={value} defaultChecked={checked ? 'checked' : ''} onChange={(event) => handleChange(event.target)}/>
                               <span>{label}</span>
                            </div>
        : type ==='radio' ? <div> {options} </div>
        : <input type={type} id={id} name={name} value={value} placeholder={placeholder} className={className} onChange={(event)=>handleChange(event.target)}/> 
      }
    </div>
  );
};