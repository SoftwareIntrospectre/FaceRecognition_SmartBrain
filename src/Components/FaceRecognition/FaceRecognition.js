<<<<<<< HEAD
import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, box}) => {
	return(
			<div className = 'center ma'>
				<div className ='absolute mt2'>
					<img id ='inputimage' alt='' src={imageURL} width='500px' height='auto' />
					<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
				</div>
			</div>
		);
}


=======
import React from 'react';

const FaceRecognition = ({imageURL}) => {
	return(
			<div className = 'center ma'>
				<div className ='absolute mt2'>
					<img alt='' src={imageURL} width='500px' height='auto' />
				</div>
			</div>
		);
}


>>>>>>> 0f84faf2b8d300bea04e8246101f22c77634ca23
export default FaceRecognition;