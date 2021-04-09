import { useThemeContext } from '../contexts/Theme';

const Spinier = () => {
  const { theme } = useThemeContext();

  return (
    <div className={`spinier-${theme}`}>
      <div className={`lds-ellipsis`}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Spinier;
