import React, { Component } from 'react';
import './content.less';

import { message, Icon, Button, Input, Tooltip } from 'antd';
import axios from 'axios';

class Content extends Component {
	readonly state: any = {
		paragraph: [],
		index: 0,
		startTime: 0,
		currentTime: 0,
		keyCount: 0,
		wordCount: 0,
		errorCount: 0,
		complete: false,
		pronounce: '',
	}
	handleKeyDown = (e: any): void => {
		if (this.state.startTime === 0) {	// 设置初始状态 (开始计时, 显示翻译, 播放读音)
			let paragraph = this.state.paragraph;
			paragraph[0].visible = true;
			this.setState({
				startTime: new Date().getTime() / 1e3 - 0.5, // 防止超出上限 - 0.5 s
				pronounce: 'http://dict.youdao.com/speech?type=2&audio=' + paragraph[0].text,
				paragraph
			});
		}
		let key = this.refs[e.keyCode] as HTMLElement;	// 按键动态响应 (添加样式)
		if (key !== undefined) {
			key.style.background = '#4099ff';
			key.style.color = '#eee';
		}
		if (!this.state.complete) {
			this.setState({
				keyCount: this.state.keyCount + 1
			});
			if (e.keyCode === 32) {
				e.preventDefault();	// 阻止默认事件 (即阻止输入空格字符)
				let paragraph = this.state.paragraph;
				let index = this.state.index;
				paragraph[index].visible = false;	//设置当前单词的样式
				if (e.currentTarget.value === paragraph[index].text) {
					paragraph[index].color = '#32CD32';
					this.setState({
						wordCount: this.state.wordCount + 1
					});
				}
				else {
					paragraph[index].color = '#FF0000';
					this.setState({
						errorCount: this.state.errorCount + 1
					});
				}
				if (index === this.state.paragraph.length - 1) {	// 判断是否完成
					this.setState({
						complete: true
					});
					message.success('Complete.');
				}
				else {	// 设置下一个单词的样式 (字体颜色, 显示翻译, 播放读音)
					paragraph[++index].color = '#DA70D6';
					paragraph[index].visible = true;
					this.setState({
						pronounce: 'http://dict.youdao.com/speech?type=2&audio=' + paragraph[index].text
					});
				}
				this.setState({ paragraph, index });
				let input: any = this.refs.input;	// 清空输入框
				input.state.value = '';
			}
		}
		else {
			e.preventDefault();	// 完成时阻止默认事件
		}
	}
	handleKeyUp = (e: any): void => {
		let key = this.refs[e.keyCode] as HTMLElement;	// 按键动态响应 (删除样式)
		if (key !== undefined) {
			key.style.background = '';
			key.style.color = '';
		}
	}
	handleClick = (): void => {
		axios.get('http://localhost:8080/text')
		.then(response => {
			this.setState({
				paragraph: response.data,
				index: 0,
				startTime: 0,
				keyCount: 0,
				wordCount: 0,
				errorCount: 0,
				complete: false
			});
			console.log(response);
		})
		.catch(error => {
			message.error('Network error.');
			console.log(error);
		});
	}
	componentDidMount(): void {
		axios.post('http://localhost:8080/text')
		.then(response => {
			this.setState({
				paragraph: response.data
			});
			console.log(response);
		})
		.catch(error => {
			message.error('Network error.');
			console.log(error);
		});
		setInterval((): void => {
			if (!this.state.complete) {
				this.setState({
					currentTime: new Date().getTime() / 1e3
				});
			}
		}, 100);	// 计时器 0.1 s 刷新一次
	}
	render(): JSX.Element {
		const paragraph = this.state.paragraph.map((value: any, key: number): JSX.Element => {
			return (
				<Tooltip visible={value.visible} title={value.translation}>
					<span key={key} style={{color: value.color}}>{value.text}&nbsp;&nbsp;</span>
				</Tooltip>
			);
		});
		return (
			<div id="content">
				<div id="box">
					<div id="text">{paragraph}</div>
					<audio autoPlay={true} src={this.state.pronounce}></audio>
					<div id="input">
						<Input ref="input" placeholder="Start typing" size="large" onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} />
						<Button type="primary" size="large" onClick={this.handleClick}>Next<Icon type="tags" /></Button>
					</div>
					<div id="keyboard">
						<div className="key" ref="192"><p>~</p><p>`</p></div>
						<div className="key" ref="49"><p>!</p><p>1</p></div>
						<div className="key" ref="50"><p>@</p><p>2</p></div>
						<div className="key" ref="51"><p>#</p><p>3</p></div>
						<div className="key" ref="52"><p>$</p><p>4</p></div>
						<div className="key" ref="53"><p>%</p><p>5</p></div>
						<div className="key" ref="54"><p>^</p><p>6</p></div>
						<div className="key" ref="55"><p>&amp;</p><p>7</p></div>
						<div className="key" ref="56"><p>*</p><p>8</p></div>
						<div className="key" ref="57"><p>&#40;</p><p>9</p></div>
						<div className="key" ref="48"><p>&#41;</p><p>0</p></div>
						<div className="key" ref="189"><p>-</p><p>-</p></div>
						<div className="key" ref="187"><p>+</p><p>=</p></div>
						<div className="key right" ref="8" style={{width: '85px'}}><p>Backspace</p></div>
						<div className="key left" ref="9" style={{width: '85px'}}><p>Tab</p></div>
						<div className="key center" ref="81"><p>Q</p></div>
						<div className="key center" ref="87"><p>W</p></div>
						<div className="key center" ref="69"><p>E</p></div>
						<div className="key center" ref="82"><p>R</p></div>
						<div className="key center" ref="84"><p>T</p></div>
						<div className="key center" ref="89"><p>Y</p></div>
						<div className="key center" ref="85"><p>U</p></div>
						<div className="key center" ref="73"><p>I</p></div>
						<div className="key center" ref="79"><p>O</p></div>
						<div className="key center" ref="80"><p>P</p></div>
						<div className="key" ref="219"><p>&#123;</p><p>&#91;</p></div>
						<div className="key" ref="221"><p>&#125;</p><p>&#93;</p></div>
						<div className="key" ref="220"><p>&#124;</p><p>\</p></div>
						<div className="key left" ref="20" style={{width: '93px'}}><p>CapsLock</p></div>
						<div className="key center" ref="65"><p>A</p></div>
						<div className="key center" ref="83"><p>S</p></div>
						<div className="key center" ref="68"><p>D</p></div>
						<div className="key center" ref="70"><p>F</p></div>
						<div className="key center" ref="71"><p>G</p></div>
						<div className="key center" ref="72"><p>H</p></div>
						<div className="key center" ref="74"><p>J</p></div>
						<div className="key center" ref="75"><p>K</p></div>
						<div className="key center" ref="76"><p>L</p></div>
						<div className="key" ref="186"><p>:</p><p>;</p></div>
						<div className="key" ref="222"><p>"</p><p>'</p></div>
						<div className="key right" ref="13" style={{width: '93px'}}><p>Enter</p></div>
						<div className="key left" ref="16" style={{width: '119.5px'}}><p>Shift</p></div>
						<div className="key center" ref="90"><p>Z</p></div>
						<div className="key center" ref="88"><p>X</p></div>
						<div className="key center" ref="67"><p>C</p></div>
						<div className="key center" ref="86"><p>V</p></div>
						<div className="key center" ref="66"><p>B</p></div>
						<div className="key center" ref="78"><p>N</p></div>
						<div className="key center" ref="77"><p>M</p></div>
						<div className="key" ref="188"><p>&lt;</p><p>,</p></div>
						<div className="key" ref="190"><p>&gt;</p><p>.</p></div>
						<div className="key" ref="191"><p>?</p><p>/</p></div>
						<div className="key right" style={{width: '119.5px'}}><p>Shift</p></div>
						<div className="key left" ref="17" style={{width: '70.5px'}}><p>Ctrl</p></div>
						<div className="key center" ref="91" style={{width: '70.5px'}}><Icon type="windows" /></div>
						<div className="key center" ref="18" style={{width: '70.5px'}}><p>Alt</p></div>
						<div className="key center" ref="32" style={{width: '245px'}}><p>Space</p></div>
						<div className="key center" style={{width: '70.5px'}}><p>Alt</p></div>
						<div className="key center" style={{width: '70.5px'}}><p>Fn</p></div>
						<div className="key center" ref="93" style={{width: '70.5px'}}><Icon type="profile" /></div>
						<div className="key right" style={{width: '70.5px'}}><p>Ctrl</p></div>
					</div>
					<div id="data">
						<p className="title">Speed</p>
						<p className="detail">
							{Math.round(this.state.keyCount / (this.state.currentTime - this.state.startTime) * 60)}
							<span>KPM</span>
						</p>
						<p className="detail">
							{Math.round(this.state.wordCount / (this.state.currentTime - this.state.startTime) * 60)}
							<span>WPM</span>
						</p>
						<p className="title">Error</p>
						<p className="detail">
							{Math.round(this.state.errorCount / this.state.paragraph.length * 1e4) / 100}
							<span>%</span>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Content;