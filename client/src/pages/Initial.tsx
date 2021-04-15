import ToDos from '../containers/ToDos';
import NewToDo from '../containers/NewToDo';
import Dropdown from '../components/Dropdown';
import { useThemeContext } from '../contexts/Theme';
import { IHistory } from '../interfaces';
import Button from '../components/Button';

interface IInitial {
  history: IHistory;
}

const Initial = ({ history }: IInitial) => {
  const { theme, changeTheme, themes } = useThemeContext();

  const onClick = () => {
    history.push('/logout');
  };

  const goChat = () => {
    history.push('/chat');
  };

  return (
    <>
      <div className={`no-wrap ${theme} space-between`}>
        <Dropdown value={theme} values={themes} onChange={changeTheme} />
        <Button label="Chat" onClick={goChat} />
        <Button label="Log out" onClick={onClick} />
      </div>
      <NewToDo />
      <ToDos history={history} />
    </>
  );
};

export default Initial;
