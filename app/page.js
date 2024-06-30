import React from 'react';
import { Button,Box, Typography } from '@mui/material';
import Table from './component/Table';

export default function Home() {
    return (
        <main className="w-100 h-100 p-5">
            <Box>
                <Typography sx={{textAlign: 'center', fontSize: 30, color: 'primary.main'}}>Shift Schedulling</Typography>
            </Box>
            <Table />
        </main>
    );
}
