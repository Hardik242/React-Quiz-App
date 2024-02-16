import {useEffect, useReducer} from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import ErrorView from "./ErrorView.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextButton from "./NextButton.js";
import Score from "./Score.js";
import FinishScreen from "./FinishScreen.js";
import Footer from "./Footer.js";
import Timer from "./Timer.js";

const SECS_PER_QUESTION = 40;

const initialState = {
    questions: [],

    //'loading','error','ready','active','finished'
    status: "loading",

    index: 0,

    answer: null,

    points: 0,

    highscore: 0,

    secRemains: 0,
};

function reducer(state, {type, payload}) {
    switch (type) {
        case "dataReceived":
            return {
                ...state,
                questions: payload,
                status: "ready",
            };

        case "dataFailed":
            console.log(payload);
            return {...state, status: "error"};

        case "start":
            return {
                ...state,
                status: "active",
                secRemains: SECS_PER_QUESTION * state.questions.length,
            };

        case "calSeconds":
            return {
                ...state,
                secRemains: SECS_PER_QUESTION * state.questions.length,
            };

        case "newAnswer":
            const question = state.questions[state.index];
            return {
                ...state,
                answer: payload,
                points:
                    payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };

        case "nextQuestion":
            return {...state, index: state.index + 1, answer: null};

        case "finish":
            return {
                ...state,
                status: "finished",
                highscore:
                    state.points > state.highscore
                        ? state.points
                        : state.highscore,
            };

        case "restart":
            return {
                ...state,
                status: "ready",
                index: 0,
                answer: null,
                points: 0,
                secRemains: 10,
            };

        case "clock":
            return {
                ...state,
                secRemains: state.secRemains - 1,
                status: state.secRemains === 0 ? "finished" : state.status,
            };

        default:
            throw new Error("Action Not found");
    }
}

export default function App() {
    const [
        {questions, status, index, answer, points, highscore, secRemains},
        dispatch,
    ] = useReducer(reducer, initialState);

    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({type: "dataReceived", payload: data}))
            .then(() => dispatch({type: "calSeconds"}))
            .catch((error) => dispatch({type: "dataFailed", payload: error}));
    }, []);

    const numQuestions = questions.length;
    const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

    return (
        <div className="app">
            <Header />

            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <ErrorView />}
                {status === "ready" && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                        secRemains={secRemains}
                    />
                )}
                {status === "active" && (
                    <>
                        <Score
                            index={index}
                            numQuestions={numQuestions}
                            points={points}
                            maxPoints={maxPoints}
                            answer={answer}
                        />
                        <Question
                            currQuestion={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <Timer
                                dispatch={dispatch}
                                secRemains={secRemains}
                            />
                            <NextButton
                                dispatch={dispatch}
                                answer={answer}
                                index={index}
                                numQuestions={numQuestions}
                            />
                        </Footer>
                    </>
                )}

                {status === "finished" && (
                    <FinishScreen
                        points={points}
                        maxPoints={maxPoints}
                        highscore={highscore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}
