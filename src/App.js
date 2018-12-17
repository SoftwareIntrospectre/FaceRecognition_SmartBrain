import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
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
      isSignedIn: false
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
    //console.log(box);
    this.setState({box: box});
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
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }

    this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageURL, route, box} = this.state
    return (
      <div className="App">
      <Particles className='particles'
        params={particlesOptions}
        />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      
      { //conditional statement. If state is 'home', show the Home screen
        this.state.route === 'home' 
        ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm  onInputChange = {this.onInputChange} 
                            onButtonSubmit={this.onButtonSubmit} /> 
              <FaceRecognition box ={box} imageURL={this.state.imageURL}/>
            </div>

          //else if state is 'signin', show the Sign In screen
          : (
              route === 'signin'
            
         ? <SignIn onRouteChange={this.onRouteChange} />

         //else show the 'register' screen
         : <Register onRouteChange = {this.onRouteChange}/>
         )
      }
      </div>
    );
  }
}

export default App;
