import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/domain/user';

class Storage {
  private static instance: Storage;

  private constructor() {
    this.initialize().then(() => console.log('Storage initialized'));
  }

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }

  async initialize() {
    try {
      const defaultEmail = 'mobile@uc.com';
      const existingUser = await AsyncStorage.getItem(defaultEmail);
      if (!existingUser) {
        const defaultUser: User = {
          email: defaultEmail,
          password: 'hello123!',
        };
        await AsyncStorage.setItem(defaultEmail, JSON.stringify(defaultUser));
      }
    } catch (error) {
      console.error('Failed to initialize storage:', error);
    }
  }

  async addUser(user: User) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      throw new Error('Invalid email format');
    }

    try {
      const existingUser = await AsyncStorage.getItem(user.email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      await AsyncStorage.setItem(user.email, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to add user to storage:', error);
      throw error;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const userKeys = keys.filter((key: string) => key.includes('@') && key.includes('.'));

      const userPromises = userKeys.map((key: string) => AsyncStorage.getItem(key));
      const userJsonList = await Promise.all(userPromises);

      return userJsonList
        .map((value) => (value ? JSON.parse(value) : null))
        .filter((user): user is User => user !== null);
    } catch (error) {
      console.error('Failed to fetch users from storage:', error);
      return [];
    }
  }
  
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(email);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error(`Failed to fetch user with email ${email}:`, error);
      return null;
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }
}

const storageInstance = Storage.getInstance();

export const initializeStorage = () => storageInstance.initialize();
export const addUser = (user: User) => storageInstance.addUser(user);
export const getUserByEmail = (email: string) => storageInstance.getUserByEmail(email);
export const getUsers = () => storageInstance.getUsers();
export const clearStorage = () => storageInstance.clear();
export const userStorage = storageInstance;
