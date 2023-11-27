import Header from '@/components/Header';
import { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

export default function DefaultLayout({ children }: IProps) {
    return (
        <div>
            <Header />
            <div className="">{children}</div>
        </div>
    );
}
