import { handleGetOneUseById } from '@/utils/actions/actions';
import WrapperRedux from '@/components/WrapperReducerRedux/redux.changeState';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function ReduxFetchApi({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    // đời WrapperRedux ra ngoài layout và cả fetch user1
    const user1 = await handleGetOneUseById(session?.user._id ?? '');

    return <WrapperRedux user={user1}>{children}</WrapperRedux>;
}
