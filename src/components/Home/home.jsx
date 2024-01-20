import { useState } from 'react';
import "./home.scss";
import Header from '../Header/navbar';

const Home =({startQuiz}) => {

	return (
    <>
		
		<div>
			<Header/>
			<h1>Welcome to the Quiz Website</h1>
			<div className='strt-quiz'>
				<button  onClick={startQuiz}>Start Quiz</button>
			</div>
		</div>
    </>
    
  );
};

export default Home;