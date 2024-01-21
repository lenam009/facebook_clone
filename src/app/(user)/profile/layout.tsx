import Box from '@mui/material/Box';
import Header from '@/components/Header/header';

export default function UserLayout({
    children,
    editUser,
}: {
    children: React.ReactNode;
    editUser: React.ReactNode;
}) {
    return (
        <>
            {children}
            {editUser}
        </>
    );
}
