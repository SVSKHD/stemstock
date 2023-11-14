import StemLayout from "@/Layout/Layout";
import { Form, Card, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import StemToast from "@/components/reusables/js/toast";
import { FaTrash } from "react-icons/fa6";

const StemStrategyComponent = () => {
  const instrumenOptions = [
    { value: "1", displayText: "BankNifty" },
    { value: "2", displayText: "Nifty" },
    { value: "3", displayText: "Finnifty" },
  ];
  const segmentOptions = [
    { value: "1", displayText: "OPT" },
    { value: "2", displayText: "FUT" },
  ];
  const positionOptions = [
    { value: "1", displayText: "BUY" },
    { value: "2", displayText: "SELL" },
  ];
  const optionTypeOptions = [
    { value: "1", displayText: "CE" },
    { value: "2", displayText: "PE" },
  ];
  const strikeTypeOptions = [
    { value: "1", displayText: "ATM-100" },
    { value: "2", displayText: "ATM-50" },
    { value: "3", displayText: "ATM" },
    { value: "4", displayText: "ATM+50" },
    { value: "5", displayText: "ATM+50" },
  ];
  const strikeCriteriaOptions = [
    { value: "1", displayText: "ATM Type" },
    { value: "2", displayText: "Closest Premium" },
  ];
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
    segment: "",
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

  const [Newleg, setNewleg] = useState(newLegTemplate);

  const legStateManage = (key, e) => {
    const value = key === "quantity" ? Number(e.target.value) : e.target.value;
    setNewleg({ ...Newleg, [key]: e.target.value });
  };
  // adding and removing legs
  // const addNewLeg = () => {
  //   console.log("legs", Newleg , strategy);
  //   setStrategy((prevStrategy) => {
  //     if (prevStrategy.legs.length < 9) {
  //       return {
  //         ...prevStrategy,
  //         legs: [
  //           ...prevStrategy.legs,
  //           { ...Newleg, index: prevStrategy.legs.length },
  //         ],
  //       };
  //     } else {
  //       // Optionally handle the case where there are already 10 legs
  //       StemToast("we can allow only 9 legs", "error");
  //       return prevStrategy;
  //     }
  //   });
  // };

  const addNewLeg = () => {
    console.log("legs", Newleg, strategy);

    setStrategy((prevStrategy) => {
      // Check if the maximum number of legs (9 in this case) has been reached
      if (prevStrategy.legs.length < 9) {
        // Create a new leg object with updated index
        const updatedNewLeg = {
          ...Newleg,
          index: prevStrategy.legs.length,
        };

        // Return the updated strategy with the new leg added
        return {
          ...prevStrategy,
          legs: [...prevStrategy.legs, updatedNewLeg],
        };
      } else {
        // Handle the case where there are already 9 legs
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

  const handleLegChange = (legIndex, key, value) => {
    setStrategy((prevStrategy) => {
      // Clone the legs array
      const updatedLegs = [...prevStrategy.legs];

      // Update the specified leg
      updatedLegs[legIndex] = { ...updatedLegs[legIndex], [key]: value };

      // Return the updated strategy
      return { ...prevStrategy, legs: updatedLegs };
    });
  };

  const handleInputChange = (e, section, field, index) => {
    const updatedFormData = { ...strategy };
    if (section === "products") {
      updatedFormData[section][index][field] = e.target.value;
    } else {
      updatedFormData[section][field] = e.target.value;
    }
    setStrategy(updatedFormData);
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
        const anyDayNotSelected = daysUpdated
          .slice(1)
          .some((d) => !d[Object.keys(d)[0]]);

        if (anyDayNotSelected) {
          // Set 'all' to false
          daysUpdated[0] = { all: false };
        } else {
          // Else, check if all days are true
          const allDaysSelected = daysUpdated
            .slice(1)
            .every((d) => d[Object.keys(d)[0]]);
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
                  onChange={(e) => legStateManage("instrument", e)}
                  value={Newleg.instrument}
                >
                  {instrumenOptions.map((option) => (
                    <option key={option.value} value={option.displayText}>
                      {option.displayText}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label className="text-start">Segments</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={Newleg.segment}
                  onChange={(e) => legStateManage("segment", e)}
                >
                  {segmentOptions.map((option) => (
                    <option key={option.value} value={option.displayText}>
                      {option.displayText}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label className="text-start">Position</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={Newleg.position}
                  onChange={(e) => legStateManage("position", e)}
                >
                  {positionOptions.map((option) => (
                    <option key={option.value} value={option.displayText}>
                      {option.displayText}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label className="text-start">Option Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={Newleg.instrumentType}
                  onChange={(e) => legStateManage("instrumentType", e)}
                >
                  {optionTypeOptions.map((option) => (
                    <option key={option.value} value={option.displayText}>
                      {option.displayText}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label className="text-start">Strike Criteria</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={Newleg.strike_value}
                  onChange={(e) => legStateManage("strike_value", e)}
                >
                  {strikeCriteriaOptions.map((option) => (
                    <option key={option.value} value={option.displayText}>
                      {option.displayText}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label className="text-start">Strike Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={Newleg.strike_type}
                  onChange={(e) => legStateManage("strike_type", e)}
                >
                  {strikeTypeOptions.map((option) => (
                    <option key={option.value} value={option.displayText}>
                      {option.displayText}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label className="text-start">Total Lots</Form.Label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="lot size"
                  value={Newleg.quantity}
                  onChange={(e) => legStateManage("quantity", e)}
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
            {strategy.legs.map((leg, i) => (
              <div key={i}>
                {/* Example: Dropdown for selecting instrument */}
                <Card className="shadow-lg mt-2">
                  <Card.Body>
                    <div className="row">
                      <div className="col">
                      <Form.Label className="text-start">Instrument</Form.Label>
                        <Form.Select
                          value={leg.instrument}
                          onChange={(e) =>
                            handleLegChange(i, "instrument", e.target.value)
                          }
                        >
                          {instrumenOptions.map((option) => (
                            <option
                              key={option.value}
                              value={option.displayText}
                            >
                              {option.displayText}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                      <div className="col">
                        <Form.Label className="text-start">Segments</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          value={Newleg.segment}
                          onChange={(e) =>
                            handleLegChange(i, "segment", e.target.value)
                          }
                        >
                          {segmentOptions.map((option) => (
                            <option
                              key={option.value}
                              value={option.displayText}
                            >
                              {option.displayText}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                      <div className="col">
                        <Form.Label className="text-start">Position</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          value={Newleg.position}
                          onChange={(e) => legStateManage("position", e)}
                        >
                          {positionOptions.map((option) => (
                            <option
                              key={option.value}
                              value={option.displayText}
                            >
                              {option.displayText}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                      <div className="col">
                      <Form.Label className="text-start">lots</Form.Label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="lot-size"
                          value={leg.quantity}
                          onChange={(e) =>
                            handleLegChange(i, "quantity", e.target.value)
                          }
                        />
                      </div>

                      <div className="col">
                        <Button variant="primary" onClick={() => removeLeg(i)}>
                          <FaTrash size={25} />
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Additional inputs for other properties... */}
                {/* Example: Input for quantity */}

                {/* Button to remove this leg */}
              </div>
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
