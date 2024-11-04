import girls from './assets/girls.jpg';
import green from './assets/green.jpg';
import face from './assets/face.jpg';
import bright from './assets/bright.jpg';
import water from './assets/water.jpg';
import { RiFlowerFill,RiShoppingCartFill,RiArrowGoBackLine, RiArrowGoBackFill, RiLogoutBoxLine, RiSendBackward, RiArrowRightCircleFill } from '@remixicon/react'
import { useNavigate,Link } from 'react-router-dom';







export default function Homepage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      
      <nav className="flex justify-between items-center p-4 bg-white shadow">
      <div className="text-xl font-bold flex items-center">
        <RiFlowerFill className="mr-2" />
        Radience Bloom™
      </div>
      <div className="flex space-x-4 items-center">
        <Link to="/register" className="text-muted-foreground">Register</Link>
        <Link to="/login" className="text-muted-foreground">Login</Link>
        <a href="#" className="text-muted-foreground">
          <RiShoppingCartFill />
        </a>
      </div>
    </nav>
    
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${girls})` }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="flex items-center justify-center h-full text-white">
          <h1 className="text-4xl font-bold">Radiance Bloom™</h1>
        </div>
      </div>

      
      <div className=" flex items-center gap-6 pt-4 pb-10 mb-8">
        <img src={green} alt="Highlight Image" className="w-[50rem] h-[20rem] object-cover rounded-lg shadow" />
        <p className="text-lg text-muted-foreground ml-10">
        "Radiance Bloom" <br className='font-2xl'>
        </br>

stands out for its clinically tested formulations, backed by rigorous trials to ensure both safety and effectiveness. Developed with dermatologist-approved ingredients, each product is carefully assessed by skincare professionals to guarantee it delivers visible improvements in hydration, radiance, and texture. Trust "Radiance Bloom" for scientifically validated skincare that prioritizes your skin’s health and beauty.Discover the power of our carefully formulated skincare range, designed to rejuvenate your skin and bring out a natural, healthy glow. Experience products crafted with care and backed by clinical results.
        </p>
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Browse our products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-card p-4 rounded-lg shadow">
            <img src={water} alt="Product Image" className="w-full h-40 object-cover rounded-t-lg" />
            
            <h3 className="text-lg font-semibold mt-2">Ponds</h3>
            <p className="text-muted-foreground">$30.00</p>
            
            <div className="flex justify-between mt-4">
            <button className="bg-[#B692C2] text-primary-foreground p-2 rounded-full w-[20rem] flex items-center justify-center">
        Buy now
        <RiArrowRightCircleFill className="ml-16" />
      </button>
              <button className="bg-[black] text-secondary-foreground p-2 rounded-full text-white"> $24.33</button>
            </div>
          </div>

          <div className="bg-card p-4 rounded-lg shadow">
            <img src={bright} alt="Product Image" className="w-full h-40 object-cover rounded-t-lg" />
            <h3 className="text-lg font-semibold mt-2">Gentle Magic</h3>
            <p className="text-muted-foreground">$30.00</p>
            <div className="flex justify-between mt-4">
            <button className="bg-[#B692C2] text-primary-foreground p-2 rounded-full w-[20rem] flex items-center justify-center">
        Buy now
        <RiArrowRightCircleFill className="ml-16" />
      </button>
            <button className="bg-[black] text-secondary-foreground p-2 rounded-full text-white"> $24.33</button>
            </div>
          </div>

          <div className="bg-card p-4 rounded-lg shadow">
            <img src={green} alt="Product Image" className="w-full h-40 object-cover rounded-t-lg" />
            <h3 className="text-lg font-semibold mt-2">Gentle Magic</h3>
            <p className="text-muted-foreground">$30.00</p>
            <div className="flex justify-between mt-4">
            <button className="bg-[#B692C2] text-primary-foreground p-2 rounded-full w-[20rem] flex items-center justify-center">
        Buy now
        <RiArrowRightCircleFill className="ml-16" />
      </button>
            <button className="bg-[black] text-secondary-foreground p-2 rounded-full text-white"> $24.33</button>
            </div>
          </div>

          <div className="bg-card p-4 rounded-lg shadow">
            <img src={face} alt="Product Image" className="w-full h-40 object-cover rounded-t-lg" />
            <h3 className="text-lg font-semibold mt-2">Gentle Magic</h3>
            <p className="text-muted-foreground">$30.00</p>
            <div className="flex justify-between mt-4">
            <button className="bg-[#B692C2] text-primary-foreground p-2 rounded-full w-[20rem] flex items-center justify-center">
        Buy now
        <RiArrowRightCircleFill className="ml-16" />
      </button>

            <button className="bg-[black] text-secondary-foreground p-2 rounded-full text-white"> $24.33</button>
            </div>
          </div>
          
        </div>
      </div>
    
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <div className="flex items-center">
          <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
          <span className="text-muted-foreground ml-2">4 reviews</span>
        </div>
        <div className="mt-4">
          <p className="text-muted-foreground">"This product changed my skin!"</p>
        </div>
      </div>
    
      <footer className="bg-zinc-800 text-white p-4 text-center">
        <p>&copy; 2024 Skincare Brand. All rights reserved.</p>
      </footer>
    </div>
  );
}
