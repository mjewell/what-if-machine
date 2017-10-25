import * as React from 'react';
import { Button } from 'react-bootstrap';
import * as FontAwesome from 'react-fontawesome';
import { ICategory } from '../../models';
import Category from './CategoryLink';

export type IProps = {
  categories: ICategory[];
  addCategory: () => void;
  selectCategory: (category: ICategory) => () => void;
  selectedCategory: ICategory;
};

export default function Categories({
  categories,
  addCategory,
  selectCategory,
  selectedCategory
}: IProps) {
  return (
    <div className="p-2 d-flex flex-column">
      {categories.map(category => (
        <Category
          key={category.id as string}
          category={category}
          onClick={selectCategory(category)}
          isSelected={category === selectedCategory}
        />
      ))}
      <Button bsStyle="success" onClick={addCategory}>
        <FontAwesome name="plus-circle" />
      </Button>
    </div>
  );
}
