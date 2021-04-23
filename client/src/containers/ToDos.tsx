import withInjectReducer from 'tool/redux/withInjectReducer';
import ToDo from './ToDo';
import reducer, {
  toDoMapStateToProps,
  toDoMapDispatchToProps,
  stateToDoKey
} from '../store/toDo';
import DragDropList from '../components/DragDropList';
import SortOrder from '../components/SortOrder';
import Div from '../components/Div';
import { IOrder, IToDo } from '../interfaces';

interface ToDosProps {
  list: IToDo[] | null;
  saveItem: Function;
  handleSortOrder: Function;
  currentOrder: IOrder;
  all: boolean;
}

const ToDos = ({
  list,
  saveItem,
  handleSortOrder,
  currentOrder,
  all
}: ToDosProps) => {
  return (
    <>
      <Div id={`to-dos-options`}>
        <SortOrder
          values={['title', 'done', 'priority']}
          currentOrder={currentOrder}
          onChange={handleSortOrder}
        />
      </Div>
      <Div>
        {all ? (
          (list || []).map((it) => (
            <ToDo key={it.id} item={it} updateItem={saveItem} />
          ))
        ) : (
          <DragDropList
            list={list || []}
            component={ToDo}
            updateItem={saveItem}
          />
        )}
      </Div>
    </>
  );
};

export default withInjectReducer(
  stateToDoKey,
  reducer,
  toDoMapStateToProps,
  toDoMapDispatchToProps,
  ToDos
);
