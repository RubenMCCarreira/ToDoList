import React from 'react';

const ASC = 'ASC';
const DSC = 'DSC';

const SortOrder = ({ title, currentOrder, onChange }) => {
  const { prop, value } = currentOrder;

  const handleChange = (event) => {
    let nextProp = prop;
    let nextValue = value;

    if (event === prop) {
      if (value === ASC) {
        nextValue = DSC;
      } else if (value === DSC) {
        nextValue = null;
        nextProp = null;
      }
    } else {
      nextProp = event;
      nextValue = ASC;
    }

    onChange(
      !nextProp && !nextValue ? {} : { prop: nextProp, value: nextValue }
    );
  };

  return (
    <span style={{ marginRight: '15px' }} onClick={() => handleChange(title)}>
      {title}
      {!!(currentOrder.prop == title && currentOrder.value) && (
        <img
          src={`/sortOrder/arrow-${currentOrder.value}.png`}
          style={{ width: '10px', height: '10px' }}
        />
      )}
    </span>
  );
};

export default SortOrder;
