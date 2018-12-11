<<<<<<< HEAD
import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return(
			<div>
			  <p className = 'f3'>
			  	{'This Magic Brain will detect faces in your pictures. Copy/Paste an Image URL to try!'}
			  </p>
			  <div className='center'>
			  	<div className='form center pa4 br3 shadow-5'>
				  <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
				  <button className='w-30 grow f4 link ph3 pv2 dib white bg-purple'
			  			  onClick={onButtonSubmit}
			  	   			> Detect
			  	   </button>
			  	</div>
			  </div>
			 </div>
		);
}

=======
import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return(
			<div>
			  <p className = 'f3'>
			  	{'This Magic Brain will detect faces in your pictures. Copy/Paste an Image URL to try!'}
			  </p>
			  <div className='center'>
			  	<div className='form center pa4 br3 shadow-5'>
				  <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
				  <button className='w-30 grow f4 link ph3 pv2 dib white bg-purple'
			  			  onClick={onButtonSubmit}
			  	   			> Detect
			  	   </button>
			  	</div>
			  </div>
			 </div>
		);
}

>>>>>>> 0f84faf2b8d300bea04e8246101f22c77634ca23
export default ImageLinkForm;