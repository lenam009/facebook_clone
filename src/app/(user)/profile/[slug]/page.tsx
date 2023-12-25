import React from 'react';
import ProfileUser from '@/components/Profile/profile.user';
import Box from '@mui/material/Box';

export default function ProfilePage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const words = slug.split('.html')[0];
    const wordId = words.split('-');
    const id = wordId[wordId.length - 1];

    return (
        <Box>
            <ProfileUser />
        </Box>
    );
}
