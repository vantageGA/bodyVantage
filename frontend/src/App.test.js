import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(container).toBeInTheDocument();
  });
});
