import { useEffect } from 'react';
import { useRouter } from 'next/router';
import client from '../lib/supabase';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        async function logout() {
            await client.auth.signOut();
            router.push('/');
        }
        logout();
    }, [router]);

    return <div>Logging out...</div>;
}
