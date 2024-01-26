import React from 'react';
import GLBViewer from './components/GLBViewer';

function App() {
  return (
    <div className='items-center space-between h-screen'>
      <h1 className='text-center font-mono font-xxl mt-5 tracking-widest '>Brain fish</h1>
      <GLBViewer url="/public/models/mm_project.glb" />
    </div>
  );
}

export default App;