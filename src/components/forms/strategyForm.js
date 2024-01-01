import { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import StemInput from "../reusables/input";
import StemSelect from "../reusables/select";
import StemPlaceHolderInput from "../reusables/placeHolderInput";
import StemToast from "../reusables/js/toast";
import StemCheckBox from "../reusables/checkBox";
import { FaTrash, FaRegCircleCheck } from "react-icons/fa6";
import moment from "moment/moment";
const StrategyForm = ({ data, legData, onSave, mode }) => {
  //select options
  const instrumenOptions = [
    { value: "1", displayText: "none" },
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
    { value: "0", displayText: "Atm select" },
    { value: "1", displayText: "ATM-100" },
    { value: "2", displayText: "ATM-50" },
    { value: "3", displayText: "ATM" },
    { value: "4", displayText: "ATM+50" },
    { value: "5", displayText: "ATM+100" },
  ];
  const strikeCriteriaOptions = [
    { value: "1", displayText: "ATM Type" },
    { value: "2", displayText: "Closest Premium" },
  ];
  const takeProfitOptions = [
    { value: "1", displayText: "TP %" },
    { value: "2", displayText: "TP Pts" },
    { value: "3", displayText: "TP Spot Pts" },
    { value: "4", displayText: "TP Spot %" },
  ];
  const stopLossOptions = [
    { value: "1", displayText: "SL %" },
    { value: "2", displayText: "SL Pts" },
    { value: "3", displayText: "SL Spot Pts" },
    { value: "4", displayText: "SL Spot %" },
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
  const reEntryOptions = [
    { value: "1", displayText: "Re-Cost" },
    { value: "2", displayText: "Re-Execute" },
  ];
  const overAllOptions = [
    { value: "1", displayText: "None" },
    { value: "2", displayText: "MTM" },
    { value: "3", displayText: "Premium %" },
  ];

  const [strategy, setStrategy] = useState(data);
  const [Newleg, setNewleg] = useState(legData);

  useEffect(() => {
    setStrategy(data);
  }, [data]);
  let current_time = moment(new Date()).format("hh:mm A"); // Formats current time in 12-hour format with AM/PM
  let end_time = moment().hour(15).minute(15).format("HH:mm");
  const legStateManage = (key, e) => {
    const value = key === "quantity" ? Number(e.target.value) : e.target.value;
    setNewleg({ ...Newleg, [key]: e.target.value });
  };

  const updateStrategyAttribute = (property, newValue) => {
    setStrategy((prevStrategy) => ({
      ...prevStrategy,
      [property]: newValue,
    }));
  };

  const addNewLeg = () => {
    console.log("legs", Newleg, strategy);

    setStrategy((prevStrategy) => {
      // Check if the maximum number of legs (9 in this case) has been reached
      if (!Newleg.quantity) {
        // Handle the case where leg.quantity is not set or falsy
        StemToast("Quantity is required for a new leg", "error");
        return prevStrategy;
      }
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

  const handleTrialStopLossChange = (legIndex, axis, value) => {
    setStrategy((prevStrategy) => {
      // Clone the legs array
      const updatedLegs = [...prevStrategy.legs];

      // Convert value to number if necessary
      const numericValue = Number(value);

      // Update the specific leg's trialStopLossValue
      updatedLegs[legIndex] = {
        ...updatedLegs[legIndex],
        trialStopLossValue: {
          ...updatedLegs[legIndex].trialStopLossValue, // Corrected property name here
          [axis]: numericValue,
        },
      };

      // Return the updated strategy
      return { ...prevStrategy, legs: updatedLegs };
    });
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

  return (
    <>
      <div className="mb-2">
        <div className="row">
          <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
            <StemInput
              label={"Straddle Name:"}
              placeholder={"Straddle Name:"}
              value={strategy.name}
              handleChange={(e) =>
                updateStrategyAttribute("name", e.target.value)
              }
            />
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
                        ? (strategy.entryTime = current_time)
                        : strategy.entryTime || "9:15"
                    }
                    min="09:15"
                    max="16:00"
                    onChange={(e) => {
                      // Validate the time to ensure it's within the allowed range
                      const time = e.target.value;
                      if (time >= "09:15" && time <= "15:59") {
                        updateStrategyAttribute("entryTime", time);
                      } else {
                        // Optionally, reset the value or provide feedback to the user
                        updateStrategyAttribute("entryTime", "09:15");
                        // You might want to alert the user that the entered time is out of bounds
                      }
                    }}
                    disabled={strategy.immediate}
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
                  </div>
                </div>
                <div className="col">
                  <label className="mb-0">End Time: </label>
                  <input
                    type="time"
                    className="form-control"
                    value={
                      strategy.immediate
                        ? (strategy.endTime = end_time)
                        : strategy.endTime
                    }
                    onChange={(e) => {
                      // Validate the time to ensure it's within the allowed range
                      const time = e.target.value;
                      if (time >= "09:15" && time <= "15:15") {
                        updateStrategyAttribute("endTime", time);
                      } else {
                        // Optionally, reset the value or provide feedback to the user
                        updateStrategyAttribute("endTime", "15:15");
                        // You might want to alert the user that the entered time is out of bounds
                      }
                    }}
                    disabled={strategy.immediate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="text-center shadow-none mb-3 mt-3 addleg-card">
          <Card.Body>
            <div className="row text-start">
              <div className="col">
                <StemSelect
                  label={"Instrument:"}
                  value={Newleg.instrument}
                  handleChange={(e) => legStateManage("instrument", e)}
                  options={instrumenOptions}
                />
              </div>
              <div className="col">
                <StemSelect
                  label={"Segments:"}
                  value={Newleg.segment}
                  handleChange={(e) => legStateManage("segment", e)}
                  options={segmentOptions}
                />
              </div>
              <div className="col">
                <StemSelect
                  label={"Position:"}
                  value={Newleg.position}
                  handleChange={(e) => legStateManage("position", e)}
                  options={positionOptions}
                />
              </div>
              <div className="col">
                <StemSelect
                  label={"Option Type:"}
                  value={Newleg.instrumentType}
                  handleChange={(e) => legStateManage("instrumentType", e)}
                  options={optionTypeOptions}
                />
              </div>
              <div className="col">
                <div className="mb-1">
                  <StemSelect
                    label={"Strike Criteria:"}
                    value={Newleg.strike_type}
                    handleChange={(e) => legStateManage("strikeType", e)}
                    options={strikeCriteriaOptions}
                  />
                </div>
                {Newleg.strikeType === "Closest Premium" ? (
                  <>
                    <StemPlaceHolderInput
                      className="form-control"
                      type="number"
                      placeholder="closest premium"
                      value={Newleg.strikeClosestValue}
                      handleChange={(e) =>
                        legStateManage("strikeClosestValue", e)
                      }
                    />
                  </>
                ) : (
                  <>
                    <div className="col">
                      <StemSelect
                        label={"Strike Type:"}
                        value={Newleg.strike_value}
                        handleChange={(e) => legStateManage("strikeValue", e)}
                        options={strikeTypeOptions}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="col">
                <StemInput
                  type="number"
                  label={"Total Lots:"}
                  value={Newleg.quantity}
                  handleChange={(e) => legStateManage("quantity", e)}
                  placeholder={"lot-Size"}
                />
              </div>
              <div className="col">
                <Button onClick={addNewLeg} className="mt-3">
                  Add-Leg
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>

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
              <>
                <div key={i}>
                  <Card className="shadow-sm mb-4">
                    <Card.Body>
                      <div className="row">
                        <div className="col">
                          <StemSelect
                            label={"Instruments:"}
                            value={leg.instrument}
                            handleChange={(e) =>
                              handleLegChange(i, "instrument", e.target.value)
                            }
                            options={instrumenOptions}
                          />
                        </div>
                        <div className="col">
                          <StemSelect
                            label={"Segments:"}
                            value={leg.segment}
                            handleChange={(e) =>
                              handleLegChange(i, "segment", e.target.value)
                            }
                            options={segmentOptions}
                          />
                        </div>
                        <div className="col">
                          <StemSelect
                            label={"Positions:"}
                            value={leg.position}
                            handleChange={(e) =>
                              handleLegChange(i, "position", e.target.value)
                            }
                            options={positionOptions}
                          />
                        </div>
                        <div className="col">
                          <StemSelect
                            label={"Option Type:"}
                            value={leg.instrumentType}
                            handleChange={(e) =>
                              handleLegChange(
                                i,
                                "instrumentType",
                                e.target.value
                              )
                            }
                            options={optionTypeOptions}
                          />
                        </div>
                        <div className="col">
                          <StemSelect
                            label={"Strike Criteria"}
                            value={leg.strikeType}
                            handleChange={(e) =>
                              handleLegChange(i, "strikeType", e.target.value)
                            }
                            options={strikeCriteriaOptions}
                          />
                          {leg.strikeType === "Closest Premium" ? (
                            <>
                              <StemInput
                                type="number"
                                value={leg.strikeClosestValue}
                                handleChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "strike_Closest_Value",
                                    e.target.value
                                  )
                                }
                              />
                            </>
                          ) : (
                            <>
                              <StemSelect
                                options={strikeTypeOptions}
                                value={leg.strikeValue}
                                handleChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "stirkeValue",
                                    e.target.value
                                  )
                                }
                              />
                            </>
                          )}
                        </div>
                        {/* takeprfit */}
                        <div className="col">
                          <StemCheckBox
                            label={leg.takeProfit ? "" : "Target"}
                            checked={leg.takeProfit}
                            handleChange={(e) =>
                              handleLegChange(i, "takeProfit", e.target.checked)
                            }
                          />
                          {leg.takeProfit ? (
                            <>
                              <StemSelect
                                value={leg.takeProfitType}
                                placeholder="Target Type"
                                handleChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "takeProfitType",
                                    e.target.value
                                  )
                                }
                                options={takeProfitOptions}
                              />
                              <StemInput
                                type="number"
                                placeholder="lot-size"
                                value={leg.takeProfitValue}
                                handleChange={(e) =>
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
                        </div>
                        {/* stoploss */}
                        <div className="col">
                          <StemCheckBox
                            label={leg.stopLoss ? "" : "Stop-Loss"}
                            checked={leg.stopLoss}
                            handleChange={(e) =>
                              handleLegChange(i, "stopLoss", e.target.checked)
                            }
                          />
                          {leg.stopLoss ? (
                            <>
                              <StemSelect
                                value={leg.stopLossType}
                                placeholder="Stop Loss Type"
                                handleChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "stopLossType",
                                    e.target.value
                                  )
                                }
                                options={stopLossOptions}
                              />
                              <StemInput
                                type="number"
                                placeholder="lot-size"
                                value={leg.stopLossValue}
                                handleChange={(e) =>
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
                        </div>
                        {/* trailingStopLoss */}
                        <div className="col">
                          <StemCheckBox
                            label={leg.trialStopLoss ? "" : "Trail-Stop-Loss"}
                            checked={leg.trialStopLoss}
                            handleChange={(e) =>
                              handleLegChange(
                                i,
                                "trialStopLoss",
                                e.target.checked
                              )
                            }
                          />
                          {leg.trialStopLoss ? (
                            <>
                              <StemSelect
                                value={leg.trialStopLossType}
                                placeholder="Stop Loss Type"
                                handleChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "trialStopLossType",
                                    e.target.value
                                  )
                                }
                                options={traiLStopLossOptions}
                              />
                              <div className="row">
                                <div className="col">
                                  <StemPlaceHolderInput
                                    type="number"
                                    placeholder="X value"
                                    value={leg.trialStopLossValue.x}
                                    handleChange={(e) =>
                                      handleTrialStopLossChange(
                                        i,
                                        "x",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="col">
                                  <StemPlaceHolderInput
                                    type="number"
                                    placeholder="Y value"
                                    value={leg.trialStopLossValue.y}
                                    handleChange={(e) =>
                                      handleTrialStopLossChange(
                                        i,
                                        "y",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </>
                          ) : (
                            <div />
                          )}
                        </div>
                        {/* wait and trade */}
                        <div className="col">
                          <StemCheckBox
                            label={leg.waitAndTrade ? "" : "wait and trade"}
                            checked={leg.waitAndTrade}
                            handleChange={(e) =>
                              handleLegChange(
                                i,
                                "waitAndTrade",
                                e.target.checked
                              )
                            }
                          />
                          {leg.waitAndTrade ? (
                            <>
                              <StemSelect
                                value={leg.waitAndTradeType}
                                placeholder="Target Type"
                                handleChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "waitAndTradeType",
                                    e.target.value
                                  )
                                }
                                options={waitAndTradeOptions}
                              />
                              <StemInput
                                type="number"
                                className="form-control"
                                placeholder="lot-size"
                                value={leg.waitAndTradeValue}
                                handleChange={(e) =>
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
                        </div>
                        {/* renenrty */}
                        <div className="col">
                          <StemCheckBox
                            label={leg.reEntry ? "" : "Re-Entry"}
                            checked={leg.reEntry}
                            disabled={!leg.stopLoss}
                            handleChange={(e) =>
                              handleLegChange(i, "reEntry", e.target.checked)
                            }
                          />
                          {leg.reEntry ? (
                            <>
                              <StemSelect
                                value={leg.reEntryType}
                                placeholder="Target Type"
                                handleChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "reEntryType",
                                    e.target.value
                                  )
                                }
                                options={reEntryOptions}
                              />
                              <StemInput
                                type="number"
                                className="form-control"
                                placeholder="lot-size"
                                value={leg.reEntryValue}
                                handleChange={(e) =>
                                  handleLegChange(
                                    i,
                                    "reEntryValue",
                                    e.target.value
                                  )
                                }
                              />
                            </>
                          ) : (
                            <div />
                          )}
                        </div>
                        {/* lots */}
                        <div className="col">
                          <StemInput
                            type="number"
                            label="Lots"
                            placeholder="lot-size"
                            value={leg.quantity}
                            handleChange={(e) =>
                              handleLegChange(i, "quantity", e.target.value)
                            }
                          />
                        </div>

                        <div className="col">
                          <Button
                            variant="primary"
                            onClick={() => removeLeg(i)}
                          >
                            <FaTrash size={15} />
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </>
            ))}
          </>
        ) : (
          <div />
        )}
        {/* overall stuff */}
        <div className="row">
          <div className="col-md-4">
            <Card>
              <Card.Body>
                <div className="row">
                  <div className="col">
                    <div className="mb-1">
                      <StemSelect
                        label="Stop Loss"
                        value={strategy.overAllStopLossType}
                        placeholder="Target Type"
                        handleChange={(e) =>
                          updateStrategyAttribute(
                            "overAllStopLossType",
                            e.target.value
                          )
                        }
                        options={overAllOptions}
                      />
                    </div>
                    <div className="mb-1">
                      <StemPlaceHolderInput
                        type="number"
                        value={strategy.overAllStopLossValue}
                        disabled={
                          !strategy.overAllStopLossType ||
                          strategy.overAllStopLossType === "None"
                        }
                        placeholder="OverAll Type Stop Loss"
                        handleChange={(e) =>
                          updateStrategyAttribute(
                            "overAllStopLossValue",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="mb-1">
                      <div className="row">
                        <div className="col">
                          <StemCheckBox
                            label={"SL ReEntry"}
                            checked={strategy.stopLossReEntry}
                            handleChange={(e) =>
                              updateStrategyAttribute(
                                "stopLossReEntry",
                                e.target.checked
                              )
                            }
                          />
                        </div>
                        <div className="col">
                          <input
                            className="form-control"
                            disabled={!strategy.stopLossReEntry}
                            value={strategy.stopLossReEntryValue}
                            type="number"
                            onChange={(e) =>
                              updateStrategyAttribute(
                                "stopLossReEntryValue",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* overAllMTMValue */}
                  <div className="col">
                    <div className="mb-1">
                      <StemSelect
                        label="Over All Target"
                        value={strategy.overAllMTMType}
                        handleChange={(e) =>
                          updateStrategyAttribute(
                            "overAllMTMType",
                            e.target.value
                          )
                        }
                        options={overAllOptions}
                      />
                    </div>
                    <div className="mb-1">
                      <StemPlaceHolderInput
                        className="form-control mb-1"
                        disabled={
                          !strategy.overAllMTMType ||
                          strategy.overAllMTMType === "None"
                        }
                        placeholder="OverAll MTM Type"
                        value={strategy.overAllMTMValue}
                        type="number"
                        handleChange={(e) =>
                          updateStrategyAttribute(
                            "overAllMTMValue",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="row">
                      <div className="col">
                        <StemCheckBox
                          type="checkbox"
                          label={"Target ReEntry"}
                          checked={strategy.targetReEntry}
                          handleChange={(e) =>
                            updateStrategyAttribute(
                              "targetReEntry",
                              e.target.checked
                            )
                          }
                        />
                      </div>
                      <div className="col">
                        <StemPlaceHolderInput
                          className="form-control"
                          disabled={!strategy.targetReEntry}
                          value={strategy.targetReEntryValue}
                          type="number"
                          handleChange={(e) =>
                            updateStrategyAttribute(
                              "targetReEntryValue",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-8">
            <h5 className="">Days to Execute</h5>
            <Card>
              <Card.Body>
                <div className="row">
                  {strategy.daysToExecute.map((day, index) => {
                    const dayName = Object.keys(day)[0];
                    return (
                      <Button
                        key={index}
                        className="col m-2 d-flex align-items-center"
                        onClick={() => handleDayClick(dayName)}
                        variant={day[dayName] ? "light" : "outline-dark"}
                      >
                        <span className="pe-1">
                          {day[dayName] ? (
                            <FaRegCircleCheck className="text-success" />
                          ) : (
                            ""
                          )}
                        </span>
                        <span>
                          {dayName.charAt(0).toUpperCase() + dayName.slice(1)}{" "}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <Button onClick={() => onSave(strategy)}>
        {mode === "EDIT" ? "Update Strategy" : "Create Strategy"}
      </Button>
    </>
  );
};

export default StrategyForm;
