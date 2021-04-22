import { useEffect, useState } from 'react';

interface PriorityProps {
  value: number | null;
  onChange?: Function;
  disabled?: boolean;
}

const OPTIONS = [
  { value: 1, name: 'arrow-very-low' },
  { value: 2, name: 'arrow-low' },
  { value: 3, name: 'normal' },
  { value: 4, name: 'arrow-high' },
  { value: 5, name: 'arrow-very-high' }
];

const Priority = ({ value, onChange, disabled = false }: PriorityProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const find = OPTIONS.findIndex((it) => it.value == value);
    setIndex(find > -1 ? find : 2);
  }, [value]);

  const onClick = () => {
    if (disabled) {
      return;
    }
    let nextIndex = index + 1;
    nextIndex = nextIndex > OPTIONS.length - 1 ? 0 : nextIndex;
    if (onChange) {
      onChange(OPTIONS[nextIndex].value);
    }
    setIndex(nextIndex);
  };

  return (
    <img
      key={index}
      onClick={onClick}
      src={`/priority/${OPTIONS[index].name}.png`}
      className="priority"
    />
  );
};

export default Priority;
