import { Platform } from 'react-native';
import { User } from '@/domain/user';

/**
 * Robust lazy accessor for AsyncStorage to prevent "runtime not ready" errors.
 */
const getAsyncStorage = () => {
  try {
    const AsyncStorage =
      require('@react-native-async-storage/async-storage').default ||
      require('@react-native-async-storage/async-storage');
    return AsyncStorage;
  } catch (e) {
    console.warn('AsyncStorage module lookup failed');
    return null;
  }
};

const storage = {
  getItem: async (key: string) => {
    const as = getAsyncStorage();
    if (as && as.getItem) {
      try {
        return await as.getItem(key);
      } catch (e) {
        console.error('AsyncStorage.getItem failed', e);
      }
    }
    // Fallback to localStorage on Web
    if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: async (key: string, value: string) => {
    const as = getAsyncStorage();
    if (as && as.setItem) {
      try {
        await as.setItem(key, value);
        return;
      } catch (e) {
        console.error('AsyncStorage.setItem failed', e);
      }
    }
    // Fallback to localStorage on Web
    if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
      return;
    }
  },
  getAllKeys: async () => {
    const as = getAsyncStorage();
    if (as && as.getAllKeys) {
      try {
        return await as.getAllKeys();
      } catch (e) {
        console.error('AsyncStorage.getAllKeys failed', e);
      }
    }
    // Fallback to localStorage on Web
    if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
      return Object.keys(localStorage);
    }
    return [];
  },
  clear: async () => {
    const as = getAsyncStorage();
    if (as && as.clear) {
      try {
        await as.clear();
        return;
      } catch (e) {
        console.error('AsyncStorage.clear failed', e);
      }
    }
    // Fallback to localStorage on Web
    if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
      localStorage.clear();
      return;
    }
  },
};

export const initializeStorage = async () => {
  try {
    const defaultEmail = 'mobile@uc.com';
    const existingUser = await storage.getItem(defaultEmail);
    if (!existingUser) {
      const defaultUser: User = {
        email: defaultEmail,
        password: 'hello123!',
      };
      await storage.setItem(defaultEmail, JSON.stringify(defaultUser));
    }
  } catch (error) {
    console.error('Failed to initialize storage:', error);
  }
};

export const addUser = async (user: User) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email)) {
    throw new Error('Invalid email format');
  }

  try {
    const existingUser = await storage.getItem(user.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    await storage.setItem(user.email, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to add user to storage:', error);
    throw error;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const keys = await storage.getAllKeys();
    const userKeys = keys.filter((key: string) => key.includes('@') && key.includes('.'));

    const userPromises = userKeys.map((key: string) => storage.getItem(key));
    const userJsonList = await Promise.all(userPromises);

    return userJsonList
      .map((value) => (value ? JSON.parse(value) : null))
      .filter((user): user is User => user !== null);
  } catch (error) {
    console.error('Failed to fetch users from storage:', error);
    return [];
  }
};

export const clearStorage = async () => {
  try {
    await storage.clear();
  } catch (error) {
    console.error('Failed to clear storage:', error);
  }
};

// Export the storage object for auth.ts
export const userStorage = storage;
