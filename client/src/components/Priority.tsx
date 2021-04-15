import { useEffect, useState } from 'react';

interface PriorityProps {
  value: number | null;
  onChange?: Function;
  disabled?: boolean;
}

const Priority = ({ value, onChange, disabled = false }: PriorityProps) => {
  const options = [
    { value: 1, name: 'arrow-very-low' },
    { value: 2, name: 'arrow-low' },
    { value: 3, name: 'normal' },
    { value: 4, name: 'arrow-high' },
    { value: 5, name: 'arrow-very-high' }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const find = options.findIndex((it) => it.value == value);
    setIndex(find > -1 ? find : 2);
  }, [value]);

  const onClick = () => {
    if (disabled) {
      return;
    }
    let nextIndex = index + 1;
    nextIndex = nextIndex > options.length - 1 ? 0 : nextIndex;
    if (onChange) {
      onChange(options[nextIndex].value);
    }
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
