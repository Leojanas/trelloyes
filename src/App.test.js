import React from 'react';
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react';
import App from './App';
import Store from './store';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={Store}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('renders the UI as expected', () => {
  const tree = renderer
    .create(<App store={Store}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();  
});

