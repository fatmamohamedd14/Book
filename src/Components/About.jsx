// import { Component } from "react";


// export default class About extends Component {


//     state = {

//         count: 0,
//         fName: 'omar'

//     }

//     increase = () => {
//         this.setState({ count: this.state.count + 1 })
//     }

//     changeName=()=>{

//         this.setState({fName:'abdo'})
//     }


//     render() {
//         return <>

//             <div className="bg-info p-4"> About</div>
//             <h3 > count {this.state.count}</h3>
//             <button className='btn btn-primary' onClick={this.increase}> update count </button>
//      <h3>Name:{this.state.fName} </h3>   
//      <button className="btn btn-info" onClick={this.changeName}> change Name</button>
//         </>
//     }

// }


import React, { useState } from 'react'

export default function About() {

 let  [fruits,setFruits]= useState(['banana','mango'])


   function addMe(e){
    
    if (e.key=='Enter') {
      let newFruits=[...fruits]
      newFruits.push(e.target.value)
      setFruits(newFruits)
      
    }
   



   }


  return (
    <>
    <div>About</div>
    <input type="text  "className='form-control my-4 w-25' onKeyDown={addMe}/>

    <ul>
      {fruits.map((ele)=> <li key={ele}>{ele}</li>)}
   
      </ul>
    </>
  )
}
