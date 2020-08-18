import React from 'react';
import '../assets/styles/components/table.scss';

const TableLayout = ({ headers, children }) => {
  return (

    <table className="table table-hover table-sm tbl">
      <thead>
        <tr>
          {
            headers.length > 0 ?
            headers.map((head, idx) => 
            <th key={idx} scope="col">{head}</th>
            )
            : null
          }
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>   
  );
}
export default TableLayout;