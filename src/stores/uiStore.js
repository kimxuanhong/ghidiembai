import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
  state: () => ({
    playerNamesModalVisible: false,
    scoreModalVisible: false,
    endGameModalVisible: false,
    isLoading: false
  }),

  actions: {
    showPlayerNamesModal() {
      this.playerNamesModalVisible = true;
    },

    hidePlayerNamesModal() {
      this.playerNamesModalVisible = false;
    },

    showScoreModal() {
      this.scoreModalVisible = true;
    },

    hideScoreModal() {
      this.scoreModalVisible = false;
    },

    showEndGameModal() {
      this.endGameModalVisible = true;
    },

    hideEndGameModal() {
      this.endGameModalVisible = false;
    },

    setLoading(status) {
      this.isLoading = status;
    }
  }
}); 