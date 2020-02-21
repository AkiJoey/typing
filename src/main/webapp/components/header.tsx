import React from 'react';
import './header.less';

import { Avatar, Tooltip } from 'antd';

const Header = (): JSX.Element => {
	return (
		<div id="header">
			<div id="nav">
				<img id="logo" src="/favicon.ico" alt="logo" />
				<div id="title">Typing</div>
				<div id="btn">
					<Tooltip title="AkiJoey">
						<a href="https://akijoey.com"><Avatar size="large" src="/avatar.png" /></a>
					</Tooltip>
				</div>
			</div>
		</div>
	);
}

export default Header;