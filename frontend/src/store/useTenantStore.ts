import { create } from 'zustand';
import { mockAppointments, mockNotifications } from '../data/mockData';

interface TenantState {
  savedRooms: string[];
  toggleSaveRoom: (roomId: string) => void;
  isRoomSaved: (roomId: string) => boolean;
  
  appointments: any[];
  bookAppointment: (appointment: any) => void;
  
  notifications: any[];
  markNotificationAsRead: (id: string) => void;

  reviews: any[];
  addReview: (review: any) => void;
}

export const useTenantStore = create<TenantState>((set, get) => ({
  savedRooms: ['room-001', 'room-005'],
  
  toggleSaveRoom: (roomId) => set((state) => {
    const isSaved = state.savedRooms.includes(roomId);
    if (isSaved) {
      return { savedRooms: state.savedRooms.filter(id => id !== roomId) };
    } else {
      return { savedRooms: [...state.savedRooms, roomId] };
    }
  }),
  
  isRoomSaved: (roomId) => get().savedRooms.includes(roomId),
  
  appointments: mockAppointments.filter(a => a.tenantId === 'tenant-001'),
  
  bookAppointment: (appointment) => set((state) => ({
    appointments: [...state.appointments, appointment]
  })),
  
  notifications: mockNotifications.filter(n => n.type !== 'review' && n.type !== 'appointment'),
  
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    )
  })),

  reviews: [],
  addReview: (review) => set((state) => ({
    reviews: [...state.reviews, review]
  }))
}));
