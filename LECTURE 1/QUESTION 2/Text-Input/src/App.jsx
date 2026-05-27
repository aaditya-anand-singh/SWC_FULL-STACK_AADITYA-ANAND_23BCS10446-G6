import React from 'react';
import TextInput from './components/TextInput'; 

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f8fa', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>New Post</h2>      
      <TextInput />
      
    </div>
  );
}

export default App;