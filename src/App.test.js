import { ListContainer } from './components/ListContainer';
import ListSelection from './components/ListSelection';
import ListTable from './components/ListTable';
import ListInputs from './components/ListInputs';
import reducer, { initialState, ADD_ITEM, REMOVE_ITEM } from './ducks/groceries';
import { render, unmountComponentAtNode } from 'react-dom';
import { shallow} from 'enzyme';
import { act } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const list = initialState.list;
const store = mockStore({
    groceries: {
      list: list,     
          selectedItem: list[3]
        }
});
let container = null;
let wrapped = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  wrapped = shallow(<ListContainer/>);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('shows ListSelection component', () => {
  expect(wrapped.find(ListSelection).length).toEqual(1);
});

it('shows ListTable component', () => {
  expect(wrapped.find(ListTable).length).toEqual(1);
});

it('shows ListInputs component', () => {
  expect(wrapped.find(ListInputs).length).toEqual(1);
});

it('handles actions of type REMOVE_ITEM', () => {
  const action = {
    type: REMOVE_ITEM,
    payload: 66
  };
  const newState = reducer(initialState, action);
  expect(newState.list.length).toEqual(3);
});

it('handles actions of type ADD_ITEM', () => {
  const action = {
    type: ADD_ITEM,
    payload: 66
  };
  const newState = reducer(initialState, action);
  expect(newState.list.length).toEqual(5);
});

it('renders name in ListSelection component', () => {
  let item = store.getState().groceries.selectedItem;
  act(() => {
    render(<ListSelection selected={item}/>, container);
  });
  expect(container.textContent).toBe('Roasted Turkey');
});

it('renders list in ListTable component', () => {
  let list = store.getState().groceries.list;
  act(() => {
    render(<ListTable groceryList={list}/>, container);
  });
  expect(container.innerHTML).toContain('Bananas');
  expect(container.innerHTML).toContain('Lettuce');
  expect(container.innerHTML).toContain('Roasted Turkey');
  expect(container.innerHTML).toContain('Whole Grain Bread');
});
