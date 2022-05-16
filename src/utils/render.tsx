// import React, { StrictMode } from 'react';
// import ReactDOM from 'react-dom';

// export function render(component: React.ReactNode): void {
//   ReactDOM.render(<StrictMode>{component}</StrictMode>, document.getElementById('root'));
// }


import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root')!);

export function render(component: React.ReactNode): void {
  root.render(
  <StrictMode>{component}</StrictMode>,
  )
}
