import Box from '@mui/material/Box';
import Header from '@/components/Header/header';

export default function UserLayout({
    children,
    editUser2,
}: {
    children: React.ReactNode;
    editUser2: React.ReactNode;
}) {
    return (
        <>
            {children}
            {editUser2}
        </>
    );
}
