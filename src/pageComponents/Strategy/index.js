import StemLayout from "@/Layout/Layout";
import { Form, Card, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import StemToast from "@/components/reusables/js/toast";
import { FaTrash, FaRegCircleCheck } from "react-icons/fa6";
import moment from "moment/moment";
import startegy from "@/pages/api/strategy";
import StrategyOperations from "@/services/startegy";
import { useSelector } from "react-redux";

const StemStrategyComponent = () => {
  let current_time = moment(new Date()).format("HH:mm a");
  const { userData } = useSelector((state) => ({ ...state }));
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
  const takeProfitOptions = [
    { value: "1", displayText: "TP %" },
    { value: "2", displayText: "TP Pts" },
    { value: "2", displayText: "TP Spot Pts" },
    { value: "2", displayText: "TP Spot %" },
  ];
  const stopLossOptions = [
    { value: "1", displayText: "SL %" },
    { value: "2", displayText: "SL Pts" },
    { value: "2", displayText: "SL Spot Pts" },
    { value: "2", displayText: "SL Spot %" },
  ];
  const traiLStopLossOptions = [
    { value: "1", displayText: "TSL %" },
    { value: "2", displayText: "TSL Pts" },
  ];
  const waitAndTradeOptions = [
    { value: "1", displayText: "% ⬆️" },
    { value: "2", displayText: "% ⬇️" },
    { value: "3", displayText: "Pts ⬆️" },
    { value: "4", displayText: "Pts ⬇️" },
    { value: "5", displayText: "Spot % ⬆️" },
    { value: "6", displayText: "Spot % ⬇️" },
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
    overAllStopLoss: false,
    overAllStopLossType: "",
    overAllStopLossValue: 0,
    overAllMTM: false,
    overAllMTMType: "",
    overAllMTMValue: 0,
    user: userData ? userData.user.id : "",
  };

  const [strategy, setStrategy] = useState(straddleStrategy);
  const [toggle, setTooglle] = useState({
    overAllStopLoss: false,
    overAllMTM: false,
  });

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
    takeProfit: false,
    takeProfitType: "",
    takeProfitValue: 0,
    stopLoss: false,
    stopLossType: "",
    stopLossValue: 0,
    trialStopLoss: false,
    trialStopLossType: "",
    traiLStopLossValue: { x: 0, y: 0 },
    waitAndTrade: false,
    waitAndTradeType: "",
    waitAndTradeValue: 0,
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
    console.log("legs", strategy.legs);
    setStrategy((prevStrategy) => {
      // Clone the legs array
      const updatedLegs = [...prevStrategy.legs];

      // Check if the key is for updating x or y in triaLStopLoss
      if (key === "triaLStopLossValueX" || key === "triaLStopLossValueY") {
        const axis = key === "triaLStopLossValueX" ? "x" : "y";
        value = Number(value); // Assuming x and y values are numbers

        // Update the triaLStopLoss object in the specific leg
        updatedLegs[legIndex] = {
          ...updatedLegs[legIndex],
          triaLStopLoss: {
            ...updatedLegs[legIndex].triaLStopLoss,
            [axis]: value,
          },
        };
      } else {
        // Handle other keys
        updatedLegs[legIndex] = { ...updatedLegs[legIndex], [key]: value };
      }

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

  const { startegySave } = StrategyOperations();

  const handleSaveStrategy = () => {
    console.log("strategy", strategy);
    if (!strategy.name) {
      StemToast("Please fill the Strategy Name", "error");
    } else if (strategy.legs.length >= 9) {
      StemToast("selected legs need to below or equal to 9", "error");
    } else if (moment(startegy.endTime).isBefore(startegy.entryTime)) {
      StemToast("Please select valid end time", "error");
    } else if (moment(startegy.entryTime) < moment("08:00 ,HH:mm a")) {
      StemToast("Stock order places after 8 am");
    } else {
      startegySave(startegy)
        .then((res) => {
          console.log(res.data);
        })
        .catch(() => {
          StemToast("please try again", "error");
        });
    }
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
              <Form.Label className="mb-0">Straddle Name:</Form.Label>
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
                <div className="col border-end">
                  <label className="mb-0">Start Time: </label>
                  <input
                    type={strategy.immediate ? "text" : "time"}
                    placeholder="Start date"
                    className="form-control"
                    value={
                      strategy.immediate
                        ? `${current_time} immediate`
                        : strategy.entryTime
                    }
                    onChange={(e) =>
                      updateStrategyAttribute("entryTime", e.target.value)
                    }
                  />
                  <div className="mt-2 text-start">
                    {/* <label className="font-weight-bold">Immediate</label> */}
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Immediate"
                        checked={strategy.immediate}
                        onChange={(e) =>
                          updateStrategyAttribute("immediate", e.target.checked)
                        }
                      />
                    {/* <label class="switch">
                      <input
                        type="checkbox"
                        checked={strategy.immediate}
                        onChange={(e) =>
                          updateStrategyAttribute("immediate", e.target.checked)
                        }
                      />
                      
                      <span class="slider round"></span>
                    </label> */}
                  </div>
                </div>
                <div className="col">
                  <label className="mb-0">End Time: </label>
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
        <hr/>
        <h5 class="mb-0">Add Leg</h5>
        <Card className="text-center shadow-none mb-3 mt-3 addleg-card">
          <Card.Body>
            <div className="row text-start">
              <div className="col">
                <Form.Label className="text-start">Instrument:</Form.Label>
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
                <Form.Label className="text-start">Segments:</Form.Label>
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
                <Form.Label className="text-start">Position:</Form.Label>
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
                <Form.Label className="text-start">Option Type:</Form.Label>
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
                <Form.Label className="text-start">Strike Criteria:</Form.Label>
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
                <Form.Label className="text-start">Strike Type:</Form.Label>
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
                <Form.Label className="text-start">Total Lots:</Form.Label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="lot size"
                  value={Newleg.quantity}
                  onChange={(e) => legStateManage("quantity", e)}
                />
              </div>
              <div className="col">
                <Button onClick={addNewLeg} className="mt-3" >Add-Leg</Button>
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
                        <Form.Label className="text-start">
                          Instrument:
                        </Form.Label>
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
                        <Form.Label className="text-start">Segments:</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          value={leg.segment}
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
                        <Form.Label className="text-start">Position:</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          value={leg.position}
                          onChange={(e) =>
                            handleLegChange(i, "position", e.target.value)
                          }
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
                        <Form.Label className="text-start">
                          Option Type:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          value={leg.instrumentType}
                          onChange={(e) =>
                            handleLegChange(i, "instrumentType", e.target.value)
                          }
                        >
                          {optionTypeOptions.map((option) => (
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
                        <div className="mb-1">
                          <Form.Select
                            aria-label="Default select example"
                            value={leg.strike_type}
                            placeholder="Strike Criteria "
                            onChange={(e) =>
                              handleLegChange(i, "strike_type", e.target.value)
                            }
                          >
                            {strikeCriteriaOptions.map((option) => (
                              <option
                                key={option.value}
                                value={option.displayText}
                              >
                                {option.displayText}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                        <div>
                          <Form.Select
                            aria-label="Default select example"
                            value={leg.strike_value}
                            placeholder="Strike Type"
                            onChange={(e) =>
                              handleLegChange(i, "stirke_value", e.target.value)
                            }
                          >
                            {strikeTypeOptions.map((option) => (
                              <option
                                key={option.value}
                                value={option.displayText}
                              >
                                {option.displayText}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                      </div>
                      <div className="col">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        >
                          <Form.Check
                            type="checkbox"
                            label={leg.takeProfit ? "" : "Target"}
                            checked={leg.takeProfit}
                            onChange={(e) =>
                              handleLegChange(i, "takeProfit", e.target.checked)
                            }
                          />
                        </Form.Group>
                        <span>
                          {leg.takeProfit ? (
                            <>
                              <Form.Select
                                aria-label="Default select example"
                                className="m-1"
                                value={leg.takeProfitType}
                                placeholder="Target Type"
                                onChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "takeProfitType",
                                    e.target.value
                                  )
                                }
                              >
                                {takeProfitOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.displayText}
                                  >
                                    {option.displayText}
                                  </option>
                                ))}
                              </Form.Select>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="lot-size"
                                value={leg.takeProfitValue}
                                onChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "takeProfitValue",
                                    e.target.value
                                  )
                                }
                              />
                            </>
                          ) : (
                            <div />
                          )}
                        </span>
                      </div>
                      <div className="col">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        >
                          <Form.Check
                            type="checkbox"
                            label={leg.stopLoss ? "" : "Stop-Loss"}
                            checked={leg.stopLoss}
                            onChange={(e) =>
                              handleLegChange(i, "stopLoss", e.target.checked)
                            }
                          />
                        </Form.Group>
                        <span>
                          {leg.stopLoss ? (
                            <>
                              <Form.Select
                                aria-label="Default select example"
                                className="m-1"
                                value={leg.stopLossType}
                                placeholder="Target Type"
                                onChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "stopLossType",
                                    e.target.value
                                  )
                                }
                              >
                                {stopLossOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.displayText}
                                  >
                                    {option.displayText}
                                  </option>
                                ))}
                              </Form.Select>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="lot-size"
                                value={leg.stopLossValue}
                                onChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "stopLossValue",
                                    e.target.value
                                  )
                                }
                              />
                            </>
                          ) : (
                            <div />
                          )}
                        </span>
                      </div>
                      <div className="col">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        >
                          <Form.Check
                            type="checkbox"
                            label={leg.trialStopLoss ? "" : "Trail-Stop-Loss"}
                            checked={leg.trialStopLoss}
                            onChange={(e) =>
                              handleLegChange(
                                i,
                                "trialStopLoss",
                                e.target.checked
                              )
                            }
                          />
                        </Form.Group>
                        <span>
                          {leg.trialStopLoss ? (
                            <>
                              <Form.Select
                                aria-label="Default select example"
                                className="m-1"
                                value={leg.trialStopLossType}
                                placeholder="Target Type"
                                onChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "trialStopLossType",
                                    e.target.value
                                  )
                                }
                              >
                                {traiLStopLossOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.displayText}
                                  >
                                    {option.displayText}
                                  </option>
                                ))}
                              </Form.Select>
                              <div className="row m-1">
                                <div className="col">
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="X"
                                    value={leg.traiLStopLossValue.x} // Correct reference to leg.trialStopLossValue.x
                                    onChange={(e) =>
                                      handleLegChange(
                                        i,
                                        "trialStopLossValueX", // Correct key name
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="col">
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Y"
                                    value={leg.traiLStopLossValue.y} // Correct reference to leg.trialStopLossValue.y
                                    onChange={(e) =>
                                      handleLegChange(
                                        i,
                                        "trialStopLossValueY", // Correct key name
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>

                              {/* Input field for 'y' value of trialStopLossValue in a leg */}
                            </>
                          ) : (
                            <div />
                          )}
                        </span>
                      </div>
                      <div className="col">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        >
                          <Form.Check
                            type="checkbox"
                            label={leg.waitAndTrade ? "" : "wait and trade"}
                            checked={leg.waitAndTrade}
                            onChange={(e) =>
                              handleLegChange(
                                i,
                                "waitAndTrade",
                                e.target.checked
                              )
                            }
                          />
                        </Form.Group>
                        <span>
                          {leg.waitAndTrade ? (
                            <>
                              <Form.Select
                                aria-label="Default select example"
                                className="m-1"
                                value={leg.waitAndTradeType}
                                placeholder="Target Type"
                                onChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "waitAndTradeType",
                                    e.target.value
                                  )
                                }
                              >
                                {waitAndTradeOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.displayText}
                                  >
                                    {option.displayText}
                                  </option>
                                ))}
                              </Form.Select>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="lot-size"
                                value={leg.waitAndTradeValue}
                                onChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "waitAndTradeValue",
                                    e.target.value
                                  )
                                }
                              />
                            </>
                          ) : (
                            <div />
                          )}
                        </span>
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
          <div />
        )}

        <div className="row">
          <div className="col-md-5">
            <h5 className="mb-0">Overall MTM</h5>
            <Card className="">
              <Card.Body bg="light">
                <div className="row">
                  <div className="col-md-6 col-lg-6">
                    <Form.Label className="mb-0">Stop Loss:</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>none</option>
                      <option value="1">MTM</option>
                      <option value="2">Premium %</option>
                    </Form.Select>
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <Form.Label className="mb-0">Overall Target:</Form.Label>
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
          <div className="col-md-7">
            <h5 className="mb-0">Days to Execute</h5>
            <Card bg="light">
              <Card.Body>
                <div className="row">
                  {strategy.daysToExecute.map((day, index) => {
                    const dayName = Object.keys(day)[0];
                    return (
                      <Button
                        key={index}
                        className="col m-2"
                        onClick={() => handleDayClick(dayName)}
                        variant={day[dayName] ? "light" : "outline-dark"}
                      >
                        <span>
                          {day[dayName] ? (
                            <FaRegCircleCheck className="text-success" />
                          ) : (
                            ""
                          )}
                        </span>
                        {dayName.charAt(0).toUpperCase() + dayName.slice(1)}{" "}
                      </Button>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="row mt-3 text-start me-auto">
          <Button onClick={handleSaveStrategy} className="w-auto">Save Strategy</Button>
        </div>
      </StemLayout>
    </>
  );
};
export default StemStrategyComponent;
