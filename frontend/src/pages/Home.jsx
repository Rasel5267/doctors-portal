import DoctorCard from '../components/DoctorCard';

const Home = () => {

  return (
    <div className='home'>
      <h2 className='text-center mt-5'>Our Doctor&rsquo;s</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 py-5">
        <DoctorCard />
      </div>
    </div>
  )
}

export default Home;