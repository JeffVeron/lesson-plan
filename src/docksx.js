/* import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {scienceCurriculum1} from "./scienceCurriculum";

export default function CurriculumSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const indicatorFromURL = searchParams.get("indicator");
    if (indicatorFromURL) {
      setSearchTerm(indicatorFromURL);
      handleSearch(indicatorFromURL);
    }
  }, []);

  const handleSearch = (term) => {
    const filteredResults = scienceCurriculum1.filter(
      (item) =>
        item.indicator_code &&
        item.indicator_code.toLowerCase().includes(term.toLowerCase())
    );
    setResults(filteredResults);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Enter indicator code"
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {results.map((item) => (
          <li key={item.id}>
            <strong>{item.indicator_code}</strong>: {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

 */

import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } from 'docx';
import { scienceCurriculum } from './scienceCurriculumB7_B9';
import {scienceCurriculum1} from './scienceCurriculum'
//import { View, Text } from "react-native";


function ExportToWord() {
  const contentRef = useRef(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);


  const week = queryParams.get('week');
  const className = queryParams.get('class');
  const strand = queryParams.get('strand');
  const subStrand = queryParams.get('subStrand');
  const contentStandard = queryParams.get('contentStandard');
  const indicator = queryParams.get('indicator');
  console.log("FUCK THIS INDICATOR ==>" + indicator)
  const subject = queryParams.get('subject');
  const date = queryParams.get('date');
  const weekEnding = queryParams.get('weekEnding');

  // console.log('Full URL:', location.search);
  const [inputCode, setInputCode] = useState("");
const [indicatorValue, setIndicatorValue] = useState(indicator)
const [strandNumber, setStrandNumber] = useState("");
const [strandName, setStrandName] = useState("");
const [subStrandName, setSubStrandName] = useState("");
const [subStrandDescription, setSubStrandDescription] = useState("");
const [contentStandardName, setContentStandardName] = useState("");
const [contentStandardDescription, setContentStandardDescription] = useState("");
const [indicatorName, setIndicatorName] = useState("");
const [indicatorDescription, setIndicatorDescription] = useState("");
const [indicatorExemplars, setIndicatorExemplars] = useState([]);
const [indicatorCoreCompetencies, setIndicatorCoreCompetencies] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

  
useEffect(()=>{
  const indicator = queryParams.get('indicator');
  if (indicator) {
    setSearchTerm(indicator);
    handleSearch(indicator);
  }
},[])


  

  //   console.log(className + typeOf(className))

  const basic7 = scienceCurriculum.find(item => item.name === "Basic_8");
//console.log(basic7.content);

//console.log("latest try ++++++++>" + scienceCurriculum1[0].content.strand1.subStrand1.content.contentStandard.name)
//console.log("latest try ++++++++>" + scienceCurriculum1[0].content.strand1.subStrand1.content.contentStandard.content.indicators[1].coreCompetencies.join('\n'))
//console.log("latest try ++++++++>" + scienceCurriculum1[0].content.strand1.subStrand1.content



/* const {b7,setB7} = useState()

  if(className === 'B7'){
    setB7(scienceCurriculum.find(item => basic7))}
  


  console.log('b7-----'+b7) */

 /*   const [b7, setB7] = useState(null);

useEffect(() => {
  if (className == 'B7') {
    setB7(scienceCurriculum.find(item => item.name === 'Basic_7'));
  }
}, [className]); // Runs when className changes

useEffect(() => {
  console.log('b7 updated:', b7);
}, [b7]);

*/

 const [b7, setB7] = useState(null);

useEffect(() => {
 // console.log('className:', className); // Debugging

  if (className?.trim().toLocaleLowerCase() === 'b7') {
    const foundItem = scienceCurriculum.find(item => item.name === 'Basic_7');
    console.log('Found Item:', foundItem); // Debugging
    setB7(foundItem);
  }
}, [className]);

useEffect(()=>{
  setIndicatorValue(indicator)
},[])
 


  

 


  const handleConvertToDocx = () => {
    // Get the HTML content from the div
    const htmlContent = contentRef.current.innerHTML;

    // Parse the HTML content and convert it to docx elements
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const paragraphs = [];
    doc.body.childNodes.forEach(node => {
      if (node.nodeName === 'P') {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun(node.textContent)],
          })
        );
      } else if (node.nodeName === 'UL') {
        node.childNodes.forEach(li => {
          if (li.nodeName === 'LI') {
            paragraphs.push(
              new Paragraph({
                children: [new TextRun(`• ${li.textContent}`)],
              })
            );
          }
        });
      } else if (node.nodeName === 'TABLE') {
        const rows = [];
        node.querySelectorAll('tr').forEach(tr => {
          const cells = [];
          tr.querySelectorAll('th, td').forEach(thOrTd => {
            cells.push(
              new TableCell({
                children: [new Paragraph({ children: [new TextRun(thOrTd.textContent)] })],
              })
            );
          });
          rows.push(new TableRow({ children: cells }));
        });
        paragraphs.push(
          new Table({
            rows,
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          })
        );
      }
    });

    // Create a DOCX document with A4 page size
    const docx = new Document({
      sections: [
        {
          properties: {
            page: {
              size: {
                width: 11906, // A4 width in TWIPs (1 inch = 1440 TWIPs, A4 width = 8.27 inches)
                height: 16838, // A4 height in TWIPs (A4 height = 11.69 inches)
              },
              margins: {
                top: 1440, // 1 inch margin
                bottom: 1440,
                left: 1440,
                right: 1440,
              },
            },
          },
          children: paragraphs,
        },
      ],
    });

    // Generate the DOCX file
    Packer.toBlob(docx).then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = subject+week+'.docx';
      link.click();
      URL.revokeObjectURL(url);
    });
  };


 // console.log(curriculum); // Logs the full array
//console.log(scienceCurriculum[0]); // Access "Basic_7"
//console.log(scienceCurriculum[1].name); // Outputs: "Basic_8"
//console.log(scienceCurriculum.find(item => item.name === "Basic_9")); // Finds "Basic_9"

//console.log('Basic 7 strand 1 sub-strand 1  name =  '+scienceCurriculum1[0].content.strand1.subStrand1.content.contentStandard.indicators[1].exemplars.join('\n') )
//"B7.1.1.2"

/* const parseIndicator = (indicator) => {
  const parts = indicator.split(".");
  if (parts.length < 2) return null; // Ensure valid format

 
  const  basicLevel = `${parts[0]}`
  const strand = `${basicLevel}.${parts[1]}`; 
  const contentStandard = `${strand}.${parts[2]}`; 
  const subStrand = `${contentStandard}.${parts[3]}`;
  const exemplars = parts.length > 4 ? parts[4] : null; 

  return { basicLevel, strand, contentStandard, subStrand, exemplars };
};

const parsed =  parseIndicator(indicator);
 */


////EXPERIMENTATION

/*
 console.log("EXEMPLARS   "+ parsed.exemplars)
console.log('BASIC LEVEL =' + parsed.basicLevel )
console.log('Content Standard' + parsed.contentStandard)
console.log('SUB-STRAND  = '+ parsed.subStrand )

 */

//
console.log('//////')
//console.log(curriculum[parsed.basicLevel].content[parsed.strand].subStrand[parsed.subStrand].content.contentStandard.indicators[0]);
//console.log(scienceCurriculum1[Number(parsed.basicLevel)].content.strand);
//console.log(scienceCurriculum1[parsed.basicLevel].content[`strand${Number(strand)}`]);
/* let classLevel
if(parsed.basicLevel==="B7"){
  classLevel = 0
} */

//console.log('Strand  '+ parsed.strand)
//console.log('strand content   '+ scienceCurriculum1[classLevel].content[`strand${Number(parsed.strand)}`]);
//console.log( 'exemplars  =  '+scienceCurriculum1[2].content[`strand${Number(parsed.exemplars)}`].subStrand1.name)
//var Stranded = `strand${Number(parsed.exemplars)}`
//const getStrand = Stranded.split(".")
//const strandNumber = getStrand[0]
//console.log(`strand${Number(parsed.exemplars)}`)
//console.log('maybe Strand =====> ' + getStrand[0])
//console.log('current strand content   '+ scienceCurriculum1[0].content[strandNumber].subStrand1.content.contentStandard.indicators[1].exemplars.join('\n')) 
//console.log('current strand exemplars    '+ scienceCurriculum1[2].content[1].subStrand2.content.contentStandard.indicators[2].exemplars.join('\n')) 
//console.log('current strand exemplars   '+ scienceCurriculum1[0].content[2].subStrand1.content.contentStandard.indicators[1].exemplars.join('\n')) 




///////

//console.log("INDICATOR  ======><<><> "+ indicator)


 const handleSearch = () => {
  
  const parts = indicator.split(".");
   
    if (parts.length !== 5) {
      alert("Invalid format. Please use B7.1.1.1.1 format.");
      return;
    }

    const [classLevel, strandIndex, subStrandIndex, contentStandardIndex, indicatorIndex] = parts;
    const curriculumData = scienceCurriculum1.find((entry) => entry.name === `Basic_${classLevel.replace("B", "")}`);

    if (!curriculumData) {
      alert("Class level not found");
      return;
    }

    const strandKey = `strand${strandIndex}`;
    const strand = curriculumData.content[strandKey];
    if (!strand) {
      alert("Strand not found");
      //return;
    }

    const subStrandKey = `subStrand${subStrandIndex}`;
    const subStrand = strand[subStrandKey];
    if (!subStrand) {
      alert("Sub-strand not found");
      //return;
    }

    const contentStandard = subStrand.content?.contentStandard;
    console.log("confirm   " + contentStandard )
     console.log("the content standard" + contentStandard)
    console.log("content Standard  " + subStrand.content?.contentStandard.description)
    console.log("content Standard now " +  contentStandard) 

console.log("contentStandardState:"+ contentStandard);
console.log("contentStandardState.name:", contentStandard?.name);
console.log("inputCode:", inputCode);
console.log("inputCode.slice(0, -2):", inputCode.slice(0, -2));

   if (!contentStandard || contentStandard.name !== `${inputCode.slice(0, -2)}`) {
      console.error("Content standard not found");
     // return;
    } 
    const indicatorState = contentStandard.indicators[Number(indicatorIndex)];
    if (!indicatorState) {
      alert("Indicator not found");
      return;
    }

 
    setStrandNumber(strandIndex);
    setSubStrandName(subStrand.name);
    setSubStrandDescription(subStrand.content?.description || "No description available");
    setContentStandardName(contentStandard.name);
    setContentStandardDescription(contentStandard.description);
    setIndicatorName(indicatorState.name);
    setIndicatorDescription(indicatorState.description);
    setIndicatorExemplars(indicatorState.exemplars || []);
    setIndicatorCoreCompetencies(indicatorState.coreCompetencies || []);
  }; 


/*   useEffect(()=>{
    handleSearch()
  },[indicator]) */
 


 /*  useEffect(() => {
 setIndicatorValue(indicator)
    console.log("INDICATOR 2 ======><<><> "+ indicatorValue)

    if (!indicator) return;

    const parts = indicatorValue.split(".");
    if (parts.length !== 5) {
      console.error("Invalid format. Expected format: B7.1.1.1.1");
      return;
    }

    const [classLevel, strandIndex, subStrandIndex, contentStandardIndex, indicatorIndex] = parts;
    const curriculumData = scienceCurriculum1.find((entry) => entry.name === `Basic_${classLevel.replace("B", "")}`);

    if (!curriculumData) {
      console.error("Class level not found");
      return;
    }

    const strandKey = `strand${strandIndex}`;
    const strand = curriculumData.content[strandKey];
    if (!strand) {
      console.error("Strand not found");
      return;
    }

    const subStrandKey = `subStrand${subStrandIndex}`;
    const subStrand = strand[subStrandKey];
    if (!subStrand) {
      console.error("Sub-strand not found");
      return;
    }

    const contentStandard = subStrand.content?.contentStandard;
    if (!contentStandard || contentStandard.name !== `${indicator.slice(0, -2)}`) {
      console.error("Content standard not found");
      return;
    }

    const foundIndicator = contentStandard.indicators[indicatorIndex];
    if (!foundIndicator) {
      console.error("Indicator not found");
      return;
    }

    setStrandNumber(strandIndex);
    setStrandName(strand.name);
    setSubStrandName(subStrand.name);
    setSubStrandDescription(subStrand.content?.description || "No description available");
    setContentStandardName(contentStandard.name);
    setContentStandardDescription(contentStandard.description);
    setIndicatorName(foundIndicator.name);
    setIndicatorDescription(foundIndicator.description);
    setIndicatorExemplars(foundIndicator.exemplars || []);
    setIndicatorCoreCompetencies(foundIndicator.coreCompetencies || []);

  }, [indicator]);  */



useEffect(()=>{

  if (inputCode === indicator) {
    console.log("The strings are the same.");
  } else {
    console.log("The strings are different.");
  }

},[inputCode , indicator])

 

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
     



      <div ref={contentRef}>

   

{/*         <div>
      <p>Basic Level: {parsed.basicLevel}</p>
      <p>Strand: {parsed.strand}</p>
      <p>Content Standard: {parsed.contentStandard}</p>
      <p>Sub-Strand: {parsed.subStrand}</p>
      {parsed.exemplars && <p>Exemplars: {parsed.exemplars}</p>}
    </div> 
 */}


<div>
       <input
        type="text"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        placeholder="Enter indicator code (e.g., B7.2.1.3.1)"
      />
      <button onClick={handleSearch}>Search</button>  

      {strandName && (
        <div>
          <h3>Details</h3>
          <p><strong>Strand Number:</strong> {strandNumber}</p>
          <p><strong>Strand Name:</strong> {strandName}</p>
          <p><strong>Sub-Strand Name:</strong> {subStrandName}</p>
          <p><strong>Sub-Strand Description:</strong> {subStrandDescription}</p>
          <p><strong>Content Standard Name:</strong> {contentStandardName}</p>
          <p><strong>Content Standard Description:</strong> {contentStandardDescription}</p>
          <p><strong>Indicator Name:</strong> {indicatorName}</p>
          <p><strong>Indicator Description:</strong> {indicatorDescription}</p>
          <p><strong>Indicator Exemplars:</strong> {indicatorExemplars.join(", ")}</p>
          <p><strong>Indicator Core Competencies:</strong> {indicatorCoreCompetencies.join(", ")}</p>
        </div>
      )}
    </div>

    <div><p>{indicatorValue}</p></div>

    <button onClick={handleSearch} >Search</button>

        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ width: '100%', borderCollapse: 'collapse' }}>
              <th colSpan={3}>WEEKLY LESSON NOTES</th>
            </tr>
            <tr style={{ width: '100%' }}>
              <th colSpan={3}>WEEK:  {week} </th>
            </tr>
            <tr>
              <th>Week Ending: {weekEnding}</th>
              <th>Day: {date }</th>
              <th>Subject: {subject} </th>
            </tr>
            <tr>
              <th>Duration: 60mins.</th>
              <th>Strand: {strandNumber} : {strandName}  </th>
              
            </tr>
            <tr>
              <th>Class:  {className } </th>
              <th>Class Size:</th>
              <th>Sub Strand:  {subStrandName} </th>
            </tr>
            <tr>
              <th>Content Standard: { contentStandardName} : {contentStandardDescription} </th>
              <th>Indicator:  {indicatorName}  </th>
              <th>Lesson: 1 of 1</th>
            </tr>
            <tr>
              <th>Performance Indicator:  Learners can  : {indicatorDescription}  {/*  {  scienceCurriculum1[0].content[strandNumber].subStrand1.content.contentStandard.indicators[1].description}  */}</th>
              <th>Core Competencies: 
              {indicatorCoreCompetencies.join(", ")}
                 {/*   {  scienceCurriculum1[0].content[strandNumber].subStrand1.content.contentStandard.indicators[1].coreCompetencies.join('\n')} */} </th>
              <th></th>
            </tr>
            <tr>
              <th colSpan={3}>Reference:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Phase/Starter</td>
              <td>Learners Activities</td>
              <td>Resources</td>
            </tr>
            <tr>
              <td      style={{ height: '150px' }}  >PHASE 1: STARTER</td>
              <td     style={{ height: '150px' }}>
                <div>
               
               {scienceCurriculum1[3].content.join('\n')}
                </div>
              </td>
              <td   style={{ height: '150px' }} >
                <div>
               {/*  Pellentesque in ipsum id orci porta dapibus. Cras ultricies ligula sed magna dictum porta. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. */}
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ height: '150px' }} >PHASE 2 : NEW LEARNING</td>
              <td style={{ height: '150px' }} >
                <div>
                {indicatorExemplars.map((item, index) => (
        <p key={index}>{item}</p>
      ))}

              
               {/*  {indicatorExemplars.map((exemplar,index) =>{
                  <p key = {index}> {exemplar }</p>
                }) 
                
                } */}
  
          {/*  {  scienceCurriculum1[0].content[strandNumber].subStrand1.content.contentStandard.indicators[1].exemplars.join('\n')}   */}
 
             </div>
              </td>
              <td  style={{ height: '150px' }} >
                <div>
              {/*   Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. */}
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ height: '100px' }}  > <div style = {{margin: 0 , padding: 0 , justifySelf:'beginning '}}>PHASE 3: REFLECTION</div></td>
              <td style={{ height: '100px' }}  >
                <div>
                  {scienceCurriculum1[4].content.join('\n')}
                </div>
              </td>
              <td style={{ height: '100px' }}  >
                <div>
               {/*  Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. */}

                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        onClick={handleConvertToDocx}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Download as DOCX
      </button>
    </div>
  );
}

export default ExportToWord;