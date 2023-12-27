import { handleGetOneUserById } from '@/utils/actions/actions';
import ReduxChangeState from '@/components/WrapperReducerRedux/redux.changeState';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function ReduxFetchApi({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    // đời ReduxChangeState ra ngoài layout và cả fetch user1
    const user = await handleGetOneUserById(session?.user._id ?? '');

    return <ReduxChangeState user={user}>{children}</ReduxChangeState>;
}
