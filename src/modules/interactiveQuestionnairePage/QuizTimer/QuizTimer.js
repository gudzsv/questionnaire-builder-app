import { useEffect, useState } from 'react';
import s from './QuizTimer.module.scss';

export default function QuizTimer({ isRunning }) {
	const [timer, setTimer] = useState(0);

	useEffect(() => {
		if (isRunning) {
			const intervalId = setInterval(() => {
				setTimer((prev) => prev + 1);
			}, 1000);
			return () => clearInterval(intervalId);
		}
	}, [isRunning]);

	const hours = Math.floor(timer / 3600);
	const minutes = Math.floor((timer % 3600) / 60);
	const seconds = timer % 60;

	return (
		<p className={s.timer}>
			{`${hours.toString().padStart(2, '0')}:${minutes
				.toString()
				.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
		</p>
	);
}
