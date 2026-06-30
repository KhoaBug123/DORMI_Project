import { create } from 'zustand';
import { mockRooms, mockAppointments, mockNotifications } from '../data/mockData';

interface LandlordState {
  myRooms: any[];
  addRoom: (room: any) => void;
  updateRoom: (id: string, data: any) => void;
  
  appointments: any[];
  updateAppointmentStatus: (id: string, status: string) => void;
  
  notifications: any[];
  markNotificationAsRead: (id: string) => void;

  reportedIssues: any[];
  addReportedIssue: (issue: any) => void;
}

export const useLandlordStore = create<LandlordState>((set) => ({
  myRooms: mockRooms.filter(r => r.landlordId === 'landlord-001'),
  
  addRoom: (room) => set((state) => ({
    myRooms: [room, ...state.myRooms]
  })),
  
  updateRoom: (id, data) => set((state) => ({
    myRooms: state.myRooms.map(r => r.id === id ? { ...r, ...data } : r)
  })),
  
  appointments: mockAppointments.filter(a => a.landlordId === 'landlord-001'),
  
  updateAppointmentStatus: (id, status) => set((state) => ({
    appointments: state.appointments.map(a => 
      a.id === id ? { ...a, status } : a
    )
  })),
  
  notifications: mockNotifications.filter(n => n.type === 'review' || n.type === 'appointment' || n.type === 'ticket'),
  
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    )
  })),

  reportedIssues: [],
  addReportedIssue: (issue) => set((state) => ({
    reportedIssues: [...state.reportedIssues, issue],
    notifications: [
      {
        id: `noti-issue-${Date.now()}`,
        title: 'Sự cố mới được báo cáo',
        message: `Phòng ${issue.roomId} vừa có báo cáo sự cố: ${issue.title}`,
        type: 'ticket',
        isRead: false,
        createdAt: new Date().toISOString()
      },
      ...state.notifications
    ]
  }))
}));
