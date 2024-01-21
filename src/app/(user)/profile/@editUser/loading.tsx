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
                <Col span={4} style={{ padding: '0px' }}>
                    <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={'90%'}
                        height={600}
                    />
                </Col>
                <Col span={20}>
                    <Box sx={{ position: 'relative' }}>
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={'98%'}
                            height={'250px'}
                        />

                        <Skeleton
                            animation="wave"
                            variant="circular"
                            width={'150px'}
                            height={'150px'}
                            style={{
                                border: '1px solid black',
                                position: 'absolute',
                                bottom: '-60px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        />
                    </Box>
                    <Row style={{ marginTop: '80px' }}>
                        <Col span={17}>
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={'98%'}
                                height={600}
                            />
                        </Col>
                        <Col span={7}>
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={'90%'}
                                height={600}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Box>
    );
}
