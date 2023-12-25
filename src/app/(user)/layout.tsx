import Box from '@mui/material/Box';
import Header from '@/components/Header/header';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box>
            <Header />
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
