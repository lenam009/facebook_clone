import React from 'react';
import ProfileUser from '@/components/Profile/profile.user';

export default function ProfilePage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    return (
        <div>
            <ProfileUser />
        </div>
    );
}
