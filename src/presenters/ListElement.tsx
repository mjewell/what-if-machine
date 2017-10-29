import { observer } from 'mobx-react';
import * as React from 'react';

export type IProps = {
  element: {
    name: string;
  };
  onClick: () => void;
  isSelected: boolean;
};

export default observer(function ListElement({
  element,
  onClick,
  isSelected
}: IProps) {
  return (
    <div
      className="py-2"
      onClick={onClick}
      style={{ backgroundColor: isSelected ? '#EEE' : '#DDD' }}
    >
      <h4 className="m-0">{element.name || '(unnamed)'}</h4>
    </div>
  );
});
