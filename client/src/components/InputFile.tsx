import { useThemeContext } from '../contexts/Theme';
import { fileToDataUri } from '../tools/file';

interface InputFileProps {
  onChange: Function;
}

const InputFile = ({ onChange }: InputFileProps) => {
  const { theme } = useThemeContext();

  const handleChange = async ({ target: { files, ...rest2 }, ...rest1 }) => {
    const newImagesValues = Object.keys(files).map((key) =>
      fileToDataUri(files[key])
    );
    const newImages = await Promise.all(newImagesValues);

    if (onChange) {
      onChange(newImages);
    }
  };

  return (
    <input
      className={`${theme}`}
      onChange={handleChange}
      type="file"
      accept="image/*"
      multiple
    />
  );
};

export default InputFile;
