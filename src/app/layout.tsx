import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import StyledComponentsRegistry from '@/lib/AntdRegistry';

export const metadata = {
    title: 'Home',
    description: 'Home',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>
                    <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
                </ThemeRegistry>
            </body>
        </html>
    );
}
