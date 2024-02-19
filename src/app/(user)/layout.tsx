import Box from '@mui/material/Box';
import Header from '@/components/Header/header';

export default function UserLayout({
    children,
    header,
}: {
    children: React.ReactNode;
    header: React.ReactNode;
}) {
    return (
        <Box>
            {/* Parallel route có thể bị mất header bên profile page */}
            {header}
            {/* <Header /> */}
            <Box
                sx={{
                    padding: 'calc(var(--height-header) + 16px) 8px 0px',
                    backgroundColor: '#f0f2f5',
                    // minHeight: '500vh',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
