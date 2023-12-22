import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import NextAuthSessionWrapper from '@/lib/next.auth.wrapper';
import NProgressWrapper from '@/lib/nprogress.wrapper';

export const metadata = {
    title: 'Home',
    description: 'Home',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>
                    <StyledComponentsRegistry>
                        <NProgressWrapper>
                            <NextAuthSessionWrapper>{children}</NextAuthSessionWrapper>
                        </NProgressWrapper>
                    </StyledComponentsRegistry>
                </ThemeRegistry>
            </body>
        </html>
    );
}
