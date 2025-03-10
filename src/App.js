
import './App.css';
import {Routes , Route , Link} from 'react-router-dom'
import {useState } from 'react'
import NewPage from './newPage';
import TestPage from './testPage'
import  ExportToWord from './docksx.js'
import MuiTableComponent from './table'
import InputDisplay from './InputDisplay'
 




function Home(){

/*   const[inputValue , setInputValue] =useState("") */
  const[weekValue,setWeekValue] = useState("")
  const[subjectValue,setSubjectValue] = useState("")
  const[classValue,setClassValue] = useState("")
  const[strandValue,setStrandValue] = useState("")
  const[subStrandValue,setSubStrandValue] = useState("")
  const[contentStandardValue,setContentStandardValue] = useState("")
  const[indicatorValue,setIndicatorValue] = useState("")
  /* const [startDate , setStartDate] = useState(new Date()) */
 



  const handleIndicatorChange = (event) =>{
    setIndicatorValue(event.target.value)
  }


  const handleWeekChange = (event) =>{
    setWeekValue(event.target.value)
  }

  const handleSubjectChange = (event) =>{
    setSubjectValue(event.target.value)
  }

  const handleClassChange = (event) =>{
    setClassValue(event.target.value)
  }

  const handleStrandChange = (event) =>{
    setStrandValue(event.target.value)
  }

  const handleSubStrandChange = (event) =>{
    setSubStrandValue(event.target.value)
  }

  const handleContentStandardChange = (event) =>{
    setContentStandardValue(event.target.value)
  }

/*   const handleInputChange = (event) =>{
    setInputValue(event.target.value)
  } */

    /* const datePicker = ()=>{

      return(
        <DatePicker 
        showIcon
        selected={startDate}
        onChange={(date) =>setStartDate(date)}

        />
      )
    } */

  // Convert Date object to 'YYYY-MM-DD' format
  const formatDate = (dateObj) => {
    if (!dateObj) return '';
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');  
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const initialDate = new Date();  
const initialWeekEndingDate = new Date();  

   
      const [date, setDate] = useState(formatDate(initialDate)); // Convert to string
      const [weekEndingDate, setWeekEndingDate] = useState(formatDate(initialWeekEndingDate)); // Convert to string

      const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleWeekEndingChange = (event) => {
    setWeekEndingDate(event.target.value);
  };


  
  

  return(

    <div
    style = {{
      marginTop:0,
      backgroundColor:'#65AFFF',
      height:'100%',
      width:"100%",
      minHeight: '100vh',
      minWidth:'100vw'
    }}
    
    >
    <div
    style = {{
      marginTop:0,
    backgroundColor:'#65AFFF',
      height:'100%',
      width:"100%",
      minHeight: '100vh',
      minWidth:'100vw',
    }}
    >


{/*   <Link to='./table' style= { {textDecoration: 'none'}}  >Table</Link>
<Link to="./newPage" style= { {textDecoration: 'none'}} >New Page </Link>
<Link to="./testPage" style= { {textDecoration: 'none'}} >Test Page </Link>
<Link to ='./docksx' style = {{textDecoration: 'none'}}> Docksx </Link>     
   */}
 
 <div
 style = {{
     backgroundColor:'#65AFFF',
     height:'100%',
     width:"100%",
     fontWeight:'bold',
     fontSize:55,
     fontVariant:'titling-caps'
 }}
 >
  <h1>Lesson Plan Generator</h1>
 </div>



<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor:  '#65AFFF',
}}>
  <div style={{
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    maxWidth: '400px',
    fontFamily: 'Arial, sans-serif',
    width: '100%', // Ensure the card takes full width within maxWidth
  }}>
    <InputDisplay
      value={weekValue}
      name="Week"
      onChange={handleWeekChange}
      style={{ marginBottom: '16px' }}
    />
    <div style={{ marginBottom: '16px' }}>
      <label htmlFor="dateInput" style={{ display: 'block',/*  marginBottom: '8px', */ fontSize: '16px', /* color: '#555' */ }}>Day:</label>
      <input
        id="dateInput"
        aria-label="Date"
        type="date"
        value={date}
        onChange={handleDateChange}
        style={{
          width: '70%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '14px',
        }}
      />
    </div>
    <div style={{ marginBottom: '16px' }}>
      <label htmlFor="weekEndingInput" style={{ display: 'block', /* marginBottom: '8px', */ fontSize: '16px', /* color: '#555' */ }}>Week Ending:</label>
      <input
        id="weekEndingInput"
        aria-label="Week Ending"
        type="date"
        value={weekEndingDate}
        onChange={handleWeekEndingChange}
        style={{
          width: '70%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '14px',
        }}
      />
    </div>
    <InputDisplay
      value={subjectValue}
      name="Subject"
      onChange={handleSubjectChange}
      style={{ marginBottom: '16px' }}
    />
    <InputDisplay
      value={classValue}
      name="Class"
      onChange={handleClassChange}
      style={{ marginBottom: '16px' }}
    />
    <InputDisplay
      value={strandValue}
      name="Strand"
      onChange={handleStrandChange}
      style={{ marginBottom: '16px' }}
    />
    <InputDisplay
      value={subStrandValue}
      name="Sub-Strand"
      onChange={handleSubStrandChange}
      style={{ marginBottom: '16px' }}
    />
    <InputDisplay
      value={contentStandardValue}
      name="Content Standard"
      onChange={handleContentStandardChange}
      style={{ marginBottom: '16px' }}
    />
    <InputDisplay
      value={indicatorValue}
      name="Indicator"
      onChange={handleIndicatorChange}
      style={{ marginBottom: '16px' }}
    />
  </div>
</div>

 

<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',  
  backgroundColor: '#65AFFF',
  marginTop:'20px',
}}>
  <div style={{
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    maxWidth: '400px',
    fontFamily: 'Arial, sans-serif'
  }}>
    <strong><p style={{ margin: '8px 0', fontSize: '18px', color: '#333' }}>WEEK: {weekValue}</p></strong>
    <strong><p style={{ margin: '8px 0', fontSize: '16px', color: '#555' }}>WEEK ENDING: {weekEndingDate}</p></strong>
    <strong><p style={{ margin: '8px 0', fontSize: '16px', color: '#555' }}>DAY: {date}</p></strong>
    <strong><p style={{ margin: '8px 0', fontSize: '16px', color: '#555' }}>SUBJECT: {subjectValue}</p></strong>
    <strong><p style={{ margin: '8px 0', fontSize: '16px', color: '#555' }}>CLASS: {classValue}</p></strong>
    <strong><p style={{ margin: '8px 0', fontSize: '16px', color: '#555' }}>STRAND: {strandValue}</p></strong>
    <strong><p style={{ margin: '8px 0', fontSize: '16px', color: '#555' }}>SUB-STRAND: {subStrandValue}</p></strong>
    <strong><p style={{ margin: '8px 0', fontSize: '16px', color: '#555' }}>CONTENT STANDARD: {contentStandardValue}</p></strong>
    <strong><p style={{ margin: '8px 0', fontSize: '16px', color: '#555' }}>INDICATOR: {indicatorValue}</p></strong>
  </div>
</div>
  
 <div
 style = {{
  backgroundColor:'#65AFFF',
  width:'100%',
  height:'100%'
 }}
 
 >

 <Link 
  to={`/docksx?week=${weekValue}
            &class=${classValue}
            &subject=${subjectValue}
            &strand=${strandValue}
            &subStrand=${subStrandValue}
            &contentStandard=${contentStandardValue}
            &indicator=${indicatorValue} 
            &date=${date}
            &weekEnding=${weekEndingDate}
  `} 
  style={{ textDecoration: 'none' }}
>
  <div 
    style={{
      marginTop:'20px',
      display: 'flex',
      alignSelf:'center',
      justifySelf:'center',
      justifyContent: 'center',
      alignItems: 'center', 
      backgroundColor: '#1B2845',
      height: '40px',
      width: '40%',
      borderRadius:'10px',
      width:'150px',

 
    }}
  >
    <p 
      style={{
        color: 'white',
      }}
    >
      Generate Lesson Plan
    </p>
  </div>
</Link>

 </div>


 


    </div>

    </div>




  )
}

 

function App() {

  return (
    <div className="App">

 

        <Routes>
          <Route>
          <Route index element={<Home />} />
            <Route path='newPage' element = { <NewPage/> } />
          <Route path='table' element= {<MuiTableComponent/>} />  
          <Route path = 'testPage' element = {<TestPage/>}  />
          <Route path='docksx'  element = {<ExportToWord/>}   />
            
          </Route>
        </Routes>

     


    </div>
  );
}

export default App;
