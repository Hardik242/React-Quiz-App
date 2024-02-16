export default function Question({currQuestion, dispatch, answer}) {
    //     console.log(question);
    const {question, options, correctOption, points, id} = currQuestion;
    const isAnswered = answer !== null;
    return (
        <div>
            <h4>{question}</h4>

            <div className="options">
                {options.map((option, index) => (
                    <button
                        className={`btn btn-option ${
                            index === answer ? "answer" : ""
                        } ${
                            isAnswered &&
                            (index === correctOption ? "correct" : "wrong")
                        }`}
                        key={option}
                        disabled={isAnswered}
                        onClick={() =>
                            dispatch({type: "newAnswer", payload: index})
                        }>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
