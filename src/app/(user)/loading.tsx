import React from 'react';
import { Col, Row } from 'antd';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function Loading() {
    return (
        <Box>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    backgroundColor: 'white',
                    width: '100%',
                    height: 'var(--height-header)',
                    display: 'flex',
                    alignItems: 'center',
                }}
                zIndex={1000}
            >
                <Skeleton
                    sx={{ padding: 0, margin: 0 }}
                    width={'100%'}
                    animation="wave"
                    height={'calc(var(--height-header) + 10px)'}
                />
            </Box>

            <Row style={{}}>
                <Col span={7} style={{ padding: '0px' }}>
                    <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={'90%'}
                        height={600}
                    />
                </Col>
                <Col span={10}>
                    <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={'90%'}
                        height={600}
                    />
                </Col>
                <Col span={7} style={{ padding: '0px' }}>
                    <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={'100%'}
                        height={600}
                    />
                </Col>
            </Row>
        </Box>
    );
}
