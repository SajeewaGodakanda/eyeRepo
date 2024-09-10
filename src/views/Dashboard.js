
import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import './cstyles.css'
// import '../views/Subcomponents/analytics.png'
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
    
      <div className="content">

      

        <div style={{marginTop: 199,}} class="solution_cards_row  row">
        
        <div class="solution_card w-25">
        <Link to="/admin/prediction">
            <div class="hover_color_bubble"></div>
            <div class="so_top_icon ">
            <img src="https://cdn-icons-png.flaticon.com/128/3316/3316516.png" alt="Analytics Icon" />
            </div>
            <div class="solu_title mt-5 ">
              <h3>Prediction</h3>
            </div>
            <div class="solu_description">
              
              
            </div>
            </Link>
          </div>

          <div class="solution_card w-25">
            <Link to="/admin/PredictedReports">
            <div class="hover_color_bubble"></div>
            <div class="so_top_icon ">
            <img src="https://cdn-icons-png.flaticon.com/128/3286/3286169.png" alt="Analytics Icon" />
            </div>
            <div class="solu_title mt-5 ">
              <h3>Predicted Reports</h3>
            </div>
            <div class="solu_description">
              
              
            </div>
            </Link>
          </div>

          <div class="solution_card w-25">
            <Link to="/admin/user-page">
            <div class="hover_color_bubble"></div>
            <div class="so_top_icon ">
            <img src="https://cdn-icons-png.flaticon.com/128/1512/1512910.png" alt="Analytics Icon" />
            </div>
            <div class="solu_title mt-5 ">
              <h3>Patient Management</h3>
            </div>
            <div class="solu_description">
              
              
            </div>
            </Link>
          </div>

          <div class="solution_card w-25">
            <Link to="/admin/charts">
            <div class="hover_color_bubble"></div>
            <div class="so_top_icon ">
            <img src="https://cdn-icons-png.flaticon.com/128/2936/2936690.png" alt="Analytics Icon" />
            </div>
            <div class="solu_title mt-5 ">
              <h3>Data Analysing</h3>
            </div>
            <div class="solu_description">
              
              
            </div>
            </Link>
          </div>
        
          
{/* 
          <div class="solution_card w-25">
            <div class="hover_color_bubble"></div>
            <div class="so_top_icon">
            <i className="nc-icon nc-alert-circle-i" />
            </div>
            <div class="solu_title">
              <h3>Demo 1</h3>
            </div>
            <div class="solu_description">
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </p>
              <button type="button" class="read_more_btn">Read More</button>
            </div>
          </div>

          <div class="solution_card w-25">
            <div class="hover_color_bubble"></div>
            <div class="so_top_icon">
            <i className="nc-icon nc-alert-circle-i" />
            </div>
            <div class="solu_title">
              <h3>Demo 1</h3>
            </div>
            <div class="solu_description">
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </p>
              <button type="button" class="read_more_btn">Read More</button>
            </div>
          </div>

          <div class="solution_card w-25">
            <div class="hover_color_bubble"></div>
            <div class="so_top_icon">
            <i className="nc-icon nc-alert-circle-i" />
            </div>
            <div class="solu_title">
              <h3>Demo 1</h3>
            </div>
            <div class="solu_description">
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </p>
              <button type="button" class="read_more_btn">Read More</button>
            </div>
          </div> */}
          </div>

{/* <div class="section_our_solution">
  <div class="row">
    <div class="">
      <div class="">
        <div class="solution_cards_box border">
          <div class="solution_card w-25">
            <div class="hover_color_bubble"></div>
            <div class="so_top_icon">
            <i className="nc-icon nc-alert-circle-i" />
            </div>
            <div class="solu_title">
              <h3>Demo 1</h3>
            </div>
            <div class="solu_description">
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </p>
              <button type="button" class="read_more_btn">Read More</button>
            </div>
          </div>


          
          <div class="solution_card w-25">
            <div class="hover_color_bubble"></div>
            <div class="so_top_icon">
            <i className="nc-icon nc-alert-circle-i" />
            </div>
            <div class="solu_title">
              <h3>Demo 2</h3>
            </div>
            <div class="solu_description">
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </p>
              <button type="button" class="read_more_btn">Read More</button>
            </div>
          </div>
          </div>
  
          <div class="solution_cards_box sol_card_top_3 border">
          <div class="solution_card w-25">
            <div class="hover_color_bubble"></div>
            <div class="so_top_icon">
            <i className="nc-icon nc-alert-circle-i" />
            </div>
            <div class="solu_title">
              <h3>Demo 3</h3>
            </div>
            <div class="solu_description">
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </p>
              <button type="button" class="read_more_btn">Read More</button>
            </div>
          </div>
          <div class="solution_card">
            <div class="hover_color_bubble"></div>
            <div class="so_top_icon">
            <i className="nc-icon nc-alert-circle-i" />
            </div>
            <div class="solu_title">
              <h3>Demo 4</h3>
            </div>
            <div class="solu_description">
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </p>
              <button type="button" class="read_more_btn">Read More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */}

        {/* <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Capacity</p>
                      <CardTitle tag="p">150GB</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <CardTitle tag="p">$ 1,345</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats shadow-lg">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col>
                    </Row> */}
        {/* <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Users Behavior</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardBody>
                <Line
                  // data={dashboard24HoursPerformanceChart.data}
                  // options={dashboard24HoursPerformanceChart.options}
                  // width={400}
                  // height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row> */}
        {/* <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Email Statistics</CardTitle>
                <p className="card-category">Last Campaign Performance</p>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie
                  data={dashboardEmailStatisticsChart.data}
                  options={dashboardEmailStatisticsChart.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                <p className="card-category">Line Chart with Points</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                  <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row> */}
      </div>
    </>
  );
}

export default Dashboard;


{/* <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Capacity</p>
                      <CardTitle tag="p">150GB</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <CardTitle tag="p">$ 1,345</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats shadow-lg">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col>
                    </Row> */}