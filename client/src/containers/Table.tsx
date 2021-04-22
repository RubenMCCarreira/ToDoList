import get from 'lodash/get';
import Span from '../components/Span';

interface TableProps {
  headers: {
    prop: string | null;
    label: string;
    callback?: Function;
    options?: {
      label: string;
      callback: Function;
    }[];
  }[];
  rows: any[];
}

const Table = ({ headers, rows }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          {(headers || []).map((header, index) => (
            <td key={`header${index}`}>
              {typeof header == 'object' ? header.label : header}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {(rows || []).map((row) => (
          <tr key={`row-${row.id}`}>
            {headers.map((header) => {
              if (header.options) {
                return (
                  <td key={`row-${row.id}-${header.prop}`}>
                    {header.options.map((opt) => {
                      console.log(111111, row);

                      return (
                        <Span
                          key={`row-${row.id}-${header.label}-${opt.label}`}
                          onClick={() => opt.callback(row)}
                        >
                          {opt.label}
                        </Span>
                      );
                    })}
                  </td>
                );
              }
              let currentValue = get(row, header.prop);
              if (header.callback) {
                currentValue = header.callback(currentValue);
              }
              return (
                <td key={`row-${row.id}-${header.prop}`}>
                  {typeof header == 'object' ? currentValue : '--'}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
