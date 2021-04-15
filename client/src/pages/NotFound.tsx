import Button from '../components/Button';
import { useThemeContext } from '../contexts/Theme';
import { IHistory } from '../interfaces';

interface NotFoundProps {
  history: IHistory;
}

const NotFound = ({ history }: NotFoundProps) => {
  const { theme } = useThemeContext();

  return (
    <>
      <h2>Not Found</h2>
      <Button
        label="Home"
        onClick={() => history.push('/')}
        className={`button-home-${theme}`}
      />
    </>
  );
};

export default NotFound;
