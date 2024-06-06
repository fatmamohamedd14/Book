// import { Component } from "react";


//  export default class Home extends Component
//  {

//   state={
//   proName :'toshipa',
//   proPrice :3000 ,
//   // imgSrc: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',

//   flag: !true,
//   friends :['omar','abdo','eslam','mahmoud'],


//   sayBye()
//   {

//     console.log('bye');
//   }

//   }

//   render(){

//     return <div className="bg-warning p-4">
//  <h1 style={this.state.flag?{color:'black',backgroundColor:"tomato"}:{color:'blue',backgroundColor:"black"}}> Style</h1>
//    <h1 className={this.state.flag?'text-center':''}> Home</h1>
//    <p className="text-danger" >{this.state.proName} </p>
//    <p>price:{this.state.proPrice}</p>
//    <button  className='btn btn-info' onClick={this.state.sayBye} > call method</button>
//    {/* <img src={this.state.imgSrc}  className='w-50' alt="" /> */}
//    <ul>
//     {this.state.friends.map((friend,index)=><li style={index==0?{color:'blue'}:{color:'black'}}>{friend}</li>)}
//    </ul>


//    </div>

//   }
//  }




  // let [name, setName] = useState('abdo')
  // let[count ,setCount]= useState(50)

  // function changeName() {

  //   setName('omar')

  // }
  // function changeCount(){

  //  setCount(count+1)

  // }

  // function decrease(){


  //   setCount(count-1)
  // }
   

  // useEffect(()=>{
  //   if (count===50&&name==='abdo') 
  //   return;
  // console.log('updating');
  
  
  //   },[count,name])
    
  // useEffect(()=>{
  //   if (name==='abdo') 
  //   return;
  // console.log('update Name');
  
  
  //   },[name])
  import React, { useEffect, useState } from 'react'
import CaterorySlider from '../../images/CaterorySlider'
import ForgotPassword from '../ForgotPassword'
import Category from '../../images/Category'
import axios from 'axios'
import FeaturedBooks from '../FeaturedBooks'
import FeaturedBooks2 from '../FeatureBooks2'
import Recbooks from '../Recbooks'
// import Srchbook from '../Srchbook'

export default function Home() {
  
  
  return (
    <>
   
  < CaterorySlider/>
  {/* <Srchbook></Srchbook> */}
  <Recbooks></Recbooks>
  <FeaturedBooks></FeaturedBooks>
  <Category/>
  <FeaturedBooks2></FeaturedBooks2>
 
    </>

  )
}


