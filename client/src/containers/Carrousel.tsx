import { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import Div from '../components/Div';
import { useThemeContext } from '../contexts/Theme';
import { IFile } from '../interfaces';
import { nextClassNames } from '../tools/classnames';

interface CarrouselProps {
  items: IFile[];
  circular?: boolean;
  showFooter?: boolean;
  showDots?: boolean;
  time?: number;
}

const Carrousel = ({
  items,
  circular = true,
  showFooter = false,
  showDots = true,
  time = 3000
}: CarrouselProps) => {
  const { theme } = useThemeContext();
  const [current, setCurrent] = useState(0);

  const itemsLength = useMemo(() => {
    if (!items || !items.length) return 0;
    return items.length;
  }, [items]);

  const onchangeCurrent = useCallback(
    (number) => {
      let next;

      if (circular) {
        if (number < 0) next = itemsLength - 1;
        else if (number >= itemsLength) next = 0;
        else next = number;
      } else {
        if (number < 0 || number >= itemsLength) next = current;
        else next = number;
      }

      setCurrent(next);
    },
    [current, itemsLength, circular]
  );

  const refs = items.reduce(
    (acc, current) => ({ ...acc, [current.name]: createRef() }),
    {}
  );

  useEffect(() => {
    if (items[current]) {
      refs[items[current].name].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [items, current]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onchangeCurrent(current + 1);
    }, time);
    return () => clearTimeout(timer);
  }, [onchangeCurrent, current]);

  if (!itemsLength) return null;

  return (
    <Div id="carrousel">
      <Div id="top">
        <span onClick={() => onchangeCurrent(current - 1)}>{`<`}</span>
        <img src={items[current].src} alt={items[current].name} />
        <span onClick={() => onchangeCurrent(current + 1)}>{`>`}</span>
        <>
          {showDots && (
            <Div id="dots">
              {items.map((_, index) => (
                <span
                  key={index}
                  onClick={() => onchangeCurrent(index)}
                  className={nextClassNames([
                    current == index ? 'current' : '',
                    theme
                  ])}
                />
              ))}
            </Div>
          )}
        </>
      </Div>
      <>
        {showFooter && (
          <Div id="footer">
            {items.map((it, index) => (
              <img
                ref={refs[it.name]}
                key={index}
                src={it.src}
                alt={it.name}
                onClick={() => onchangeCurrent(index)}
                className={nextClassNames([
                  current == index ? 'current' : '',
                  theme
                ])}
              />
            ))}
          </Div>
        )}
      </>
    </Div>
  );
};

export default Carrousel;
