import StemLayout from "@/Layout/Layout";
import { Form, Card, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import StemToast from "@/components/reusables/js/toast";
import { FaTrash } from "react-icons/fa6";

const StemStrategyComponent = () => {
  let straddleStrategy = {
    name: "",
    entryTime: "",
    endTime: "",
    immediate: false,
    legs: [],
    stopLoss: 0, // e.g., 1000 (currency amount or percentage)
    overallMTM: 0, // e.g., 5000 (currency amount or percentage)
    daysToExecute: [
      { all: false },
      { monday: false },
      { tuesday: false },
      { wednesday: false },
      { thursday: false },
      { friday: false },
    ], // e.g., 30 (number of days),
    brokerSelected: "",
    status: "",
  };

  const [strategy, setStrategy] = useState(straddleStrategy);
 
  const newLegTemplate = {
    instrument: "",
    instrumentType: "",
    entry_type: "time",
    expiry: "current",
    index: 0,
    segement: "",
    strike_type: "",
    strike_value: "",
    position: "",
    quantity: "",
    takeProfit: "",
    stopLoss: "",
    traiLStopLoss: { x: "", y: "" },
    waitAndTrade: "",
    Re_Entry: "",
  };

  // adding and removing legs
  const addNewLeg = () => {
    setStrategy((prevStrategy) => {
      if (prevStrategy.legs.length < 9) {
        return {
          ...prevStrategy,
          legs: [
            ...prevStrategy.legs,
            { ...newLegTemplate, index: prevStrategy.legs.length },
          ],
        };
      } else {
        // Optionally handle the case where there are already 10 legs
        StemToast("we can allow only 9 legs", "error");
        return prevStrategy;
      }
    });
  };

  const removeLeg = (legIndex) => {
    setStrategy((prevStrategy) => ({
      ...prevStrategy,
      legs: prevStrategy.legs.filter((_, index) => index !== legIndex),
    }));
  };

  const handleDayClick = (day) => {
    setStrategy((prevStrategy) => {
      if (day === "all") {
        const allSelected = !prevStrategy.daysToExecute[0].all; // Toggle the state of 'all'
        return {
          ...prevStrategy,
          daysToExecute: prevStrategy.daysToExecute.map((d) => ({
            ...d,
            [Object.keys(d)[0]]: allSelected,
          })),
        };
      } else {
        let daysUpdated = prevStrategy.daysToExecute.map((d) => {
          if (Object.keys(d)[0] === day) {
            return { ...d, [day]: !d[day] }; // Toggle the selected day
          }
          return d;
        });
  
        // Check if any individual day is false
        const anyDayNotSelected = daysUpdated.slice(1).some((d) => !d[Object.keys(d)[0]]);
  
        if (anyDayNotSelected) {
          // Set 'all' to false
          daysUpdated[0] = { all: false };
        } else {
          // Else, check if all days are true
          const allDaysSelected = daysUpdated.slice(1).every((d) => d[Object.keys(d)[0]]);
          if (allDaysSelected) {
            // Set 'all' to true
            daysUpdated[0] = { all: true };
          }
        }
  
        return {
          ...prevStrategy,
          daysToExecute: daysUpdated,
        };
      }
    });
  };
  
  

 

  const updateStrategyAttribute = (property, newValue) => {
    setStrategy((prevStrategy) => ({
      ...prevStrategy,
      [property]: newValue, // Note the use of square brackets
    }));
  };

  const handleChange = (index, event) => {
    const updatedLegs = [...legs];
    updatedLegs[index][event.target.name] = event.target.value;
    setLegs(updatedLegs);
  };

  // useEffect(() => {
  //   // Automatically select or deselect "All" based on other days
  //   const weekdays = days.slice(1);
  //   if (weekdays.every((day) => selectedDays.includes(day))) {
  //     setSelectedDays([...weekdays, "All"]);
  //   } else {
  //     setSelectedDays(selectedDays.filter((day) => day !== "All"));
  //   }
  // }, [selectedDays]);

  // handle days
  // const handleDayClick = (day) => {
  //   if (day === "All") {
  //     setSelectedDays(selectedDays.includes("All") ? [] : [...days]);
  //   } else {
  //     setSelectedDays(
  //       selectedDays.includes(day)
  //         ? selectedDays.filter((d) => d !== day)
  //         : [...selectedDays, day]
  //     );
  //   }
  // };

  const isDaySelected = (day) => {
    return selectedDays.includes(day);
  };

  const formatDate = () => {};

  const handleSaveStrategy = () => {
    console.log("strategy", strategy);
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
                value={strategy.name}
                onChange={(e) =>
                  updateStrategyAttribute("name", e.target.value)
                }
              />
            </Form.Group>
          </div>
          <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
            <div className="col">
              <div className="row">
                <div className="col">
                  <label>Start Date : </label>
                  <input
                    type="time"
                    placeholder="Start date"
                    className="form-control"
                    value={strategy.entryTime}
                    onChange={(e) =>
                      updateStrategyAttribute("entryTime", e.target.value)
                    }
                  />
                  <div className="mt-2 text-start">
                    <label className="font-weight-bold">Immediate</label>
                    <label class="switch">
                      <input
                        type="checkbox"
                        onChange={(e) => console.log(e.target.value)}
                        value={false}
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </div>
                <div className="col">
                  <label>End Date : </label>
                  <input
                    type="time"
                    className="form-control"
                    value={strategy.endTime}
                    onChange={(e) =>
                      updateStrategyAttribute("endTime", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2>Add Leg</h2>
        <Card className="text-center shadow-lg mb-3 mt-3">
          <Card.Body>
            <div className="row">
              <div className="col">
                <Form.Label className="text-start">Instrument</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => e.target.value}
                  value={straddleStrategy.legs.instrument}
                >
                  <option value="1">BankNifty</option>
                  <option value="2">Nifty</option>
                  <option value="3">finnifty</option>
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label className="text-start">Segments</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="1">OPT</option>
                  <option value="2">FUT</option>
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label className="text-start">Position</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="1">BUY</option>
                  <option value="2">SELL</option>
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label className="text-start">Option Type</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="1">CE</option>
                  <option value="2">PE</option>
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label className="text-start">Strike Criteria</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="1">ATM Type</option>
                  <option value="2">Closet Premium</option>
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label className="text-start">Strike Type</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="1">ATM</option>
                  <option value="2">PE</option>
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label className="text-start">Total Lots</Form.Label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="lot size"
                />
              </div>
              <div className="col">
                <Button onClick={addNewLeg}>Add-Leg</Button>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* //legs length and loop */}
        {strategy.legs.length > 0 ? (
          <>
            <>
              <div className="row">
                <div className="col"></div>
                <div className="col text-end">
                  <div className="fw-bolder">Legs:{strategy.legs.length}</div>
                </div>
              </div>
            </>
            {strategy.legs.map((r, i) => (
              <>
                <Card key={i} className="m-1 shadow-lg" key={i}>
                  <Card.Body>
                    <div className="row">
                      <div className="col">
                        <Button onClick={() => removeLeg(i)}>
                          <FaTrash size={25} />
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </>
            ))}
          </>
        ) : (
          <div></div>
        )}

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
                      <option value="1">MTM</option>
                      <option value="2">Premium %</option>
                    </Form.Select>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <Form.Label>Overall Target</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>none</option>
                      <option value="1">MTM</option>
                      <option value="2">Premium %</option>
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
                  {strategy.daysToExecute.map((day, index) => {
                    const dayName = Object.keys(day)[0];
                    return (
                      <Button
                        key={index}
                        className="col m-2"
                        onClick={() => handleDayClick(dayName)}
                        variant={day[dayName] ? "light" : "outline-light"}
                      >
                        {dayName.charAt(0).toUpperCase() + dayName.slice(1)}{" "}
                        {day[dayName] ? "(Selected)" : ""}
                      </Button>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="row mt-5">
          <Button onClick={handleSaveStrategy}>Save Strategy</Button>
        </div>
      </StemLayout>
    </>
  );
};
export default StemStrategyComponent;
