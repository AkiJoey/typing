import React from 'react';
import './footer.less';

const Footer = (): JSX.Element => {
	return (
		<div id="footer">
			<div id="copyright">©2020 By <a href="https://akijoey.com">AkiJoey</a></div>
			<div id="framework">Power by <a href="https://spring.io">Spring</a> + <a href="https://reactjs.org">React</a></div>
		</div>
	);
}

export default Footer;