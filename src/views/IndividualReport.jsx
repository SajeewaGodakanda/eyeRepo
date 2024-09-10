import React, { useState, useEffect } from "react";
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig.js";
import "./cstyles.css";
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
  Table,
} from "reactstrap";

const IndividualReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [paientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qr, setQr] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);
  const [isPdfReady, setIspdfReady] = useState(true);

  useEffect(() => {
    if (id) {
      fetchReport();
    }
  }, [id]);

  const fetchReport = async () => {
    console.log("rendering fetch reports");
    const url = `https://quickchart.io/qr?text=https%3A%2F%2Foculartechqr.azurewebsites.net%2F%23%2F${id}`;
    setQr(url);
    try {
      const reportRef = doc(db, "predictions", id);
      const reportDoc = await getDoc(reportRef);

      if (reportDoc.exists()) {
        setReport(reportDoc.data());
        fetchPatient(reportDoc.data().pationID);
        setLoading(false);
        if (reportDoc.data().pdf) {
          setIspdfReady(true);
        }
      } else {
        setError("No such report document");
        setLoading(false);
      }
    } catch (error) {
      setError(`Error fetching report document: ${error.message}`);
      setLoading(false);
    }
  };

  const fetchPatient = async (pationID) => {
    const docRef = doc(db, "patientDetails", pationID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPatientData(docSnap.data());
    }
  };

  const FirebasePfdUploader = async () => {
    console.log("pdf pdf");
    if (report.pdf) {
      console.log("pdf thiynawa");
      window.open(report.pdf, "_blank");
    } else if (downloadURL) {
      console.log("pdf thiynawa");
      window.open(downloadURL, "_blank");
    } else {
      console.log("pdf na");
      setIspdfReady(false);
      const pdfBlob = await fetchPDF();

      if (pdfBlob) {
        // const reportID = yourRequestBody.report.reportID; // Replace 'yourRequestBody' with your actual JSON data
        await uploadPDFToFirestore(pdfBlob, id);
      } else {
        console.error("PDF download failed.");
      }
    }
  };

  const fetchPDF = async () => {
    try {
      const response = await fetch("http://localhost:5293/api/Report/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paientData: {
            fullName: paientData.fullName,
            mobileNo: paientData.mobileNo,
            identityCardNo: paientData.identityCardNo,
            dob: paientData.dob,
            gender: paientData.gender,
            email: paientData.email,
            district: paientData.district,
            address: paientData.address,
          },
          report: {
            reportID: id,
            qr: qr,
            img_url: report.image_url,
            scan_date: report.date,
            result: report.doctorDiagnosis,
            doctor_comment: report.comment,
          },
        }), // Replace 'yourRequestBody' with your actual JSON data
      });

      if (response.ok) {
        const blob = await response.blob();
        console.log("ok");
        return blob;
      } else {
        console.error(
          "Failed to fetch PDF:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const uploadPDFToFirestore = async (pdfBlob, reportID) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `pdfs/${reportID}.pdf`);
      await uploadBytes(storageRef, pdfBlob);
      console.log("PDF uploaded to Firestore successfully.");

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      setDownloadURL(downloadURL);
      console.log(downloadURL);
      updateReport(downloadURL, id);
    } catch (error) {
      console.error("Failed to upload PDF to Firestore:", error);
    }
  };

  const updateReport = async (pdfUrl, reportID) => {
    const updateData = {
      pdf: pdfUrl,
    };
    const resultRef = collection(db, "predictions");
    const docRef = doc(resultRef, reportID);
    try {
      await updateDoc(docRef, updateData);
      console.log("Document updated successfully with a new field");
      window.open(pdfUrl, "_blank");
      setIspdfReady(true);
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  return (
    <div className="content">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {report && paientData && (
        <Row>
          <Col md="12">
            <Card className="demo-icons">
              <CardHeader>
                <CardTitle tag="h5">Diagnostic Report</CardTitle>
              </CardHeader>

              <CardBody>
                <div className="row ">
                  <div className=" col-lg-6 justify-content-around">
                    <Card className="shadow-lg col-lg-12">
                      <CardBody>
                        <div className="author">
                          <div className="row">
                            <p className=" col col-lg-3 ">Full Name</p>
                            <p className="col-md-auto ">:</p>
                            <p className=" col col-lg-5 ">
                              {paientData.fullName}
                            </p>
                          </div>

                          <div className="row">
                            <p className=" col col-lg-3 ">Mobile No</p>
                            <p className="col-md-auto ">:</p>
                            <p className=" col col-lg-5 ">
                              {paientData.mobileNo}
                            </p>
                          </div>
                          <div className="row">
                            <p className=" col col-lg-3 ">NIC</p>
                            <p className="col-md-auto ">:</p>
                            <p className=" col col-lg-5 ">
                              {paientData.identityCardNo}
                            </p>
                          </div>
                          <div className="row">
                            <p className=" col col-lg-3 ">Date Of Birth</p>
                            <p className="col-md-auto ">:</p>
                            <p className=" col col-lg-5 ">{paientData.dob}</p>
                          </div>

                          <div className="row">
                            <p className=" col col-lg-3 ">Gender </p>
                            <p className="col-md-auto ">:</p>
                            <p className=" col col-lg-5 ">
                              {paientData.gender}
                            </p>
                          </div>

                          <div className="row">
                            <p className=" col col-lg-3 ">E mail </p>
                            <p className="col-md-auto ">:</p>
                            <p className=" col col-lg-5 ">{paientData.email}</p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="shadow-lg col-lg-12">
                      <CardBody>
                        <div className="authorx">
                          <div className="row">
                            <p className=" col col-lg-4 ">Result</p>
                            <p className="col-md-auto ">:</p>
                            <p className=" col col-lg-5 ">
                              {report.doctorDiagnosis}
                            </p>
                          </div>

                          <div className="row">
                            <p className=" col col-lg-4 ">Scanned Date</p>
                            <p className="col-md-auto ">:</p>
                            <p className=" col col-lg-5 ">{report.date}</p>
                          </div>

                          <div className="row">
                            <p className=" col col-lg-4 ">Comment</p>
                            <p className="col-md-auto ">:</p>
                            <p className=" col col-lg-5 ">{report.comment}</p>
                          </div>

                          <div className="row">
                            <p className=" col col-lg-4 ">QR</p>
                            <p className="col-md-auto ">:</p>
                            <p className=" col col-lg-5 ">
                              <img
                                style={{ height: 125, width: 125 }}
                                alt="..."
                                src={qr}
                              />
                            </p>
                          </div>
                          <Button
                            className="w-50 mx-auto btn btn-success"
                            onClick={FirebasePfdUploader}
                            disabled={!isPdfReady}
                          >
                            {isPdfReady ? "Print Report" : "PDF Getting Ready"}
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  <div className=" col-lg-6 ">
                    <div className="col col-lg-50 ">
                      <Card className="shadow-lg">
                        <CardHeader className="">
                          <CardTitle tag="h5">Scanned Image</CardTitle>
                        </CardHeader>

                        <CardBody className="row justify-content-md-center">
                          <div className="scanned-image">
                            <img alt="..." src={report.image_url} />
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardBody>
              {/* <div className="row justify-content p-3">
                <div className="col col-lg-6">
                  <Card className="border">
                    <CardHeader className="">
                      <CardTitle tag="h5">Scanned Image</CardTitle>
                    </CardHeader>

                    <CardBody className="row justify-content-md-center">
                      <div className="scanned-image">
                        <img alt="..." src={report.image_url} />
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div> */}
            </Card>
          </Col>
          {/* <Button onClick={FirebasePfdUploader}>
                      Proceed
                    </Button> */}
        </Row>
      )}
    </div>
  );
};

export default IndividualReport;
