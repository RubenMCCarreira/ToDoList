import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

interface IFormItem {
  prop: string;
  placeholder?: string;
  mandatory?: true;
  type?: string;
}

interface INextFormItem {
  prop: string;
  mandatory: undefined | true;
  value: string | null;
  error: boolean;
}

interface FormProps {
  items: IFormItem[];
  onSubmit?: Function;
  label?: string;
  callback?: Function;
  className?: string;
}

const reset = (items) => {
  const next = {};
  items.forEach((it) => {
    next[it.prop] = { ...it, value: null, error: false };
  });
  return next;
};

const Form = ({
  items,
  onSubmit,
  label = 'Submit',
  callback,
  className
}: FormProps) => {
  const [nextItems, setNextItems] = useState({});

  useEffect(() => {
    setNextItems(reset(items));
  }, [items]);

  const onChange = (value, prop) => {
    setNextItems((current) => ({
      ...current,
      [prop]: {
        ...current[prop],
        value,
        error: current[prop].mandatory ? !value : false
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allNextItems: INextFormItem[] = Object.values(nextItems);
    const mandatory: INextFormItem[] = allNextItems.filter(
      (it) => it.mandatory
    );
    const allMandatory: boolean = mandatory.every((it) => !!it.value);

    if (allMandatory) {
      const toSend = allNextItems.reduce(
        (acc, current) => ({ ...acc, [current.prop]: current.value }),
        {}
      );

      if (onSubmit) {
        onSubmit(toSend);
      } else if (callback) {
        callback(toSend);
      }

      setNextItems(reset(allNextItems));
    } else {
      setNextItems(
        allNextItems.reduce((acc, current) => {
          if (current.mandatory && !current.value) {
            return { ...acc, [current.prop]: { ...current, error: true } };
          }

          return { ...acc, [current.prop]: current };
        }, {})
      );
    }
  };

  return (
    <form className={`${className || 'no-wrap'}`} onSubmit={handleSubmit}>
      {Object.keys(nextItems).map((it) => (
        <Input
          key={nextItems[it].prop}
          item={{ value: nextItems[it].value, error: nextItems[it].error }}
          prop={nextItems[it].prop}
          placeholder={nextItems[it].placeholder}
          onChange={onChange}
        />
      ))}
      <Button label={label} type="submit" />
    </form>
  );
};

export default Form;
