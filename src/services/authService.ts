import { User, UserRole } from '../types';
import { MOCK_USERS } from '../data/mockData';

const AUTH_STORAGE_KEY = 'polartwin_user';

export const authService = {
  login: async (email: string): Promise<User> => {
    // Simulate slight network latency
    await new Promise((res) => setTimeout(res, 400));
    
    const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      // Fallback for custom emails in demo
      const role: UserRole = email.includes('admin') 
        ? 'SUPER_ADMIN' 
        : email.includes('engineer') 
        ? 'ENGINEER' 
        : 'STATION_OPERATOR';
        
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        email,
        role,
        stationId: role === 'STATION_OPERATOR' ? 'maitri' : undefined,
        stationName: role === 'STATION_OPERATOR' ? 'MAITRI STATION' : undefined,
        status: 'ACTIVE',
        lastLogin: new Date().toLocaleString()
      };
      
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      return newUser;
    }
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as User;
    } catch {
      return null;
    }
  },

  logout: (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  hasAccess: (user: User | null, allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  }
};
