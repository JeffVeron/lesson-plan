import React  from 'react'



const InputDisplay=({name , value , onChange})=>{

   /*  const[inputValue,setInputValue] = useState("")
  
    const handleInputChange = (event) =>{
      setInputValue(event.target.value)
    } */
  
  return(
    <div>
      <label>{name} : </label>
      <input    
       type = 'text' 
       value = {value}
       onChange = {onChange}
       placeholder = "Name"
      />
  
{/*        <div style = {{ marginTop :'10px'}}>
        <strong>{name}</strong> {value}
      </div> */}  

      
    </div>
  )
  
  
  }


  export default InputDisplay