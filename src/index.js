import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReadMore from './ReadMore';
import text from './data';
import truncate from 'lodash/truncate';

const App = () => {
	const [shown, setShown] = useState(false);

	return (
		<div style={{ width: 500 }}>
			<ReadMore
				minHeight={250}
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
				fade
			>
				<p
					dangerouslySetInnerHTML={{
						__html: text
					}}
				/>
			</ReadMore>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
