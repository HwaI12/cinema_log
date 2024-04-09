import { useEffect } from 'react';
import { useRouter } from 'next/router';
import client from '../lib/supabase';

export default function ProtectedPage() {
    const router = useRouter();

    useEffect(() => {
        const session = client.auth.getSession();
        if (!session) {
            router.push('/login');
        }
    }, [router]);

    return <div>Protected Page</div>;
}
