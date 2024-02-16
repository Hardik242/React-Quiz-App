import {useEffect} from "react";

export default function Timer({dispatch, secRemains}) {
    const min = Math.floor(secRemains / 60);
    const sec = secRemains % 60;

    useEffect(
        function () {
            const id = setInterval(() => {
                dispatch({type: "clock"});
            }, 1000);

            return () => clearInterval(id);
        },
        [dispatch]
    );
    return (
        <div className="timer">
            {min < 10 ? "0" + min : min}:{sec < 10 ? "0" + sec : sec}
        </div>
    );
}
