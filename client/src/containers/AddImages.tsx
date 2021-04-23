import withInjectReducer from 'tool/redux/withInjectReducer';
import { useState } from 'react';
import reducer, {
  imageMapDispatchToProps,
  imageMapStateToProps,
  stateImageKey
} from '../store/image';
import InputFile from '../components/InputFile';
import { IImage } from '../interfaces';
import Div from '../components/Div';
import TextArea from '../components/TextArea';
import Button from '../components/Button';

interface AddImagesProps {
  saveItem: Function;
}

const AddImages = ({ saveItem }: AddImagesProps) => {
  const [images, setImages] = useState<IImage[]>([]);

  const handleImages = (newImages) => {
    setImages([...images, ...newImages]);
  };

  const onChange = (value, index) => {
    const next = [...images];
    next[index].legend = value;
    setImages(next);
  };

  const saveImages = () => {
    images.map((it) => {
      saveItem(it);
    });
    setImages([]);
  };

  return (
    <>
      <Div noWrap>
        <InputFile onChange={handleImages} />
        <Button label="Add Images" onClick={saveImages} />
      </Div>
      <Div id="add-image">
        {images.map((it, index) => (
          <Div key={index} noWrap>
            <img src={it.src} />
            <TextArea
              item={{ value: it.legend || null, error: false }}
              onChange={(value) => onChange(value, index)}
            />
          </Div>
        ))}
      </Div>
    </>
  );
};

export default withInjectReducer(
  stateImageKey,
  reducer,
  imageMapStateToProps,
  imageMapDispatchToProps,
  AddImages
);
