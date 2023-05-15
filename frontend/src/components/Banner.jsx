import { Carousel } from 'antd';
import '../styles/Home.css';

const Banner = () => {
	return (
		<Carousel autoplay>
			<div className='banner'>
				<img src="https://medicoz.themechampion.com/lst/wp-content/uploads/2021/01/slide-2-1.jpg" alt="banner" />
				<div className="banner-text">
					<p>We Make our</p>
					<h3>Patients lives better</h3>
				</div>
			</div>
			<div className='banner'>
				<img src="https://medicoz.themechampion.com/lst/wp-content/uploads/2021/01/slider-1.png" alt="banner" />
				<div className="banner-text">
					<p>Personal care for</p>
					<h3>Your healthy living</h3>
				</div>
			</div>
		</Carousel>
	);
};
export default Banner;