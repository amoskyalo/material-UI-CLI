import { DataGrid } from '@mui/x-data-grid';

const GridModel = ({ rows, columns, loading, ...otherProps }) => {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            autoHeight
            {...otherProps}
        // For more DataGrid props and their details see https://mui.com/x/api/data-grid/data-grid/;
        />
    )
};

export default GridModel;