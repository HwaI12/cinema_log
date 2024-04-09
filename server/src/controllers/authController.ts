// src/controllers/authController.ts

import supabase from '../services/authService';
import { Request, Response } from 'express';
import { AuthError, Session, UserCredentials } from '@supabase/supabase-js';

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    } as UserCredentials);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    } as UserCredentials);

    if (error) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.status(200).json({ user, session });
  } catch (error) {
    console.error('Error signing in:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteAccount(req: Request, res: Response) {
  try {
    const { error } = await supabase.auth.deleteAccount();

    if (error) {
      return res.status(500).json({ error: 'Failed to delete account' });
    }

    return res.status(204).json();
  } catch (error) {
    console.error('Error deleting account:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}