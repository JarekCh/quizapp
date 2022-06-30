import Questions from './components/Questions';

import './styles.css';
import { getQuizQuestion } from './api/openTbdApi';


// TODO : map questions over sueState variable lenght

function App() {
  return (
    <main className="App">
      <Questions />
      <Questions />
      <Questions />
      <Questions />
      <Questions />      
      {/* question comp os starting screen */}
      <div className='btn__container'>
        {/* contidional score rendering */}
        {/* btn with conditional rendering text check answers -> play again */}
        <h2>You scored 3/5 correct answers</h2>
        <button className='app__btn'>test button</button>
      </div>
    </main>
  );
}

export default App;
