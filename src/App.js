import React from 'react';
import CSVReader from 'react-csv-reader';

class App extends React.Component {
   constructor() {
      super();
      // 1. bot scrapes web data
      // 2. bot saves data as csv to desktop
      // 3. bot navigates to website (this, hosted on github(?))
      // 4. bot uploads csv
      // 5. You get to see data about courses
    
      this.state = {
         courses: []
      }
   }
   handleFile = csv => {
    this.setState({courses: csv});
    // delete that random empty element in array
    this.setState((prevState, props) => {
      return prevState.courses.pop();
    })
   }

   render() {
      return (
         <div>
          <h1 id= "head">Course Data</h1>
          <p className="intro">Select CSV with course data</p>
          <div className = "intro">
          <CSVReader
            cssClass="csv-reader-input"
            onFileLoaded={this.handleFile}
            onError={this.handleDarkSideForce}
            inputId="courseData"
            inputStyle={{color: 'red'}}
            />
          </div>
          
           <div className="courseContainer">
             {this.state.courses.map((courseData, i) => <Course 
               key = {i} data = {courseData}/>)}
           </div>
         </div>
      );
   }
}

class Course extends React.Component {
   render() {
    let ratingDiv;
    if (this.props.data[5]) {
      ratingDiv = <div className="rating" >rmp
      <div className = "mainRating"> {this.props.data[5]} </div>
      <div className="diff"> difficulty: {this.props.data[6]}</div>
      </div>
    } else {
      ratingDiv = <div className="rating">Recitation</div>
    }
      return (
         <div className="course">
            <div className="courseTitle" id="spaceTitle"> {this.props.data[0]} {this.props.data[1]} - {this.props.data[2]} </div>
            <div className="teacher"> Prof. {this.props.data[4]} </div>
            
             {ratingDiv}

            <div className="days"> meetings: {this.props.data[3]}</div>
            <div className="time"> {this.props.data[7]} </div>
          
         </div>
      );
   }
}

export default App;
