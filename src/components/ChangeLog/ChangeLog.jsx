import { Box } from "@mui/material"
import * as logs from '../../utils/changelog';
import './ChangeLog.css';
import ChangeLogEntry from "./ChangeLogEntry";

const ChangeLog = () => {

    const changes = logs.list() || [];

    return (
        <Box sx={{ width: '90%', marginLeft: '5%' }}>
            <div className='container filter-container '>
                <h1>«PlantSearch» changelog</h1>
                <hr />
                {changes.map((data, index) =>
                    <ChangeLogEntry
                        key={index}
                        props={data()}
                    />
                )}
            </div>
        </Box>
    );
};

export default ChangeLog;