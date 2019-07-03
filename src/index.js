import React from 'react';
import ReactDOM from 'react-dom';
import ReadMore from './ReadMore';
import text from './data';

ReactDOM.render(
	<ReadMore>
		<p
			dangerouslySetInnerHTML={{
				__html: text
			}}
		/>
	</ReadMore>,
	document.getElementById('root')
);
