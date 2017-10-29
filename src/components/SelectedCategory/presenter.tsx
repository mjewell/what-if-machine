import * as React from 'react';

import Category, { IProps as ICategoryProps } from '../../presenters/Category';

export type IProps = {
  selectedCategory: ICategoryProps['category'];
  removeCategory: () => void;
};

export default function Categories({
  selectedCategory,
  removeCategory
}: IProps) {
  return (
    <div className="mb-3">
      {selectedCategory && (
        <Category category={selectedCategory} removeCategory={removeCategory} />
      )}
    </div>
  );
}
