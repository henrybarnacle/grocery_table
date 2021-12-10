import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addItem } from '../ducks/groceries';
import { removeItem } from '../ducks/groceries';
import { selectItem } from '../ducks/groceries';
import { deselectItem } from '../ducks/groceries';



import ListInputs from './ListInputs';
import ListSelection from './ListSelection';
import ListTable from './ListTable';

export const ListContainer = (props) => {
  useEffect(() => {
    console.log('groceryList', props.groceryList);
  }, [props])

  return (
      <section className="groceryApp">
        <div className="listInputs">
          <ListInputs addItem={props.addItem} />
        </div>
        <div className="types">
          <ListSelection selected={props.selectedItem}/>
          <ListTable 
          groceryList={props.groceryList} 
          removeItem={props.removeItem}
          selectItem={props.selectItem}
          deselectItem={props.deselectItem}
          selected={props.selectedItem}
          />
        </div>
      </section>
    );
}

ListContainer.propTypes = {
  // Props
  // Actions
  addItem: PropTypes.func.isRequired,
  // Store
  groceryList: PropTypes.array.isRequired,
  // Other
};

const mapStateToProps = ({
  groceries: {
    list: groceryList,
  },
  groceries: {
    selectedItem
  }
}) => ({
  groceryList,
  selectedItem
});

const mapDispatchToProps = {
  addItem,
  removeItem, 
  selectItem,
  deselectItem
};

const ListContainerRedux = connect(mapStateToProps, mapDispatchToProps)(ListContainer);

export default ListContainerRedux;
