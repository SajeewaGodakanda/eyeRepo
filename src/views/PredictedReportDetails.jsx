import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { useNavigate } from "react-router-dom";

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

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PatientDetailsForReport from "./Subcomponents/PatientDetailsForReport.jsx";

const PredictedReportDetails = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [paientData, setPatientData] = useState(null);
  const [doctorAceptenceStatus, setDoctorAceptenceStatus] = useState("accept");
  const [doctorDiagnosis, setDoctorDiagnosis] = useState("");
  const [doctorComment, setDoctorComment] = useState("");
  const history = useNavigate();

  // notifi
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    console.log(id);
    const fetchReport = async () => {
      try {
        const reportRef = doc(db, "predictions", id);
        const reportDoc = await getDoc(reportRef);

        console.log("firebase running 1");

        // const docRef = doc(db, "reports", id);

        // const docSnap = await getDoc(reportRef);

        if (reportDoc.exists) {
          setReport(reportDoc.data());
          fetchPatien(reportDoc.data().pationID);
          setDoctorDiagnosis(reportDoc.data().results.top);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchReport();
    const url = `https://quickchart.io/qr?text=https%3A%2F%2Ftestreactapplication1.azurewebsites.net%2F%23%2F${id}`;
    setImageUrl(url);
  }, [id]);

  const doctorsChoiceSelecter = (event, newCondition) => {
    setDoctorAceptenceStatus(newCondition);
    console.log("doctor " + newCondition + "ed");
  };

  const fetchPatien = async (id) => {
    const docRef = doc(db, "patientDetails", id);
    const docSnap = await getDoc(docRef);
    console.log("firebase running 2");

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setPatientData(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  if (!report) {
    return <h1>Loading...</h1>;
  }

  const submit = async () => {
    console.log("diagnosis: " + doctorDiagnosis);
    console.log("comment: " + doctorComment);
    console.log("status: " + doctorAceptenceStatus);

    const updateData = {
      staus: doctorAceptenceStatus,
      comment: doctorComment,
      doctorDiagnosis: doctorDiagnosis,
    };
    const resultRef = collection(db, "predictions");
    const docRef = doc(resultRef, id);

    try {
      await updateDoc(docRef, updateData);

      console.log("Document updated successfully with a new field");
      setSnackbarMessage("Document Released successfully");
      setOpenSnackbar(true);
      setTimeout(() => {
        history("/admin/dashboard"); // Replace with your actual dashboard route
      }, 1000);
      // history("/admin/dashboard");
    } catch (error) {
      console.error("Error updating document:", error);
      setSnackbarMessage("Error updating document");
      setOpenSnackbar(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="demo-icons">
              <CardHeader>
                <CardTitle tag="h5">Diagnosis</CardTitle>
              </CardHeader>
              <CardBody className="all-icons">
                <div id="icons-wrapper">
                  {" "}
                  <Row>
                    <Col md="4">
                      <Card className="card-user border shadow-lg">
                        <CardHeader>
                          <CardTitle tag="h5">Scanned Image</CardTitle>
                        </CardHeader>

                        <CardBody>
                          <div className="authorx">
                            <img alt="..." src={report.image_url} />

                            <div className="row mt-3 ">
                              <p className="col col-lg-5  ">Results</p>
                              <p className="col-md-auto ">:</p>
                              <p className=" col col-lg-5 ">
                                {report.results.top}
                              </p>
                            </div>
                            <div className="row">
                              <p className=" col col-lg-5 ">Scanned Date</p>
                              <p className="col-md-auto ">:</p>
                              <p className=" col col-lg-3 ">{report.date}</p>
                            </div>
                            <div className="row">
                              <p className=" col col-lg-5 ">Modal Confidance</p>
                              <p className="col-md-auto ">:</p>
                              <p className=" col col-lg-3 ">
                                {(report.results.confidence * 100).toFixed(2)}%
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>

                    {/* details */}
                    <Col md="8">
                      <Card className="card-user shadow-lg">
                        <CardHeader>
                          <CardTitle tag="h5">Patient Details</CardTitle>
                        </CardHeader>

                        <CardBody>
                          <Form>
                            {paientData && (
                              <div>
                                <Row>
                                  <Col>
                                    <FormGroup className="row ">
                                      <label
                                        className=" mt-2"
                                        style={{
                                          minWidth: "20px",
                                          maxWidth: "95px",
                                        }}
                                      >
                                        Full Name :
                                      </label>
                                      <Input
                                        className="w-75"
                                        value={paientData.fullName}
                                        disabled
                                        placeholder={paientData.gender}
                                        type="text"
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col>
                                    <FormGroup className="row ">
                                      <label
                                        className=" mt-2"
                                        style={{
                                          minWidth: "20px",
                                          maxWidth: "95px",
                                        }}
                                      >
                                        Gender :
                                      </label>
                                      <Input
                                        className=" w-75"
                                        value={paientData.gender}
                                        disabled
                                        type="text"
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>
                                    <FormGroup className="row ">
                                      <label
                                        className=" mt-2"
                                        style={{
                                          minWidth: "20px",
                                          maxWidth: "95px",
                                        }}
                                      >
                                        NIC :
                                      </label>
                                      <Input
                                        className="w-75"
                                        value={paientData.identityCardNo}
                                        disabled
                                        type="text"
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col>
                                    <FormGroup className="row ">
                                      <label
                                        className=" mt-2"
                                        style={{
                                          minWidth: "20px",
                                          maxWidth: "95px",
                                        }}
                                      >
                                        Mobile No :
                                      </label>
                                      <Input
                                        className=" w-75"
                                        value={paientData.mobileNo}
                                        disabled
                                        type="text"
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </div>
                            )}
                            <CardHeader>
                              <CardTitle tag="h5">Diagnostic Details</CardTitle>
                            </CardHeader>
                            {report && (
                              <div>
                                <Row>
                                  <div>
                                    <ToggleButtonGroup
                                      value={doctorAceptenceStatus}
                                      exclusive
                                      onChange={doctorsChoiceSelecter}
                                      sx={{ mt: 2 }}
                                    >
                                      <ToggleButton value="accept">
                                        Accept
                                      </ToggleButton>
                                      <ToggleButton value="decline">
                                        Decline
                                      </ToggleButton>
                                    </ToggleButtonGroup>
                                  </div>
                                </Row>
                                <Row>
                                  <Col className="pr-1" md="6">
                                    <FormGroup>
                                      <label>Diagnostic Result</label>
                                      <Input
                                        value={doctorDiagnosis}
                                        defaultValue="Chet"
                                        placeholder="Company"
                                        disabled={
                                          doctorAceptenceStatus == "accept"
                                        }
                                        type="text"
                                        onChange={(e) =>
                                          setDoctorDiagnosis(e.target.value)
                                        }
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col className="pl-1" md="6">
                                    <FormGroup>
                                      <label>Scanned Date</label>
                                      <Input
                                        value={report.date}
                                        placeholder="Last Name"
                                        type="text"
                                        disabled
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="12">
                                    <FormGroup>
                                      <label>Comment</label>
                                      <Input
                                        type="textarea"
                                        // defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                                        onChange={(e) =>
                                          setDoctorComment(e.target.value)
                                        }
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <div className="update ml-auto mr-auto">
                                    <Button
                                      className="btn-round"
                                      color="primary"
                                      onClick={submit}
                                    >
                                      Release To Patient
                                    </Button>
                                    <Snackbar
                                      open={openSnackbar}
                                      autoHideDuration={6000}
                                      onClose={handleCloseSnackbar}
                                      anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                      }}
                                    >
                                      <MuiAlert
                                        onClose={handleCloseSnackbar}
                                        severity={
                                          snackbarMessage.includes(
                                            "successfully"
                                          )
                                            ? "success"
                                            : "error"
                                        }
                                        sx={{ width: "100%" }}
                                      >
                                        {snackbarMessage}
                                      </MuiAlert>
                                    </Snackbar>
                                  </div>
                                </Row>
                              </div>
                            )}
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PredictedReportDetails;
