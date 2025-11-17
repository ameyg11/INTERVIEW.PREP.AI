// import React, { useContext, useState } from 'react'
import img from '../assets/img.png'
import React, { useContext, useState } from 'react'
// import img from '/mnt/data/253b69cb-ffaa-4e5e-b3e3-1cb9c3ae1273.png'
import { APP_FEATURES } from '../utils/data';
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from 'react-icons/lu'
import SignUp from './Auth/SignUp';
import Modal from '../components/Modal';
import Login from './Auth/Login';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

// NEW: small interactive helpers
const Badge = ({ children }) => (
  <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">{children}</span>
)

const FeatureCard = ({ title, description, accent=false }) => (
  <div className={`p-6 rounded-xl transition transform hover:-translate-y-2 hover:shadow-2xl border ${accent ? 'bg-gradient-to-br from-amber-50 to-white border-amber-200' : 'bg-white border-gray-100'}`}>
    <h3 className="text-base font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const CareerCard = ({ title, subtitle, color='amber' }) => (
  <div className={`rounded-xl p-5 shadow-sm border hover:shadow-lg transition transform hover:-translate-y-1 bg-${color}-50 border-${color}-100`}>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-md bg-white shadow flex items-center justify-center text-lg font-bold">{title.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
    </div>
  </div>
)

const LandingPage = () => {
  const {user} = useContext( UserContext );
  const navigate = useNavigate();

  const [ openAuthModal, setOpenAuthModal ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState("login");

  const handleCTA = () => {
    if(!user){
      setOpenAuthModal (true);
    }else{
      navigate("/dashboard")
    }
  };

  return (
    <>
    <div className="w-full min-h-screen bg-[#FFFCEF] relative overflow-hidden">
      {/* soft decorative blur layers (A + B + C mix) */}
      <div className="absolute -left-32 -top-20 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl"/>
      <div className="absolute right-0 top-10 w-[440px] h-[380px] rounded-full bg-white/60 blur-2xl"/>

      <div className='container mx-auto px-6 py-10 relative z-10'>
        {/* Header */}
        <header className='flex justify-between items-center mb-12'>
          <div className='text-xl text-black font-bold'>
            Interview Prep AI
          </div>
          <div className="flex items-center gap-4">
            {user ? <ProfileInfoCard />: (
              <>
              <button 
                className='bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-5 py-2 rounded-full hover:opacity-95 transition-colors cursor-pointer '
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
              </>
            )}
          </div>
        </header>

        {/* HERO */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12'>
          <div>
            <Badge><LuSparkles className='inline mr-2'/>AI Powered</Badge>
            <h1 className='mt-6 text-4xl md:text-5xl font-extrabold leading-tight'>
              Ace Interviews with <br />
              <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] animate-text-shine'>AI-Powered Learning</span>
            </h1>

            <p className='mt-5 text-gray-800 text-lg max-w-xl'>
              Get role-specific questions, expand answers when you need them, dive deeper into concepts, and organize everything your way. From preparation to mastery - your ultimate interview toolkit is here.
            </p>

            <div className='mt-6 flex gap-4'>
              <button onClick={handleCTA} className='bg-black text-white px-6 py-3 rounded-full font-semibold shadow hover:opacity-95 transition'>Get Started</button>
              <button onClick={()=>navigate('/pricing')} className='px-6 py-3 rounded-full border border-amber-200 text-amber-700 font-medium hover:bg-amber-50 transition'>View Pricing</button>
            </div>

            <div className='mt-8 grid grid-cols-2 gap-3 max-w-md'>
              <div className='p-3 bg-white rounded-lg shadow-sm flex items-center justify-between'>
                <div className='text-sm text-gray-500'>Free users</div>
                <div className='font-medium'>3/day</div>
              </div>
              <div className='p-3 bg-white rounded-lg shadow-sm flex items-center justify-between'>
                <div className='text-sm text-gray-500'>Premium</div>
                <div className='font-medium'>Unlimited</div>
              </div>
            </div>
          </div>

          <div className='w-full flex justify-center'>
            <div className='w-full max-w-lg rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.01] transition'>
              <img src={img} alt="Hero" className='w-full object-cover h-96' />
            </div>
          </div>
        </div>

        {/* Features section (keeps your content but enhanced design) */}
        <section className='my-12'>
          <h2 className='text-2xl font-semibold text-center mb-8'>Features That Make You Shine</h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {APP_FEATURES.slice(0,3).map(f => (
              <FeatureCard key={f.id} title={f.title} description={f.description} accent />
            ))}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            {APP_FEATURES.slice(3).map(f => (
              <FeatureCard key={f.id} title={f.title} description={f.description} />
            ))}
          </div>
        </section>

        {/* Career paths section - new professional look */}
        <section className='my-12 bg-white p-8 rounded-2xl shadow-md'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-xl font-semibold'>Profession & Career Paths</h3>
              <p className='text-gray-500 text-sm'>Pick a career path to explore role-specific Q&A and practice sets.</p>
            </div>
            <div>
              <button onClick={()=>navigate('/explore')} className='px-4 py-2 border rounded-full text-sm hover:bg-amber-50'>Explore all</button>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            <CareerCard title="Frontend Developer" subtitle="React, JavaScript, HTML" color='amber' />
            <CareerCard title="Backend Developer" subtitle="Node.js, Express, REST" color='blue' />
            <CareerCard title="Cloud Engineer" subtitle="AWS, GCP, CI/CD" color='teal' />
            <CareerCard title="UI/UX" subtitle="Design, Prototyping" color='pink' />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className='my-12 grid md:grid-cols-2 gap-8 items-center'>
          <div>
            <h3 className='text-2xl font-semibold mb-4'>Why learners love Interview Prep AI</h3>
            <ul className='space-y-3'>
              <li className='flex items-start gap-3'>
                <div className='w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center font-semibold'>AI</div>
                <div>
                  <div className='font-medium'>AI tuned for interviews</div>
                  <div className='text-sm text-gray-500'>Answers are concise, relevant and role-specific.</div>
                </div>
              </li>
              <li className='flex items-start gap-3'>
                <div className='w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center font-semibold'>S</div>
                <div>
                  <div className='font-medium'>Save & organize</div>
                  <div className='text-sm text-gray-500'>Keep your sessions and revisit questions anytime.</div>
                </div>
              </li>
              <li className='flex items-start gap-3'>
                <div className='w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center font-semibold'>C</div>
                <div>
                  <div className='font-medium'>Cost friendly</div>
                  <div className='text-sm text-gray-500'>Free tier available; premium unlocks unlimited usage.</div>
                </div>
              </li>
            </ul>
          </div>

          <div className='bg-amber-50 p-6 rounded-xl'>
            <h4 className='font-semibold mb-3'>Testimonials</h4>
            <div className='space-y-4'>
              <blockquote className='bg-white p-4 rounded-lg shadow-sm'>"Helped me get my first dev job. The explanations were clear and focused."</blockquote>
              <blockquote className='bg-white p-4 rounded-lg shadow-sm'>"Saved hours of prep time — perfect for engineers."</blockquote>
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className='my-12 text-center'>
          <h3 className='text-xl font-semibold mb-3'>Premium plans (coming soon)</h3>
          <p className='text-gray-500 mb-6'>Unlimited explanations, priority responses, and downloadable PDFs.</p>

          <div className='flex items-center justify-center gap-4'>
            <div className='p-6 rounded-xl border shadow-sm w-56'>
              <div className='font-bold text-lg'>Monthly</div>
              <div className='text-2xl font-extrabold mt-2'>₹129</div>
              <div className='text-sm text-gray-500 mt-2'>Billed monthly</div>
            </div>
            <div className='p-6 rounded-xl border shadow-sm w-56 bg-amber-50'>
              <div className='font-bold text-lg'>Yearly</div>
              <div className='text-2xl font-extrabold mt-2'>₹999</div>
              <div className='text-sm text-gray-500 mt-2'>Best value</div>
            </div>
          </div>
        </section>

        <div className='text-sm bg-gray-50 text-secondary text-center p-5 mt-5 rounded-md'>
          Made with ❤️ by Team Interview Prep AI
        </div>

      </div>
    </div>

    <Modal
      isOpen={openAuthModal}
      onClose = {() => {
        setOpenAuthModal(false);
        setCurrentPage("login");
      }}
      hideHeader
    >
      <div>
        {currentPage === "login" && (
          <Login setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "signup" && (
          <SignUp setCurrentPage={setCurrentPage} />
        )}
      </div>
    </Modal>

    </>
  )
}

export default LandingPage
