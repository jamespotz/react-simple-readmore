import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReadMore from './ReadMore';
import text from './data';

const App = () => {
	const [shown, setShown] = useState(false);

	return (
		<ReadMore
			onClick={value => {
				setShown(value);
			}}
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
