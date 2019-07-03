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
  label,
  labelShown,
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
    if (label) setBtnLabel(label);
    if (labelShown) setBtnLabelShown(labelShown);
    if (timing) setDuration(timing);
    if (timingFunction) setEasing(timingFunction);
  }, [displayHeight, label, labelShown, minHeight, timing, timingFunction]);

  const getContainerHeight = () => {
    const target = _container.current;
    return `${target.scrollHeight}px`;
  };

  const showContents = () => {
    const newHeight = getContainerHeight();
    setBeforeHeight(height);
    setHeight(newHeight);

    if (defaultShownOnLess) {
      setShown(true);
      setTimeout(() => {
        setHeight(finalHeight);
      }, duration);
      return;
    }

    setTimeout(() => {
      setHeight(finalHeight);
      setShown(true);
    }, duration);
  };

  const hideContents = () => {
    const {
      current
    } = container;
    setHeight(current.scrollHeight);
    setTimeout(() => {
      setHeight(beforeHeight);
    }, 1);
    setTimeout(() => {
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
    console.log(_container.current.scrollHeight);
    return _container.current.scrollHeight <= height;
  };

  const showChildren = () => {
    if (defaultShownOnLess && !show) return defaultShownOnLess;
    return rest.children;
  };

  return React.createElement("div", null, React.createElement("div", {
    ref: container,
    style: {
      height,
      ...getDefaultStyle(duration, easing)
    }
  }, showChildren()), hideBtn() ? null : React.createElement("button", {
    onClick: toggleHeight,
    className: rest.btnClassName
  }, show ? btnLabelShown : btnLabel), React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-9999px',
      left: '-9999px'
    },
    ref: _container
  }, rest.children));
};

export default ReadMore;