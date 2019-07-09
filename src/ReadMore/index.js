import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

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
	btn,
	btnClassName,
	onClick,
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
	const [maxAvailableHeight, setMaxAvailableHeight] = useState(0);

	useEffect(() => {
		if (minHeight) setHeight(minHeight);
		if (displayHeight) setFinalHeight(displayHeight);
		if (btnText) setBtnLabel(btnText);
		if (btnTextShown) setBtnLabelShown(btnTextShown);
		if (timing) setDuration(timing);
		if (timingFunction) setEasing(timingFunction);
	}, [btnText, btnTextShown, displayHeight, minHeight, timing, timingFunction]);

	useEffect(() => {
		if (_container.current.scrollHeight === 0) return;
		if (_container.current.scrollHeight === maxAvailableHeight) return;
		if (rest.children) {
			setMaxAvailableHeight(_container.current.scrollHeight);
		}
	}, [maxAvailableHeight, rest.children]);

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

		setShown(true);
		if (typeof onClick === 'function') onClick.call(null, true);

		animate(() => {
			setHeight(finalHeight);
		}, duration);
	};

	const hideContents = () => {
		const newHeight = getContainerHeight();
		setHeight(newHeight);
		if (typeof onClick === 'function') onClick.call(null, false);

		animate(() => {
			setHeight(beforeHeight);
		}, 1);

		animate(() => {
			setHeight(beforeHeight);
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
		return maxAvailableHeight <= height;
	};

	const showChildren = () => {
		if (defaultShownOnLess && !show) return defaultShownOnLess;
		return rest.children;
	};

	const renderBtn = () => {
		const shouldHideBtn = hideBtn();
		if (btn) {
			const newBtn = React.cloneElement(btn, {
				onClick: toggleHeight
			});
			return shouldHideBtn ? null : newBtn;
		}

		return shouldHideBtn ? null : (
			<button onClick={toggleHeight} className={btnClassName}>
				{show ? btnLabelShown : btnLabel}
			</button>
		);
	};

	return (
		<div>
			<div
				ref={container}
				style={{ height, ...getDefaultStyle(duration, easing) }}
			>
				{showChildren()}
			</div>
			{renderBtn()}
			<div
				style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}
				ref={_container}
			>
				{rest.children}
			</div>
		</div>
	);
};

ReadMore.propTypes = {
	minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	displayHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	btnText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	btnTextShown: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	timing: PropTypes.number,
	timingFunction: PropTypes.string,
	defaultShownOnLess: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	btn: PropTypes.element,
	onClick: PropTypes.func,
	children: PropTypes.element.isRequired
};

export default ReadMore;
