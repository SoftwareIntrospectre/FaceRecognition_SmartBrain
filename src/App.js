import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';

//configuring facial recognition API key
const app = new Clarifai.App({
 apiKey: 'a86682b87c8741f8a9245eb37d0d4dff'
});


const particlesOptions = {
  particles: {
    value: 30,
    density: {
      enable: true,
      value_area: 800
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      //keeps track of where user is on the webpage
      route: 'signin',
    }
  }

  calculateFaceLocation = (data) => {
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);
   return{
    //percentages
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
   }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box: box});
  }

      imageURL: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    }

  onButtonSubmit = () =>{
    this.setState({imageURL: this.state.input});

    app.models.predict(
     Clarifai.FACE_DETECT_MODEL
      , this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
      .then(
        function(response) {
          // do something with response
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err) {
          // there was an error
        }
  );
  }

  render() {
    return (
      <div className="App">
      <Particles className='particles'
        params={particlesOptions}/>
      <Navigation />
      
      { //conditional statement. If state is 'SignIn', then use SignIn component, else do everything else
        this.state.route === 'signin' ?
          <SignIn />
          : <div>
              <Logo />
              <Rank />
              <ImageLinkForm  onInputChange = {this.onInputChange} 
                            onButtonSubmit={this.onButtonSubmit} /> 
              <FaceRecognition box ={this.state.box} imageURL={this.state.imageURL}/>
            </div>
      }
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange = {this.onInputChange} 
                     onButtonSubmit={this.onButtonSubmit} /> 
      <FaceRecognition imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
