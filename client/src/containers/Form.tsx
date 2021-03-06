import { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import InputDate from '../components/InputDate';
import get from 'lodash/get';
import TextArea from '../components/TextArea';

interface IFormItem {
  prop: string;
  placeholder?: string;
  mandatory?: true;
  type?: string;
  values?: any[];
  hideTitle?: boolean;
}

interface INextFormItem {
  prop: string;
  mandatory: undefined | true;
  value: string | null;
  error: boolean;
  hideTitle?: boolean;
}

interface FormProps {
  items: IFormItem[];
  onSubmit?: Function;
  label?: string;
  callback?: Function;
  className?: string;
  grid?: boolean;
  item?: any;
}

const reset = (items, item) => {
  const next = {};
  items.forEach((it) => {
    next[it.prop] = { ...it, value: get(item, it.prop) || null, error: false };
  });
  return next;
};

const mapTypeToComponent = (type) => {
  const map = {
    input: Input,
    password: Input,
    select: Dropdown,
    dateTime: InputDate,
    textarea: TextArea
  };

  return map[type] || Input;
};

const Form = ({
  items,
  onSubmit,
  label = 'Submit',
  callback,
  className,
  grid = false,
  item
}: FormProps) => {
  const [nextItems, setNextItems] = useState({});

  useEffect(() => {
    setNextItems(reset(items, item));
  }, [items, item]);

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

      setNextItems(reset(allNextItems, {}));
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

  const resolveItems = useMemo(
    () =>
      Object.keys(nextItems).map((it) => {
        const Component = mapTypeToComponent(nextItems[it].type);
        return (
          <Component
            key={nextItems[it].prop}
            item={{ value: nextItems[it].value, error: nextItems[it].error }}
            prop={nextItems[it].prop}
            onChange={onChange}
            placeholder={nextItems[it].placeholder}
            type={nextItems[it].type}
            values={nextItems[it].values}
            hideTitle={nextItems[it].hideTitle}
          />
        );
      }),
    [nextItems]
  );

  return (
    <form
      className={`${className || (!grid ? 'no-wrap' : '')}`}
      onSubmit={handleSubmit}
    >
      {grid ? (
        <>
          <div className={`grid`}>{resolveItems}</div>
          <Button label={label} type="submit" />
        </>
      ) : (
        <>
          {resolveItems}
          <Button label={label} type="submit" />
        </>
      )}
    </form>
  );
};

export default Form;
