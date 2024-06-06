// import React from 'react'

// import slider1 from '../assets/images/bookcoverssmall2.jpg'
// import slider2 from '../assets/images/bookdisplaysmall.jpg'
// import slider3 from '../assets/images/bookstackssmall.jpg'
// // import image1 from '../assets/images/grocery-banner-2.jpeg'
// // import image2 from '../assets/images/grocery-banner.png'
// import Slider from 'react-slick';




// export default function CaterorySlider() {

//   let sliders = [slider1,slider2,slider3]
//     var settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1
//       };
//       return (
//         <div className="container ">
//           <div className="row gx-0">
//             <div className="col-md-9">
//             <Slider {...settings}>
//           {sliders.map((img)=><img  height={400}src={img} key={img}></img>)}
//          </Slider>
//             </div>
           
//           </div>
//         </div>
//       )
//     }
import React from 'react';
import slider1 from '../assets/images/bookcoverssmall2.jpg';
import slider2 from '../assets/images/bookdisplaysmall.jpg';
import slider3 from '../assets/images/bookstackssmall.jpg';

export default function CaterorySlider() {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" style={{ maxWidth: '1400px', margin: 'auto' }}>
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
      <div className="carousel-item active">
          <img src={slider1} className="d-block w-100" alt="First slide" style={{ maxHeight: '300px', width: 'auto' }} />
          <div className="carousel-caption d-none d-md-block">
            <h2>LOTS OF EBOOKS. 100 % FREE</h2>
            <p>Welcome to your friendly neighborhood library. We have more than 50,000 free ebooks waiting to be discovered.
           
            </p>
          </div>
        </div>

      <div className="carousel-item">
          <img src={slider2} className="d-block w-100" alt="Second slide" style={{ maxHeight: '300px', width: 'auto' }} />
          <div className="carousel-caption d-none d-md-block">
            <h2>The Ultimate Guide to Free eBooks</h2>
            <p>Not sure what to read next? Explore our catalog of public domain books with our editors. Some real gems are hidden in our library. 
            <a href="https://manybooks.net/subscribe" style={{ color: '#95f0df' }}>Read more</a>
            .</p>
          </div>
        </div>
    
      
        <div className="carousel-item">
          <img src={slider3} className="d-block w-100" alt="Third slide" style={{ maxHeight: '300px', width: 'auto' }} />
          <div className="carousel-caption d-none d-md-block">
            <h2>FREE AND DISCOUNTED BESTSELLERS</h2>
            <p>Join 150,000+ fellow readers. Get free and discounted bestsellers straight to your inbox with the ManyBooks eBook deals newsletter. 
            <a href="https://manybooks.net/subscribe" style={{ color: '#95f0df' }}>Signup now</a>


              </p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
