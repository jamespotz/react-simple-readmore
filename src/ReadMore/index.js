import React, { useState, useEffect, useRef } from 'react';

const getDefaultStyle = (duration, easing) => {
	return {
		overflow: 'hidden',
		transition: `height ${duration}ms ${easing}`
	};
};

const ReadMore = ({
	minHeight,
	displayHeight,
	btnText,
	btnTextShown,
	timing,
	timingFunction,
	defaultShownOnLess,
	...rest
}) => {
	const container = useRef();
	const _container = useRef();
	const [height, setHeight] = useState(50);
	const [beforeHeight, setBeforeHeight] = useState(50);
	const [finalHeight, setFinalHeight] = useState('auto');
	const [show, setShown] = useState(false);
	const [duration, setDuration] = useState(350);
	const [easing, setEasing] = useState('ease-in');
	const [btnLabel, setBtnLabel] = useState('Read More');
	const [btnLabelShown, setBtnLabelShown] = useState('Read Less');

	useEffect(() => {
		if (minHeight) setHeight(minHeight);
		if (displayHeight) setFinalHeight(displayHeight);
		if (btnText) setBtnLabel(btnText);
		if (btnTextShown) setBtnLabelShown(btnTextShown);
		if (timing) setDuration(timing);
		if (timingFunction) setEasing(timingFunction);
	}, [btnText, btnTextShown, displayHeight, minHeight, timing, timingFunction]);

	const getContainerHeight = () => {
		const target = _container.current;
		return `${target.scrollHeight}px`;
	};

	const animate = (fn, delay) => {
		const start = new Date().getTime();

		const loop = () => {
			const current = new Date().getTime();
			const elapsedTime = current - start;

			elapsedTime >= delay ? fn.call() : requestAnimationFrame(loop);
		};

		requestAnimationFrame(loop);
		return;
	};

	const showContents = () => {
		const newHeight = getContainerHeight();
		setBeforeHeight(height);
		setHeight(newHeight);

		if (defaultShownOnLess) {
			setShown(true);
			animate(() => {
				setHeight(finalHeight);
			}, duration);
			return;
		}

		animate(() => {
			setHeight(finalHeight);
			setShown(true);
		}, duration);
	};

	const hideContents = () => {
		const { current } = container;
		setHeight(current.scrollHeight);

		animate(() => {
			setHeight(beforeHeight);
		}, 1);

		animate(() => {
			setShown(false);
		}, duration);
	};

	const toggleHeight = () => {
		if (show) {
			hideContents();
			return;
		}

		showContents();
	};

	const hideBtn = () => {
		if (!_container.current) return false;
		return _container.current.scrollHeight <= height;
	};

	const showChildren = () => {
		if (defaultShownOnLess && !show) return defaultShownOnLess;
		return rest.children;
	};

	return (
		<div>
			<div
				ref={container}
				style={{ height, ...getDefaultStyle(duration, easing) }}
			>
				{showChildren()}
			</div>
			{hideBtn() ? null : (
				<button onClick={toggleHeight} className={rest.btnClassName}>
					{show ? btnLabelShown : btnLabel}
				</button>
			)}
			<div
				style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}
				ref={_container}
			>
				{rest.children}
			</div>
		</div>
	);
};

export default ReadMore;
