import { Link } from 'react-router-dom';
import Doctors from './data';

const DoctorCard = () => {
  return (
	<>
	{
		Doctors.map((doctor) => (
			<div className="col" key={doctor._id}>
				<div className="card">
					<img src={doctor.img} alt={doctor.name} className='doctor_img' />
					<div className="card-body">
						<h5 className="card-title">
							<Link to={`/doctor/${doctor._id}`}>{doctor.name}</Link>
						</h5>
						<p className="card-text">{doctor.address}</p>
						<div className="d-flex items-center justify-content-between">
							<p>{doctor.specialization}</p>
							<p>{doctor.timing}</p>
						</div>
					</div>
				</div>
			</div>
		))
	}
	</>
  )
}

export default DoctorCard;