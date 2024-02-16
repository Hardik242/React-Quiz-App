import {useReducer, useState} from "react";

function reducer(state, action) {
    switch (action.type) {
        case "inc":
            return {...state, count: state.count + state.step};

        case "dec":
            return {...state, count: state.count - state.step};

        case "setCount":
            return {...state, count: action.payload};

        case "setStep":
            return {...state, step: action.payload};

        case "reset":
            return {count: 0, step: 1};

        default:
            throw new Error("Type not matched/ Unknown action type");
    }
}

function DateCounter() {
    // const [count, setCount] = useState(0);
    const initialState = {step: 1, count: 0};
    const [state, dispatch] = useReducer(reducer, initialState);
    const {count, step} = state;
    // const [step, setStep] = useState(1);

    // This mutates the date object.
    const date = new Date();
    date.setDate(date.getDate() + count);

    const dec = function () {
        dispatch({type: "dec"});
        // setCount((count) => count - 1);
        // setCount((count) => count - step);
    };

    const inc = function () {
        dispatch({type: "inc"});
        // setCount((count) => count + 1);
        // setCount((count) => count + step);
    };

    const defineCount = function (e) {
        dispatch({type: "setCount", payload: Number(e.target.value)});
        // setCount(Number(e.target.value));
    };

    const defineStep = function (e) {
        dispatch({type: "setStep", payload: Number(e.target.value)});
        // setStep(Number(e.target.value));
    };

    const reset = function () {
        // setCount(0);
        dispatch({type: "reset"});
        // setStep(1);
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="50"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={defineCount} />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default DateCounter;