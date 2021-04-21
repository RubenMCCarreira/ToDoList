import { IFile, IHistory } from '../interfaces';
import Layout from '../containers/Layout';
import InputFile from '../components/InputFile';
import { useState } from 'react';
import Carrousel from '../containers/Carrousel';

interface ImagesProps {
  history: IHistory;
}

const Images = ({ history }: ImagesProps) => {
  const [images, setImages] = useState<IFile[]>([]);

  const handleImages = (newImages) => {
    setImages([...images, ...newImages]);
  };

  return (
    <Layout history={history}>
      <InputFile onChange={handleImages} />

      <Carrousel items={images} showFooter />
    </Layout>
  );
};

export default Images;
