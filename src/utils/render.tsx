import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root')!);

export function render(component: React.ReactNode): void {
  root.render(
  <StrictMode>{component}</StrictMode>,
  )
}
