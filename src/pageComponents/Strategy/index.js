import StemLayout from "@/Layout/Layout";
import { Form, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const StemStrategyComponent = () => {
  const days = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    // Automatically select or deselect "All" based on other days
    const weekdays = days.slice(1);
    if (weekdays.every(day => selectedDays.includes(day))) {
      setSelectedDays([...weekdays, 'All']);
    } else {
      setSelectedDays(selectedDays.filter(day => day !== 'All'));
    }
  }, [selectedDays]);

  const handleDayClick = (day) => {
    if (day === 'All') {
      setSelectedDays(selectedDays.includes('All') ? [] : [...days]);
    } else {
      setSelectedDays(selectedDays.includes(day) 
        ? selectedDays.filter(d => d !== day)
        : [...selectedDays, day]
      );
    }
  };

  const isDaySelected = (day) => {
    return selectedDays.includes(day);
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
                  {days.map((day, i) => (
                    <div key={i} className="col-md-1 col-lg-2">
                      <Button
                        key={day}
                        className="btn-width"
                        variant={
                          selectedDays.includes(day) ? "light" : "outline-light"
                        }
                        onClick={() => handleDayClick(day)}
                      >
                        {day}
                      </Button>
                    </div>
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
