/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const DoctorCard = (props) => {
	const { name, specialization, _id } = props.doctor;
  return (
	<>
		<div className="card">
			<div className="card-body">
				<Link to={`/doctor/${_id}`}>
					<h5 className="card-title">{name}</h5>
				</Link>
			</div>
		</div>
	</>
  )
}

export default DoctorCard;