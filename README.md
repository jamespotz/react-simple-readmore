# React Simple Readmore

React component for animating height using Transitions.

## Quick start

Get it from npm

```
$ npm install --save @jamespotz/react-simple-readmore
```

## Note

For React >= 16.8 because of Hooks.

## How to use

```js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReadMore from '@jamespotz/react-simple-readmore';
import text from './data';

const App = () => {
	const [shown, setShown] = useState(false);

	return (
		<ReadMore
			onClick={value => setShown(value)}
			btn={
				<button
					style={{
						background: `${shown ? 'red' : 'blue'}`,
						padding: '10px 15px',
						color: '#fff'
					}}
				>
					{shown ? 'Read Less' : 'Read More'}
				</button>
			}
		>
			<p
				dangerouslySetInnerHTML={{
					__html: text
				}}
			/>
		</ReadMore>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
```

## Demo

Live Demo: [https://codesandbox.io/embed/kind-night-bqd8e](https://codesandbox.io/embed/kind-night-bqd8e)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:3000`](http://localhost:3000) in your browser of choice.

## API

| Prop               | Type                                             |   Default |
| :----------------- | :----------------------------------------------- | --------: |
| minHeight          | Number                                           |        50 |
| displayHeight      | Number/String                                    |    'auto' |
| btnText            | Text/Component (props ignored if btn is present) |           |
| btnTextShown       | Text/Component (props ignored if btn is present) |           |
| timing             | Number                                           |       350 |
| timingFunction     | STRING                                           | 'ease-in' |
| defaultShownOnLess | Text/Component                                   |           |
| btn                | Component                                        |           |
| onClick            | Function                                         |           |
