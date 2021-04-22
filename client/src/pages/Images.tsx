import withInjectReducer from 'tool/redux/withInjectReducer';
import { useEffect } from 'react';
import reducer, {
  imageMapDispatchToProps,
  imageMapStateToProps,
  stateImageKey
} from '../store/image';
import { IImage, IHistory } from '../interfaces';
import Layout from '../containers/Layout';
import Carrousel from '../containers/Carrousel';
import AddImages from '../containers/AddImages';

interface ImagesProps {
  history: IHistory;
  getList: Function;
  list: IImage[] | null;
}

const Images = ({ history, list, getList }: ImagesProps) => {
  useEffect(() => {
    if (!list) {
      getList();
    }
  }, [list]);

  return (
    <Layout history={history}>
      <Carrousel items={list || []} showFooter />
      <AddImages />
    </Layout>
  );
};

export default withInjectReducer(
  stateImageKey,
  reducer,
  imageMapStateToProps,
  imageMapDispatchToProps,
  Images
);
