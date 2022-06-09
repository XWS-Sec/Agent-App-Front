import { useState } from 'react';
import LoginForm from '../components/login/LoginForm';

const LoginPage = () => {

	const [loginState, setLoginState] = useState('login');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const changeState = (state: string) => {
		setLoginState(state);
	};

	const triggerMessage = (message: string) => {
		setMessage(message);
		setTimeout(() => {
			setMessage('');
		}, 2000);
	};

	return (
		<div>
			<h1 className='text-green-600 text-4xl text-center font-bold mt-20 mb-8'>Welcome to Joberty</h1>
			<p className='text-green-600 text-center text' hidden={!message}>
				{message}
			</p>
			{loginState === 'login' && <LoginForm changeState={changeState} />}
		</div>
	);
};

export default LoginPage;