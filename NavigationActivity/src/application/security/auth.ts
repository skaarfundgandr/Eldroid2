import { addUser, getUserByEmail } from '@/infrastructure/storage';
import { User } from '@/domain/user';

export const login = async (credentials: User): Promise<boolean> => {
  try {
    const storedUser = await getUserByEmail(credentials.email);
    if (!storedUser) {
      return false;
    }

    return storedUser.password === credentials.password;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
};

export const register = async (user: User): Promise<boolean> => {
  try {
    await addUser(user);
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};
