import React from 'react';
import ReactDOM from 'react-dom';
import { connect, RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import ConfigScreen from '../../entrypoints/ConfigScreen';

connect({
  renderConfigScreen(ctx: RenderConfigScreenCtx) {
    ReactDOM.render(
      <React.StrictMode>
        <ConfigScreen ctx={ctx} />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  },
});