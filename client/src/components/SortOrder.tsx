import Paragraph from './Paragraph';
import Span from './Span';

interface SortOrderProps {
  values: string[];
  currentOrder: { prop: string | null; value: string | null };
  onChange: Function;
}

const ASC = 'ASC';
const DSC = 'DSC';

const SortOrder = ({ values, currentOrder, onChange }: SortOrderProps) => {
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
    <div id="sort-order">
      <Paragraph>Sort Order</Paragraph>
      {values.map((it) => (
        <Span key={`sort-order-${it}`} onClick={() => handleChange(it)}>
          <>
            {it}
            {!!(currentOrder.prop == it && currentOrder.value) && (
              <img src={`/sortOrder/arrow-${currentOrder.value}.png`} />
            )}
          </>
        </Span>
      ))}
    </div>
  );
};

export default SortOrder;
