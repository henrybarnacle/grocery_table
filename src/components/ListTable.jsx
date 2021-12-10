import React from 'react';
import useToggle from '../hooks/useToggle';

export const ListTable = (props) => {

  const [darkTheme, setDarkTheme] = useToggle();

  const onSelect = (entry) => { 
    if (props.selected.id === entry.id) {
      props.deselectItem(entry);
    } else {
      props.selectItem(entry);
    }
  }
  return (
    <div className={darkTheme ? 'listTable darkMode' : 'listTable'}>
            <thead>
              <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Delivery</th>
                  <th></th>
              </tr>
            </thead>
            <tbody>
              {props.groceryList.map && props.groceryList.map(entry => {
                  return (
                  <tr key={entry.id}>
                    <td onClick={() => {onSelect(entry)}}>{entry.name}</td>
                    <td>{entry.category}</td>
                    <td>{entry.deliveryMethod}</td>
                    <td>
                    <button className={darkTheme ? 'darkButton' : ''} onClick={() => {onSelect(entry)}}>select</button>
                    <button className={darkTheme ? 'darkButton' : ''} onClick={() => {props.removeItem(entry.id)}}>remove</button>
                    </td>
                  </tr>
                  )
                }
                )}
            </tbody>
            <button onClick={setDarkTheme}>{darkTheme ? 'light table' : 'dark table'}</button>
    </div>
  );
}

export default ListTable
