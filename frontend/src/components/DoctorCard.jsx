/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { Col } from 'antd';

const DoctorCard = (props) => {
	const { name, specialization, _id, image } = props.doctor;
  return (
	<div className='col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4'>
		<div className="card doctorCard">
			<div className="card-body">
				<img src={image} alt={name} />
				<Link to={`/doctor/${_id}`}>
					<h5 className="card-title mt-3">Dr. {name}</h5>
				</Link>
				<p>{specialization} Specialist</p>
			</div>
		</div>
	</div>
  )
}

export default DoctorCard;