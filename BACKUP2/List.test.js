import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import renderer from 'react-test-renderer';

describe('List Test Suite', () => {
  it('renders without crashing', () => {
    const div = document.createElement('section');
    ReactDOM.render(<List />, section);
    ReactDOM.unmountComponentAtNode(section);
  });
});