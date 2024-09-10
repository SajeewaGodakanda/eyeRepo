import React, { useState, useEffect } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { useNavigate } from "react-router-dom";

const PatientDetailsForReport = () => {
  //   const [patientDetails, setPatientDetails] = useState({});
  //   const [previousScans, setPreviousScans] = useState([]);
  const documentId = sessionStorage.getItem("documentId");
  //     const documentId= 'ojgXLHDHXRWLjDXhEypk';
  const [patientDetails, setPatientDetails] = useState(null);

  const resultRef = collection(db, "patientDetails");
  const history = useNavigate();
  // const documentId= 'ojgXLHDHXRWLjDXhEypk';

  useEffect(() => {
    const fetchData = async () => {
      //   const docRef = doc(db, "patientDetails", documentId);
      const docRef = doc(db, "patientDetails", documentId);
      const docSnap = await getDoc(docRef);
      //   const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPatientDetails(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    if (sessionStorage.getItem("documentId")) {
      console.log("okay");
      fetchData();
    } else {
      history("/");
    }

    // fetchData();
  }, []);
  return (
    <div>
      <div className="card rounded-3">
        {patientDetails && (
          <div style={{ width: "27rem" }} className="row  mx-3 mb-4 mt-4 mx-2">
            <div className=" row mb-2">
              <div className="col-sm ">Patient Name :</div>
              <div className="col-sm ">{patientDetails.fullName}</div>
            </div>

            <div className=" row mb-2">
              <div className="col-sm ">Telephone Number :</div>
              <div className="col-sm ">{patientDetails.mobileNo}</div>
            </div>

            <div className=" row mb-2">
              <div className="col-sm ">NIC Number :</div>
              <div className="col-sm ">{patientDetails.identityCardNo}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetailsForReport;
