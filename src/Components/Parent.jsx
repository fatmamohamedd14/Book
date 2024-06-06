// import React, { Component } from 'react'
// import Child from './Child'

// export default class Parent extends Component {

//   state={
// //  comName: 'parent'
//   products:[
//     {proName: 'toshiba', proPrice: 3000,onSale:true, count: 0},
//     {proName: 'sony', proPrice: 7000,onSale:false, count: 0},
//     {proName: 'asus', proPrice: 6000, onSale:true,count: 0},
//     {proName: 'lenovo', proPrice: 4000, onSale:false,count: 0},
//   ]

//   }
  
//     render() {
//     return (
//       <div>

//         <h5>name:</h5>
        
//     {/* <Child prop={this.state.comName}/> */}
//    <div className="container">
//     <div className="row g-4 " >
//     {this.state.products.map((pro)=><Child  myPro={pro}/> )}

//     </div>
//    </div>
//       </div>
//     )
//   }
// }

// //relation parent to child   
// //relation parent to child   
// //relation parent to child   

import React from 'react'

export default function Parent() {
  return (
    <div>Parent</div>
  )
}
