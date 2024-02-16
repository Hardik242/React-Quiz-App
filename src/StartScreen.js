export default function StartScreen({numQuestions, dispatch, secRemains}) {
    const min = Math.floor(secRemains / 60);
    const sec = secRemains % 60;

    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{numQuestions} questions to test your React mastery</h3>
            <h3>
                Total Time: {min < 10 ? "0" + min : min}:
                {sec < 10 ? "0" + sec : sec} minutes
            </h3>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({type: "start"})}>
                Let's start
            </button>
        </div>
    );
}
