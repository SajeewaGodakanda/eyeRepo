import React, { useEffect, useState } from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table
} from "reactstrap";
import { collection, addDoc, getDoc, doc, updateDoc,getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { useNavigate} from "react-router-dom";

function User() {
  const [mobileNo, setMobileNo] = useState('');
  const [fullName, setFullName] = useState('');
  const [identityCardNo, setIdentityCardNo] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [district, setDistrict] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const resultRef = collection(db, "patientDetails");
  const history = useNavigate();
  const [showAddPatientCard, setShowAddPatientCard] = useState(false);


  const [paientData, setPatientData] = useState([]);

  const handleDateChange = (e) => {
    // Get the date from the input
    const selectedDate = new Date(e.target.value);
    
    // Convert the date to the desired format (YYYY-MM-DD)
    const formattedDate = selectedDate.toISOString().split('T')[0];
    
    // Set the formatted date in state
    setDob(formattedDate);
  };

  const handleMobileNoChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Allow only numeric digits
    setMobileNo(input.slice(0, 10)); // Limit to 10 characters
  };
//   const isMobileNoValid = mobileNo.length === 10 && /^\d+$/.test(mobileNo);
const isMobileNoValid = (value) => {
    return /^\d{10}$/.test(value); // Checks if the value has exactly 10 digits
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  
  const isFormValid = () => {
    return (
      isMobileNoValid(mobileNo) &&
      fullName &&
      identityCardNo &&
      dob &&
      gender &&
      (email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : true)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientDetails = {
      mobileNo,
      fullName,
      identityCardNo,
      dob,
      gender,
      district,
      address,
      email,
    };

    try {
        await addDoc(resultRef, patientDetails);
        console.log("Data submitted to Firebase successfully");
        history("/");
      } catch (error) {
        console.error("Error submitting data to Firebase:", error);
        
      }
    // You can do something with the patientDetails data here, like sending it to an API
    console.log(patientDetails);
  };





  useEffect(()=>{
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "patientDetails"));
        if (!querySnapshot.empty) {
          const patientData1 = [];
          querySnapshot.forEach((doc) => {
            
            const patient = doc.data();
           patientData1.push({
            id: doc.id,
            fullName: patient.fullName,
            mobileNo: patient.mobileNo,
            identityCardNo: patient.identityCardNo,
            dob: patient.dob,
            email :patient.email,
            gender :patient.gender,
           })
           setPatientData(patientData1);
            console.log(patientData1);

          });
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchPatients();
  },[]);

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    setShowAddPatientCard(!showAddPatientCard)
    if (element) {
      console.log("Scrolling to element:", element);

      element.scrollIntoView({ behavior: "smooth" });
    }else{
      console.log("Element not found with ID:", elementId);

    }
  };


  return (
    <>
      <div className="content">
      <Row>
          <Col md="12">
            <Card>
              <CardHeader className='row'>
                <CardTitle className=' w-50' tag="h4">Users
                
                </CardTitle>
               
                    <div className="update  w-50 d-flex justify-content-end ">
                      <Button
                        className="btn-round "
                        color="primary"
                        type="submit"
                        onClick={() => {
                          
                          scrollToElement("add-patient-card"); // Replace "yourElementId" with the actual ID of the element you want to scroll to.
                        }}
                      >
                        Add new Patient
                      </Button>
                    </div>
                 
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>NIC</th>
                      <th>Telephone Number</th>
                      <th>Gender</th>
                      <th>Email</th>
                      <th>DOB</th>                      
                    </tr>
                  </thead>
                  <tbody>
                  {paientData.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.fullName}</td>
                      <td>{patient.identityCardNo}</td>
                      <td>{patient.mobileNo}</td>
                      <td >{patient.gender}</td>
                      <td >{patient.email}</td>
                      <td >{patient.dob}</td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>

        {showAddPatientCard && ( <Col md="8">
            <Card className="card-user"  id="add-patient-card">
              <CardHeader>
                <CardTitle tag="h5">Add patient</CardTitle>
                
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>

                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Full Name</label>
                        <Input                         
                          placeholder="Name"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required 
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Telephone</label>
                        <Input                          
                          placeholder="Telephone"                       
                          value={mobileNo}
                          maxLength={10}
                          onChange={(e) => setMobileNo(e.target.value)}                          
                          required
                          error={!isMobileNoValid}
                          helperText={!isMobileNoValid && 'Mobile No should be 10 numeric characters'}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>NIC</label>
                        <Input
                          placeholder="NIC"                          
                          value={identityCardNo}
                          onChange={(e) => setIdentityCardNo(e.target.value)}
                          required 
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                         
                          placeholder="Home Address"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Date of Birth</label>
                        <Input
                          defaultValue="Melbourne"
                          placeholder="Date of Birth"
                          type="date"
                          value={dob}
                          required
                          onChange={(e) => setDob(e.target.value)}                         
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Gender</label>
                        <Input   
                        style={{height:33}}                       
                          placeholder="Gender"                          
                          value={gender}
                          type="select" 
                          onChange={(e) => setGender(e.target.value)}
                          >    <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option></Input>
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Email (if available)</label>
                        <Input placeholder="Email"
                         type="email"
                         value={email || ''}
                         onChange={handleEmailChange}
                         error={email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                         helperText={ email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && 'Invalid email format'} />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>)}

         
        </Row>
      </div>
    </>
  );
}

export default User;
