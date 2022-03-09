import './App.css';
//import home from './pages/home';
import './styles/buttons.css';
import './styles/footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bannerimg from '../src/images/banner-img.png';
import logoBestest from '../src/images/logoBestest.png';
import parentPic from '../src/images/parent.png';
import teacherPic from '../src/images/teacher.png';
import kidPic from '../src/images/kid.png';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';
 

function App() {
  return (


   
  
   <div className="App" >
     <h3 className="title">
             WHATEVER THE PROBLEM BE PART OF
            </h3>
            
            <div >
              <img src ={logoBestest} />
            <img src={bannerimg} alt="hero banner" />
            </div>

            <br/><br/><br/>
            <center>
            <h1 className="title">
             Tell us who you are !
            </h1><br/><br/>
            <div className='bg-image' style={{ maxWidth: '28rem' }}>
        
        <img src={teacherPic} className='w-100' />
        <div
          className='mask'
          style={{
            background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)',
          }}
        >
          <div className='d-flex justify-content-center align-items-center h-100'>
                    <a class="btn btn-lg" href="#">
                        <span>Teacher</span>
                    </a>
                </div>   
          </div>
      </div>
                <br/><br/>


                      <div className='bg-image' style={{ maxWidth: '28rem' }}>
        
        <img src={kidPic} className='w-100' />
        <div
          className='mask'
          style={{
            background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)',   
          }}
        >
          <div className='d-flex justify-content-center align-items-center h-100'>
                    <a class="btn btn-lg" href="#">
                        <span>Kid</span>
                    </a>
                </div>   
          </div>
      </div>


                <br/><br/>
                <div className='bg-image' style={{ maxWidth: '28rem' }}>
        
        <img src={parentPic} className='w-100' />
        <div
          className='mask'
          style={{
            background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%)',
          }}
        >
          <div className='d-flex justify-content-center align-items-center h-100'>
                    <a class="btn btn-lg" href="#">
                        <span>Parent</span>
                    </a>
                </div>   
          </div>
      </div>    
                </center>  
                <div>




    </div>
                <MDBFooter  className='text-center text-lg-left'>
      <MDBContainer className='p-1'>
        <MDBRow>
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'><strong>Our project</strong></h5>

            <p>
            Welcome to BesTest web application dedicated for kids in El Fekir school currently enrolling between the 3rd and 6th primary grade in which they will be able to consult the list of lessons, exams and exercises provided by their teachers and also get involved in activities that pushes them to invest more in the application by providing them with fun side activities and getting rewarded with score points along the way depending on their state of completion of activities that will allow them to unlock more themes and more exciting activities. 
The teacher will also have the opportunity to organize online catch-up sessions by hosting real time video calls with their students.
The parent will also have the ability to organize private catch-up sessions for his kids in our site.

            </p>
          </MDBCol>

          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'><strong>About Us</strong></h5>

            <p>
              We are a group of future engineers currently enrolling in ESPRIT who are fond of web development and we are happy to introduce to you
              this application that we thought would be very beneficial for future generations in their education and providing their parents 
              with more interesting opportunities to follow their kids progress.
              We hope you enjoy our application and thank you in advance for your support.
              <br/>
              Cool as Code.
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='#'>
          Cool As Code Group
        </a>
      </div>
    </MDBFooter>

             </div>  
  );
}

export default App;
