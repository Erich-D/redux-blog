import { useState, useEffect } from 'react';

type secondsRow = [string,number];
type TimeAgoRow = [number,any,number];

const secondsTable: secondsRow[] = [
  ['year', 60 * 60 * 24 * 365],
  ['month', 60 * 60 * 24 * 30],
  ['week', 60 * 60 * 24 * 7],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
];
const rtf = new Intl.RelativeTimeFormat(undefined, {numeric: 'auto'});

function getTimeAgo(date:Date):TimeAgoRow {
    const seconds = Math.round((date.getTime() - new Date().getTime()) / 1000);
    const absSeconds = Math.abs(seconds);
    let bestUnit:string|undefined, bestTime:number|undefined, bestInterval:number|undefined;
    for (let [unit, unitSeconds] of secondsTable) {
        if (absSeconds >= unitSeconds) {
        bestUnit = unit;
        bestTime = Math.round(seconds / unitSeconds);
        bestInterval = Math.min(unitSeconds / 2, 60 * 60 * 24);
        break;
        }
    };
    if (!bestUnit) {
        bestUnit = 'second';
        bestTime = seconds / 10 * 10;
        bestInterval = 10;
    }
    return [bestTime!, bestUnit, bestInterval!];
}

type TimeAgoDef = {isoDate:string}

export default function TimeAgo({isoDate}:TimeAgoDef) {
    const date = new Date(Date.parse(isoDate));
    const [time, unit, interval] = getTimeAgo(date);
    const [, setUpdate] = useState(0);

    useEffect(() => {
        const timerId = setInterval(
        () => setUpdate(update => update + 1),
        interval * 1000
        );
        return () => clearInterval(timerId);
    }, [interval]);

    return (
        <span title={date.toString()}>{rtf.format(time, unit)}</span>
    );
}