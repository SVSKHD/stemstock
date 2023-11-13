import StemLayout from "@/Layout/Layout";
import { Form, Card, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import StemToast from "@/components/reusables/js/toast";

const StemStrategyComponent = () => {
  let straddleStrategy = {
    name: "",
    entryTime: "",
    endTime: "",
    immediate: false,
    legs: [
      {
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
      },
      // ... more legs as needed
    ],
    stopLoss: 0, // e.g., 1000 (currency amount or percentage)
    overallMTM: 0, // e.g., 5000 (currency amount or percentage)
    daysToExecute: [], // e.g., 30 (number of days),
    brokerSelected: "",
    status: "",
  };

  const [strategy, setStrategy] = useState(straddleStrategy);
  const days = [
    { all: false },
    { monday: false },
    { tuesday: false },
    { wednesday: false },
    { thursday: false },
    { friday: false },
  ];
  const [selectedDays, setSelectedDays] = useState(days);

  const handleDayClick = (day) => {
    if (day === "all") {
      const allSelected = !selectedDays[0].all; // Toggle the state of 'all'
      setSelectedDays(
        selectedDays.map((d) => ({
          ...d,
          [Object.keys(d)[0]]: allSelected,
        }))
      );
    } else {
      setSelectedDays(
        selectedDays
          .map((d) => ({
            ...d,
            [Object.keys(d)[0]]: Object.keys(d)[0] === day ? !d[day] : false,
          }))
          .map((d, idx) => (idx === 0 ? { all: false } : d))
      ); // Unselect 'all' if any individual day is toggled
    }
  };

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
        StemToast("we can allow only 9 legs", "error")
        console.log("Maximum of 10 legs reached");
        return prevStrategy;
      }
    });
  };

  const removeLeg = (index) => {
    const newLegs = [...legs];
    newLegs.splice(index, 1);
    setLegs(newLegs);
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

        <div></div>

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
                  {selectedDays.map((day, index) => {
                    const dayName = Object.keys(day)[0];
                    return (
                      <Button
                        key={index}
                        className="col m-2"
                        onClick={() => handleDayClick(dayName)}
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
