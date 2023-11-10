import StemLayout from "@/Layout/Layout";
import { Form, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const StemStrategyComponent = () => {
  const [selectedDays, setSelectedDays] = useState([]);

  const days = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const isAllSelected = () =>
    days.every((day) => selectedDays.includes(day) || day === "All");

  const handleDayClick = (day) => {
    if (day === "All") {
      if (isAllSelected() || selectedDays.length === 0) {
        setSelectedDays([]);
      } else {
        setSelectedDays([...days]);
      }
    } else {
      setSelectedDays(
        selectedDays.includes(day)
          ? selectedDays.filter((d) => d !== day)
          : [...selectedDays, day]
      );
    }
  };

  const getButtonVariant = (day) => {
    if (isAllSelected() || selectedDays.includes(day)) {
      return "primary";
    }
    return "outlined-primary";
  };
  return (
    <>
      <StemLayout>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
            <Form.Group
              className="mb-3 stem-fin-input"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Straddle Name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Eg:Straddle Name"
                className="stem-fin-input"
              />
            </Form.Group>
          </div>
          <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12"></div>
        </div>
        <h2>Add Leg</h2>
        <Card className="text-center shadow-lg mb-3 mt-3">
          <Card.Body>
            <div className="row"></div>
          </Card.Body>
        </Card>

        <div className="row">
          <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
            <h2>Overall MTM</h2>
            <Card className="shadow-lg">
              <Card.Body bg="light">
                <div className="row">
                  <div className="col-md-6 col-lg-6">
                    <Form.Label>Stop Loss</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>none</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <Form.Label>Overall Target</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>none</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
            <h2>Days to Execute</h2>
            <Card bg="dark">
              <Card.Body>
                <div className="row">
                  {days.map((r, i) => (
                    <>
                      <div key={i} className="col-md-1 col-lg-2">
                        {/* <Button
                          variant={isAllSelected() || selectedDays.includes(r) ? "light" : "outlined-light"}
                          onClick={() => handleDayClick(r)}
                          className="btn-width"
                        >
                          {r}
                        </Button> */}
                        <Button
                          variant={
                            isAllSelected() || selectedDays.includes(r)
                              ? "light"
                              : "outline-light"
                          }
                          onClick={()=>handleDayClick(r)}
                          className="btn-width"
                        >
                          {r}
                        </Button>
                      </div>
                    </>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </StemLayout>
    </>
  );
};
export default StemStrategyComponent;
