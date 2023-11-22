import { Box } from "@mui/material"
import * as logs from '../../utils/changelog.js';
import './ChangeLog.css';
import ChangeLogEntry from "./ChangeLogEntry";

const ChangeLog = () => {

    const changes = logs.changes() || [];

    return (
        <Box sx={{ width: '90%', marginLeft: '5%' }}>
            {console.info(changes)}
            <div className='container filter-container '>
                <h1>Останні зміни</h1>
                <hr />
                {changes.reverse().map((data, index) =>
                    <ChangeLogEntry
                        key={index}
                        props={data}
                    />
                )}
            </div>
        </Box>
    );
};

export default ChangeLog;
