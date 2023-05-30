import { Carousel } from "antd";
import "../styles/Home.css";

const Banner = () => {
	return (
		<Carousel autoplay>
			<div className="banner">
				<img src="" alt="banner" />
				<div className="banner-text">
					<p>We Make our</p>
					<h3>Patients lives better</h3>
				</div>
			</div>
			<div className="banner">
				<img src="" alt="banner" />
				<div className="banner-text">
					<p>Personal care for</p>
					<h3>Your healthy living</h3>
				</div>
			</div>
		</Carousel>
	);
};
export default Banner;
