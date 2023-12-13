import StemLayout from "@/Layout/Layout";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import StemToast from "@/components/reusables/js/toast";
import moment from "moment/moment";
import StrategyOperations from "@/services/startegy";
import { useSelector } from "react-redux";
import StrategyForm from "@/components/forms/strategyForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const StemStrategyComponent = () => {
  const { userData } = useSelector((state) => ({ ...state }));
  const router = useRouter();
  const { query } = router;
  const { startegySave, strategyById, strategyEdit } = StrategyOperations();

  let straddleStrategy = {
    name: "",
    entryTime: "9:15",
    endTime: "",
    immediate: false,
    legs: [],
    daysToExecute: [
      { all: false },
      { monday: false },
      { tuesday: false },
      { wednesday: false },
      { thursday: false },
      { friday: false },
    ], // e.g., 30 (number of days),
    status: false,
    // overall mtms and renteries
    overAllStopLossType: "",
    overAllStopLossValue: 0,
    overAllMTMType: "",
    overAllMTMValue: 0,
    // rentries
    stopLossReEntry: false,
    stopLossReEntryValue: 0,
    targetReEntry: false,
    targetReEntryValue: 0,
    user: userData ? userData.user.id : "",
  };

  const newLegTemplate = {
    instrument: "",
    instrumentType: "",
    entry_type: "time",
    expiry: "current",
    index: 0,
    segment: "",
    strikeType: "",
    strikeValue: "",
    strikeClosestValue: 0,
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
    trialStopLossValue: { x: "", y: "" },
    waitAndTrade: false,
    waitAndTradeType: "",
    waitAndTradeValue: 0,
    reEntry: false,
    reEntryType: "",
    reEntryValue: 0,
  };
  const [strategy, setStrategy] = useState(straddleStrategy);
  const [mode, setMode] = useState("");
  useEffect(() => {
    const id = query.id;
    if (id) {
      strategyById(id).then((res) => {
        setStrategy(res.data);
        setMode("EDIT");
      });
    }
  }, [query]);

  const removeIdFromStrategy = (strategy) => {
    const { _id, __v, ...strategyWithoutId } = strategy;
    return strategyWithoutId;
  };

  const handleSaveStrategy = (strategy) => {
    console.log("strategy", strategy);
    if (mode === "EDIT") {
      strategyEdit(strategy._id, removeIdFromStrategy(strategy))
        .then(() => {
          StemToast("Successfully Edited");
          router.push("/dashboard")
        })
        .catch(() => {
          StemToast("please try again", "error");
        });
    } else {
      if (!strategy.name) {
        StemToast("Please fill the Strategy Name", "error");
      } else if (strategy.legs.length >= 9) {
        StemToast("selected legs need to below or equal to 9", "error");
      } else if (moment(strategy.endTime).isBefore(strategy.entryTime)) {
        StemToast("Please select valid end time", "error");
      } else if (moment(strategy.entryTime) < moment("08:00 ,HH:mm a")) {
        StemToast("Stock order places after 8 am");
      } else {
        startegySave(strategy)
          .then((res) => {
            console.log(res.data);
            StemToast("Succesfully Submitted");
          })
          .catch(() => {
            StemToast("please try again", "error");
          });
      }
    }
  };

  return (
    <>
      <StemLayout>
        <StrategyForm
          mode={mode}
          data={strategy}
          legData={newLegTemplate}
          onSave={(strategy) => handleSaveStrategy(strategy)}
        />
      </StemLayout>
    </>
  );
};
export default StemStrategyComponent;
