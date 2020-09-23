import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import List from './List';
import Store from './store';
import renderer from 'react-test-renderer';

describe('Card component', ()=>{

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Card title='title' content='content'/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('renders the UI as expected', () => {
        const tree = renderer
          .create(<Card title='title' content='content'/>)
          .toJSON();
        expect(tree).toMatchSnapshot();  
      });

})

describe('List component', () => {
    
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<List key={1} header='First List' cards={[{ id: 'a', title: 'First card', content: 'lorem ipsum' },
        { id: 'b', title: 'Second card', content: 'lorem ipsum' }]}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('renders the UI as expected', () => {
        const tree = renderer
          .create(<List key={1} header='First List' cards={[{ id: 'a', title: 'First card', content: 'lorem ipsum' },
          { id: 'b', title: 'Second card', content: 'lorem ipsum' }]}/>)
          .toJSON();
        expect(tree).toMatchSnapshot();  
      });
})