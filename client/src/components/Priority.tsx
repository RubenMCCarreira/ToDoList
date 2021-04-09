import { useEffect, useState } from 'react';

const Priority = ({ value, onChange = (A) => A, disabled = false }) => {
  const options = [
    { value: 1, name: 'arrow-very-low' },
    { value: 2, name: 'arrow-low' },
    { value: 3, name: 'normal' },
    { value: 4, name: 'arrow-high' },
    { value: 5, name: 'arrow-very-high' }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const find = options.findIndex((it) => it.value === value);
    setIndex(find > -1 ? find : 2);
  }, [value]);

  const onClick = () => {
    if (disabled) {
      return;
    }
    let nextIndex = index + 1;
    nextIndex = nextIndex > options.length - 1 ? 0 : nextIndex;
    onChange(options[nextIndex].value);
    setIndex(nextIndex);
  };

  return (
    <img
      key={index}
      onClick={onClick}
      src={`/priority/${options[index].name}.png`}
      style={{ width: '20px', height: '-webkit-fill-available' }}
    />
  );
};

export default Priority;
