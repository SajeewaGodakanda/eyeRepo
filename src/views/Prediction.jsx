import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  getDocs,
  addDoc,
} from "firebase/firestore"; // Make sure to import the appropriate Firestore functions
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebaseConfig.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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
} from "reactstrap";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import "./cstyles.css";

function dataURLtoBlob(dataURL) {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const Prediction = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [documentId, setDocumentId] = useState(null);
  const history = useNavigate();
  const [paientData, setPatientData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [priviewImage, setPriviewImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [rawPredictionResult, setRawPredictionResult] = useState(null);
  const [currentTimestamp, setCurrentTimestamp] = useState(moment());
  const [dcommet, setDcommnet] = useState("");
  const resultRef = collection(db, "predictions");

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (documentId) {
      getPatientDetails();
    }
  }, [documentId]);

  const getPatientDetails = async () => {
    const docRef = doc(db, "patientDetails", documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setPatientData(docSnap.data());
    } else {
      console.log("No Patient data document!");
    }
  };

  const handleImageChange = (e) => {
    console.log("error : 404");
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      console.log(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        setPriviewImage(null);
        setPredictionResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConditionChange = (event, newCondition) => {
    setSelectedCondition(newCondition);
    console.log(newCondition + " mode selected");
  };

  const handleSearch = async () => {
    if (phoneNumber) {
      const q = query(
        collection(db, "patientDetails"),
        where("mobileNo", "==", phoneNumber)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const document = querySnapshot.docs[0];
        setDocumentId(document.id);
        await sessionStorage.setItem("documentId", document.id);

        // history("/patient");
        // history("/admin/prediction");
      } else {
        // setDocumentId("Document not found");
        // sessionStorage.removeItem("documentId");
        setSnackbarMessage("Patient is not registerd, Please Register");
        setOpenSnackbar(true);
        setTimeout(() => {
          history("/admin/user-page"); // Replace with your actual dashboard route
        }, 3000);
      }
    }
  };

  // const predictImagesWithAzureBackend = async (url, type) => {
  //   if (selectedImage) {
  //     setUploading(true);
  //     const formData = new FormData();
  //     formData.append('image', dataURLtoBlob(selectedImage)); 


  //     console.log("stared prediction with " + selectedCondition + " selected.");
  //     axios.post(url, formData)
  //     // axios({
  //     //   method: "POST",
  //     //   url: url,
  //     //   params: {
  //     //     api_key: apiKey,
  //     //   },
  //     //   data: selectedImage,
  //     //   headers: {
  //     //     "Content-Type": "application/x-www-form-urlencoded",
  //     //   },
  //     // })
  //       .then(function (response) {
  //         console.log(response.data);
  //         setRawPredictionResult(response.data);
  //         if (type == "m") {
  //           setPredictionResult({
  //             top: findClass(response.data.predicted_classes),
  //             confidence: findHighestConfidence(response.data.predictions),
  //           });
  //         } else {
  //           // setPredictionResult(response.data);
  //           if (response.data.top == "Preprocessed_cataract") {
  //             setPredictionResult({
  //               top: "Cataract Positive",
  //               confidence: response.data.confidence,
  //             });
  //           } else if (response.data.top == "Preprocessed_normal") {
  //             setPredictionResult({
  //               top: "Cataract Negative",
  //               confidence: response.data.confidence,
  //             });
  //           } else if (response.data.top == "Glaucoma") {
  //             setPredictionResult({
  //               top: "Glaucoma Positive",
  //               confidence: response.data.confidence,
  //             });
  //           } else if (response.data.top == "NonGlaucoma") {
  //             setPredictionResult({
  //               top: "Glaucoma Negative",
  //               confidence: response.data.confidence,
  //             });
  //           } else if (response.data.top == "dr") {
  //             setPredictionResult({
  //               top: "Diabetes Retinopathy Positive",
  //               confidence: response.data.confidence,
  //             });
  //           } else if (response.data.top == "no-dr") {
  //             setPredictionResult({
  //               top: "Diabetes Retinopathy Negative",
  //               confidence: response.data.confidence,
  //             });
  //           } else {
  //             setPredictionResult({
  //               top: response.data.top,
  //               confidence: response.data.confidence,
  //             });
  //           }
  //           // setPredictionResult({
  //           //   top: response.data.top,
  //           //   confidence: response.data.confidence,
  //           // });
  //         }
  //         setPriviewImage(selectedImage);
  //         setUploading(false);
  //         setSelectedImage(null);
  //       })
  //       .catch(function (error) {
  //         console.log("prediction is unsuccessfull with error : " + error);
  //         setUploading(false);
  //       });
  //   }
  // };

  // Roboflow Prediction Code
// }
const predictImagesWithRoboflow = async (url, apiKey, type)=>{
    if (selectedImage){
        setUploading(true);
        console.log ("stared prediction with "+ selectedCondition+" selected.");
        axios({
            method: "POST",
            url: url,
            params: {
                api_key: apiKey
            },
            data: selectedImage,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then (function (response){
            console.log(response.data);
            setRawPredictionResult(response.data);
            if (type =="m"){
                setPredictionResult(
                    {"top": findClass(response.data.predicted_classes),
                    "confidence":findHighestConfidence(response.data.predictions) }
                );
            }else{
                // setPredictionResult(response.data);
                setPredictionResult(
                    {"top": response.data.top,
                    "confidence":response.data.confidence }
                );
            }
            setPriviewImage(selectedImage);
            setUploading(false);
            setSelectedImage(null);
        }).catch(function(error){
            console.log("prediction is unsuccessfull with error : " + error);
            setUploading(false);
        })
    }

};


const PredicImageFunctionSelecter = () =>{
  if (selectedCondition == "auto"){
    predictImagesWithRoboflow("https://classify.roboflow.com/diabetes-eye/1","0T0aK7Xjd9yIzFwoaeXP","m")
  } else if (selectedCondition == "Glaucoma"){
    predictImagesWithRoboflow("https://classify.roboflow.com/glaucoma-detection-yinkv/1","5C7iBYDUnNm6VVwqY7t1","s")
  }else if (selectedCondition == "Cataract"){
    predictImagesWithRoboflow("https://classify.roboflow.com/cataract-classification-thmfz/4","DLxfzIwIH2SKWI74qxdY","s")
  }else if (selectedCondition == "DME"){
    predictImagesWithRoboflow("https://detect.roboflow.com/retinal-classifaction/1","LNJN6fBuYKJvibYHYDg5","s")
  }else if (selectedCondition == "DR"){
    predictImagesWithRoboflow("https://classify.roboflow.com/diabetic-retinopathy-vx084/1","vCVdDSLxRqd2Grqzl1bO","s")
  }else{
    console.log ("wrong selection with: "+ selectedCondition)
  }
  // const PredicImageFunctionSelecter = () => {
  //   if (selectedCondition == "Glaucoma") {
  //     predictImagesWithRoboflow();
  //     // predictImagesWithAzureBackend(
  //     //   // "https://reseachbackend.azurewebsites.net/predict/glaucoma", "s"
  //     // );
  //   } else if (selectedCondition == "Cataract") {
  //     predictImagesWithAzureBackend(
  //       "https://reseachbackend.azurewebsites.net/predict/cataract", "s"
  //     );
  //   } else if (selectedCondition == "DME") {
  //     predictImagesWithAzureBackend(
  //       "https://reseachbackend.azurewebsites.net/predict/dme", "s"
  //     );
  //   } else if (selectedCondition == "DR") {
  //     predictImagesWithAzureBackend(
  //       "https://reseachbackend.azurewebsites.net/predict/dr", "s"
  //     );
  //   } else {
  //     console.log("wrong selection with: " + selectedCondition);
  //   }
  };

  // 
  const findHighestConfidence = (predictions) => {
    let highestConfidence = 0;
    if (selectedCondition === "DME") {
      // Only return confidence for the "WET" class
      highestConfidence = predictions["WET"] ? predictions["WET"].confidence : 0;
    } else {
      // For other conditions, find the highest confidence across all classes
      for (const key in predictions) {
        if (predictions[key].confidence > highestConfidence) {
          highestConfidence = predictions[key].confidence;
        }
      }
    }
    return highestConfidence;
  };

  const FirebaseImageUploader = async () => {
    const upoloadingimage = priviewImage;
    const storage = getStorage();
    if (upoloadingimage) {
      try {
        const storageRef = ref(storage, `images/${uuidv4() + "_" + fileName}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          dataURLtoBlob(upoloadingimage)
        );

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                console.log("File uploaded successfully");
                console.log(url);
                firebaesDocumentUpload(url);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("no image is selected");
    }
  };

  const firebaesDocumentUpload = async (imageUrl) => {
    console.log("firebase document upload started.");
    try {
      const submitData = {
        date: currentTimestamp.format("YYYY-MM-DD"),
        pationID: documentId,
        results: predictionResult,
        image_url: imageUrl,
        rawData: rawPredictionResult,
        comment: dcommet,
        type: selectedCondition,
        staus: "pending",
      };
      const docRef = await addDoc(resultRef, submitData);
      const newDocId = docRef.id;
      console.log(submitData);
      console.log("Data submitted to Firebase successfully");
      console.log("Newly added document ID:", newDocId);
      setSnackbarMessage("Report Proceeded successfully");
      setOpenSnackbar(true);
      setTimeout(() => {
        history("/admin/dashboard"); // Replace with your actual dashboard route
      }, 1000);
    } catch (error) {
      console.error("Error submitting data to Firebase:", error);
    }
  };

  return (
    <>
      <div className="content">
        {documentId ? (
          <Row>
            {" "}
            {/* form and patient dtl */}
            <Col md="7">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Patient Info</CardTitle>
                </CardHeader>
                <CardBody className=" col-md-10 mx-4">
                  <div className="">
                    <div className="row">
                      <p className=" col col-lg-3 ">Full Name</p>
                      <p className="col-md-auto ">:</p>
                      <p className=" col col-lg-5 ">{paientData.fullName}</p>
                    </div>

                    <div className="row">
                      <p className=" col col-lg-3 ">Gender </p>
                      <p className="col-md-auto ">:</p>
                      <p className=" col col-lg-5 ">{paientData.gender}</p>
                    </div>

                    <div className="row">
                      <p className=" col col-lg-3 ">Mobile No</p>
                      <p className="col-md-auto ">:</p>
                      <p className=" col col-lg-5 ">{paientData.mobileNo}</p>
                    </div>
                    <div className="row">
                      <p className=" col col-lg-3 ">NIC</p>
                      <p className="col-md-auto ">:</p>
                      <p className=" col col-lg-5 ">
                        {paientData.identityCardNo}
                      </p>
                    </div>
                  </div>
                </CardBody>
                <CardHeader>
                  <CardTitle tag="h5">Submit Image</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className=" p-2 ">
                    <ToggleButtonGroup
                      style={{ display: "flex", justifyContent: "center" }}
                      value={selectedCondition}
                      exclusive
                      onChange={handleConditionChange}
                    >
                      <ToggleButton key="Glaucoma" value="Glaucoma">
                        Glaucoma
                      </ToggleButton>
                      {/* <ToggleButton key="Cataract" value="Cataract">
                        Cataract
                      </ToggleButton> */}
                      <ToggleButton key="DME" value="DME">
                        Diabetic Macular Edema
                      </ToggleButton>
                      <ToggleButton key="DR" value="DR">
                        Diabetic Retinopathy
                      </ToggleButton>
                      {/* <ToggleButton value="auto">AUTO</ToggleButton>
                      {selectedCondition == "auto" ? (
                        <ToggleButton value="manual">Manual</ToggleButton>
                      ) : (
                        [
                          <ToggleButton key="Glaucoma" value="Glaucoma">
                            Glaucoma
                          </ToggleButton>,
                          <ToggleButton key="Cataract" value="Cataract">
                            Cataract
                          </ToggleButton>,
                          <ToggleButton key="DME" value="DME">
                            DME
                          </ToggleButton>,
                          <ToggleButton key="DR" value="DR">
                            DR
                          </ToggleButton>,
                        ]
                      )} */}
                    </ToggleButtonGroup>
                  </div>
                  <div className=" col-md-7 mx-4">
                    {/* <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      id="image-input" // You can remove the id if it's not needed
                    /> */}

                    <label htmlFor="image-input">
                      <Button variant="outlined" component="span">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          id="image-input" // You can remove the id if it's not needed
                        />
                        Select Image
                      </Button>
                    </label>
                  </div>
                  <div>
                    {selectedImage && (
                      <div>
                        <h5 className="mx-4">Seletd Image Preview</h5>
                        <img
                          src={selectedImage}
                          alt="Selected"
                          style={{
                            marginLeft: "4%",
                            maxWidth: "25%",
                            maxHeight: "300px",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {/* <Button
                    variant="contained"
                    color="blue"
                    onClick={PredicImageFunctionSelecter}
                    disabled={uploading || !selectedImage || !selectedCondition}
                    sx={{ mt: 2 }}
                  >
                    {uploading ? "Predicting..." : "Predict"}
                  </Button> */}

                  <div className="mt-3  col-md-5 mx-4">
                    <button
                      className="btn "
                      // style={{ backgroundColor: "blue" }}
                      onClick={PredicImageFunctionSelecter}
                      disabled={
                        uploading || !selectedImage || !selectedCondition
                      }
                    >
                      {uploading ? "Predicting..." : "Predict"}
                    </button>
                    <Button
                      className="mx-3"
                      color="green"
                      variant="contained"
                      onClick={FirebaseImageUploader}
                      disabled={!documentId || !predictionResult}
                    >
                      Save
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
                          snackbarMessage.includes("successfully")
                            ? "success"
                            : "error"
                        }
                        sx={{ width: "100%" }}
                      >
                        {snackbarMessage}
                      </MuiAlert>
                    </Snackbar>
                  </div>
                </CardBody>
              </Card>
            </Col>
            {/* imge display and result */}
            {predictionResult ? ( // Check if predictionResult is not null
              <Col md="5">
                <Card className="card-user">
                  <div className="image">
                    <h3 className="mt-3 w-25 mx-auto">Result</h3>
                  </div>
                  <CardBody>
                    <div className="author">
                      {priviewImage && (
                        <div>
                          <img
                            src={priviewImage}
                            alt="Selected"
                            style={{ maxWidth: "100%", maxHeight: "300px" }}
                          />
                        </div>
                      )}

                      {predictionResult && (
                        <div className="">
                          <div className="row mt-4">
                            <p className=" col col-lg-4  ">Result</p>
                            <p className="col-md-auto ">:</p>
                            <p className=" col col-lg-6">
                              {predictionResult.top}
                            </p>
                          </div>
                          <div className="row">
                            <p className="col-lg-4 ">Modal Confidance</p>
                            <p className="col-md-auto ">:</p>
                            <p className=" col col-lg-3 ">
                              {(predictionResult.confidence * 100).toFixed(2)}%
                            </p>
                          </div>
                        </div>

                        // <div className="p-3">
                        //   <p>Result : {predictionResult.top}</p>
                        //   <p>
                        //     Modal Confidence : {predictionResult.confidence}
                        //   </p>
                        // </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ) : null}
          </Row>
        ) : (
          <Row>
            <Col style={{ marginTop: 140 }} className="mx-auto" md="5">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Select Patient</CardTitle>
                </CardHeader>
                {/* <div className="card rounded-3"></div> */}

                <CardBody>
                  <Form>
                    <Row className="">
                      <Col className="">
                        <FormGroup className="row">
                          <label className="  col-md-4 mt-2">
                            Patient Number :
                          </label>
                          <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-50"
                            maxLength={10}
                            defaultValue="Creative Code Inc."
                            placeholder="Telephone.."
                            type="text"
                          />
                          <Button
                            onClick={handleSearch}
                            className="btn-round w-25 mx-auto mt-4"
                            color="primary"
                          >
                            Submit
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
                                snackbarMessage.includes("successfully")
                                  ? "success"
                                  : "error"
                              }
                              sx={{ width: "25%" }}
                            >
                              {snackbarMessage}
                            </MuiAlert>
                          </Snackbar>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default Prediction;
