const ASC = 'ASC';
const DSC = 'DSC';

const SortOrder = ({ values, currentOrder, onChange }) => {
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
    <div className="sort-order">
      <p>Sort Order</p>
      {values.map((it) => (
        <span key={`sort-order-${it}`} onClick={() => handleChange(it)}>
          {it}
          {!!(currentOrder.prop == it && currentOrder.value) && (
            <img src={`/sortOrder/arrow-${currentOrder.value}.png`} />
          )}
        </span>
      ))}
    </div>
  );
};

export default SortOrder;
