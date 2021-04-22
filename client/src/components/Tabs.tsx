import { useEffect, useState } from 'react';
import Div from './Div';
import Span from './Span';

interface TabsProps {
  children: any;
}

const Tabs = ({ children }: TabsProps) => {
  const [active, setActive] = useState(0);
  const [nextChildren, setNextChildren] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(children)) {
      setNextChildren(children);
    } else {
      setNextChildren([children]);
    }
  }, [children]);

  return (
    <>
      <Div id="tabs" noWrap>
        {nextChildren.map((it, index) => (
          <Span
            key={index}
            onClick={() => setActive(index)}
            className={active == index ? 'active' : ''}
          >
            {it.props.title}
          </Span>
        ))}
      </Div>
      <Div id="tabs-content">{nextChildren[active]}</Div>
    </>
  );
};

export default Tabs;
