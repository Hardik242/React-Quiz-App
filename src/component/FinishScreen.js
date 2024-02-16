export default function FinishScreen({points, maxPoints, highscore, dispatch}) {
    const percentage = (points / maxPoints) * 100;

    let emoji = (percentage) => {
        if (percentage === 100) return "🏅";
        else if (percentage >= 80 && percentage < 100) return "🎉";
        else if (percentage >= 50 && percentage < 80) return "🙃";
        else if (percentage >= 20 && percentage < 50) return "☹️";
        else return "🤦‍♂️";
    };
    return (
        <>
            <p className="result">
                <span>{emoji(percentage)}</span> You scored{" "}
                <strong>{points}</strong> out of {maxPoints} (
                {Math.round(percentage)}%)
            </p>
            <p className="highscore">(Highscore: {highscore})</p>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({type: "restart"})}>
                Restart Quiz
            </button>
        </>
    );
}
