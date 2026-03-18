import { User } from '@/domain/user';

type AsyncStorageInstance = (typeof import('@react-native-async-storage/async-storage'))['default'];

let storagePromise: Promise<AsyncStorageInstance> | null = null;

const getStorage = async (): Promise<AsyncStorageInstance> => {
  if (!storagePromise) {
    storagePromise = import('@react-native-async-storage/async-storage')
      .then((module) => module.default)
      .catch((error) => {
        storagePromise = null;
        throw new Error(
          `Failed to load AsyncStorage native module. Rebuild the Android app after native dependency changes. Original error: ${String(error)}`
        );
      });
  }

  return storagePromise;
};

export const initializeStorage = async () => {
  try {
    const storage = await getStorage();
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
    const storage = await getStorage();
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
    const storage = await getStorage();
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

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const storage = await getStorage();
    const storedUserJson = await storage.getItem(email);
    return storedUserJson ? (JSON.parse(storedUserJson) as User) : null;
  } catch (error) {
    console.error('Failed to fetch user from storage:', error);
    throw error;
  }
};

export const clearStorage = async () => {
  try {
    const storage = await getStorage();
    await storage.clear();
  } catch (error) {
    console.error('Failed to clear storage:', error);
  }
};
