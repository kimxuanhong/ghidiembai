import { defineStore } from 'pinia';
import { useFirebaseStore } from './firebaseStore';

export const useGameStore = defineStore('game', {
  state: () => ({
    currentRoom: '',
    game: null,
    editingRowIndex: null,
    gameStatus: '',
    winnerMessage: '',
  }),

  getters: {
    // Tính toán các tổng điểm
    totalScores: (state) => {
      if (!state.game || !state.game.scores) return [0, 0, 0, 0];

      const totals = [0, 0, 0, 0];
      state.game.scores.forEach(scores => {
        if (!scores) return;

        scores.forEach((score, index) => {
          if (typeof score === 'number') {
            totals[index] += score;
          }
        });
      });

      return totals;
    },

    // Tính toán người chiến thắng
    winnerIndex: (state) => {
      if (!state.totalScores.length) return 0;
      return state.totalScores.reduce((maxIndex, score, index, array) =>
        score > array[maxIndex] ? index : maxIndex, 0);
    },

    // Kiểm tra xem game đã kết thúc chưa
    isGameEnded: (state) => {
      return state.game && state.game.isEnded;
    }
  },

  actions: {
    // Reset trạng thái game khi chuyển game mới
    resetGameState() {
      this.gameStatus = '';
      this.winnerMessage = '';
      this.editingRowIndex = null;
    },

    initGame() {
      const firebaseStore = useFirebaseStore();
      
      // Reset trạng thái mỗi khi khởi tạo game mới
      this.resetGameState();
      
      // Cập nhật currentRoom
      this.currentRoom = firebaseStore.getCurrentRoom();

      // Tải thông tin game hiện tại
      const currentGame = firebaseStore.getCurrentGame();
      if (!currentGame) {
        return false;
      }

      firebaseStore.subscribeToGamesScore(
        this.currentRoom, 
        currentGame.firebaseId, 
        currentGame, 
        this.handleGameUpdate
      );

      return true;
    },

    handleGameUpdate(dbGame) {
      const firebaseStore = useFirebaseStore();
      const previousGameId = this.game?.firebaseId;
      
      this.game = dbGame;

      // Nếu đây là game mới, reset trạng thái
      if (previousGameId && previousGameId !== dbGame.firebaseId) {
        this.resetGameState();
      }

      // Đảm bảo các thuộc tính cần thiết tồn tại
      if (!this.game.scores) {
        this.game.scores = [];
      }

      if (!this.game.totalScores) {
        this.game.totalScores = [0, 0, 0, 0];
      }

      firebaseStore.saveCurrentGame(this.game);

      // Cập nhật trạng thái nếu game đã kết thúc
      if (this.game.isEnded) {
        this.displayWinner();
      } else {
        // Nếu game chưa kết thúc, đảm bảo không hiển thị thông báo người chiến thắng
        this.winnerMessage = '';
        this.gameStatus = '';
      }
    },

    cleanupSubscriptions() {
      const firebaseStore = useFirebaseStore();
      firebaseStore.unsubscribeToGamesScore();
      // Reset trạng thái khi cleanup
      this.resetGameState();
    },

    setEditingRowIndex(index) {
      if (this.isGameEnded) return;
      this.editingRowIndex = index;
    },

    displayWinner() {
      if (!this.game || !this.game.players) return;

      this.gameStatus = 'Game đã kết thúc';
      const winner = this.game.players[this.winnerIndex];
      this.winnerMessage = `${winner} chiến thắng! 🎉`;
    },

    async saveScores(scores) {
      const firebaseStore = useFirebaseStore();
      
      try {
        if (this.editingRowIndex !== null) {
          // Cập nhật điểm cho vòng hiện có
          await firebaseStore.editScore(
            this.currentRoom, 
            this.game.firebaseId, 
            this.editingRowIndex, 
            scores
          );
        } else {
          // Thêm điểm mới vào đầu mảng rounds
          await firebaseStore.addScore(
            this.currentRoom, 
            this.game.firebaseId, 
            scores
          );
        }
        this.editingRowIndex = null;
        return true;
      } catch (error) {
        console.error("Lỗi khi lưu điểm:", error);
        this.editingRowIndex = null;
        return false;
      }
    },

    async endGame() {
      const firebaseStore = useFirebaseStore();
      
      try {
        // Đặt trạng thái game là đã kết thúc
        this.game.isEnded = true;
        // Lưu ngày giờ kết thúc
        this.game.endDate = new Date().toISOString();
        // Lưu game
        await firebaseStore.closeScore(this.currentRoom, this.game.firebaseId);

        // Cập nhật UI
        this.displayWinner();
        return true;
      } catch (error) {
        console.error("Lỗi khi kết thúc game:", error);
        return false;
      }
    }
  }
}); 