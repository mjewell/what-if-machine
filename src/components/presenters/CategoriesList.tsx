import { observer } from 'mobx-react';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import * as FontAwesome from 'react-fontawesome';

import { ICategory } from '../../models';
import ListElement from './ListElement';

export type IProps = {
  categories: ICategory[];
  addCategory: () => void;
  selectCategory: (category: ICategory) => void;
  selectedCategory: ICategory;
};

export default observer(function Categories({
  addCategory,
  categories,
  selectCategory,
  selectedCategory
}: IProps) {
  return (
    <div className="p-2 d-flex flex-column">
      {categories.map(category => (
        <ListElement
          key={category.id as string}
          element={category}
          onClick={() => selectCategory(category)}
          isSelected={category === selectedCategory}
        />
      ))}
      <Button bsStyle="success" onClick={addCategory}>
        <FontAwesome name="plus-circle" />
      </Button>
    </div>
  );
});
