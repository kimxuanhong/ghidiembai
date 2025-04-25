import { defineStore } from 'pinia';
import { useFirebaseStore } from './firebaseStore';
import { useUIStore } from './uiStore';

export const useRoomStore = defineStore('room', {
  state: () => ({
    currentRoom: '',
    games: []
  }),

  actions: {
    // Khởi tạo state với thông tin từ FirebaseStore
    init() {
      const firebaseStore = useFirebaseStore();
      this.currentRoom = firebaseStore.getCurrentRoom();
    },
    
    // Lấy danh sách game trong phòng
    subscribeToGamesList() {
      const firebaseStore = useFirebaseStore();
      const uiStore = useUIStore();
      
      this.init();
      uiStore.setLoading(true);
      
      firebaseStore.subscribeToGames(this.currentRoom, (gamesArray) => {
        this.games = gamesArray;
        uiStore.setLoading(false);
      });
    },

    // Hủy đăng ký khi không cần thiết nữa
    unsubscribeFromGamesList() {
      const firebaseStore = useFirebaseStore();
      firebaseStore.unsubscribeToGames();
    },

    // Tham gia phòng
    async joinRoom(roomId = 'public') {
      const firebaseStore = useFirebaseStore();
      const uiStore = useUIStore();
      
      uiStore.setLoading(true);
      await firebaseStore.createNewRoom(roomId);
      this.currentRoom = roomId;
      this.subscribeToGamesList();
    },

    // Tạo game mới
    async createNewGame(gameData) {
      const firebaseStore = useFirebaseStore();
      const uiStore = useUIStore();
      
      try {
        uiStore.setLoading(true);
        const result = await firebaseStore.createNewGame(gameData);
        uiStore.setLoading(false);
        return result;
      } catch (error) {
        uiStore.setLoading(false);
        console.error("Error creating new game:", error);
        throw error;
      }
    },

    // Mở game đã tồn tại
    async openGame(gameIndex) {
      const firebaseStore = useFirebaseStore();
      const uiStore = useUIStore();
      
      try {
        uiStore.setLoading(true);
        const game = this.games[gameIndex];
        const result = await firebaseStore.openExistingGame(game);
        uiStore.setLoading(false);
        return result;
      } catch (error) {
        uiStore.setLoading(false);
        console.error("Error opening game:", error);
        throw error;
      }
    }
  }
}); 