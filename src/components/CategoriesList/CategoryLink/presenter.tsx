import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button, Col, Form, FormControl, FormGroup } from 'react-bootstrap';
import * as FontAwesome from 'react-fontawesome';
import { ICategory } from '../../../models';
import Transactions from '../../Transactions';

export type IProps = {
  category: ICategory;
  onClick: () => void;
  isSelected: boolean;
};

export default function CategoryLink({
  category,
  onClick,
  isSelected
}: IProps) {
  return (
    <div
      className="py-2"
      onClick={onClick}
      style={{ backgroundColor: isSelected ? '#EEE' : '#DDD' }}
    >
      <h4 className="m-0">{category.name || '(unnamed)'}</h4>
    </div>
  );
}
