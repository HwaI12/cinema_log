import { useState } from 'react';
import { useRouter } from 'next/router';
import client from '../lib/supabase';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignUp = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { error } = await client.auth.signUp({ email, password });
            if (error) {
                throw error;
            }
            alert('Sign up successful. Please check your email for verification.');
            router.push('/login');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
        </form>
    );
}