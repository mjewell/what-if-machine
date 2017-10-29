import * as React from 'react';

import { ICategory } from '../../models';
import Category from '../../presenters/Category';

export type IProps = {
  selectedCategory: ICategory;
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
