import React from 'react';
import AuthSignin from '@/components/auth/auth.signin';
import Box from '@mui/material/Box';

export default async function LoginPage() {
    return (
        <Box>
            <AuthSignin />
        </Box>
    );
}
