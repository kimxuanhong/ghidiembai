# Ghi Điểm Bài - Ứng dụng quản lý điểm bài

## Kiến trúc ứng dụng

Ứng dụng này sử dụng Vue 3 với Composition API và Pinia cho quản lý state.

### Cấu trúc Pinia Store

Ứng dụng sử dụng 4 stores chính để quản lý state:

1. **FirebaseStore** (`src/stores/firebaseStore.js`)
   - Trung tâm cho tất cả tương tác với Firebase
   - Quản lý room và game 
   - Xử lý subscribes và unsubscribes
   - Xử lý lưu trữ và đọc dữ liệu từ local storage

2. **GameStore** (`src/stores/gameStore.js`)
   - Quản lý trạng thái game hiện tại
   - Tính toán điểm số và người chiến thắng
   - Xử lý thêm và chỉnh sửa điểm
   - Kết thúc ván đấu

3. **RoomStore** (`src/stores/roomStore.js`)
   - Quản lý danh sách phòng và trạng thái phòng hiện tại
   - Xử lý tham gia phòng 
   - Tạo game mới và mở game đã tồn tại

4. **UIStore** (`src/stores/uiStore.js`)
   - Quản lý trạng thái UI như hiển thị/ẩn các modal
   - Tách biệt logic UI khỏi logic nghiệp vụ

### Luồng dữ liệu

- Các components tương tác với Pinia stores
- Stores xử lý logic nghiệp vụ
- FirebaseStore xử lý mọi tương tác với Firebase và local storage

### Cách sử dụng

1. Import các stores từ file index:
```js
import { useGameStore, useRoomStore, useUIStore, useFirebaseStore } from '@/stores';
```

2. Sử dụng store trong component:
```js
const gameStore = useGameStore();
const roomStore = useRoomStore();
const uiStore = useUIStore();
```

3. Truy cập state và phương thức:
```js
// State
gameStore.currentRoom
gameStore.game

// Methods
roomStore.joinRoom('new-room');
gameStore.saveScores([10, 5, 3, 0]);
uiStore.showScoreModal();
```

## File cấu trúc

- **src/stores/**: Chứa tất cả Pinia stores
- **src/views/**: Chứa các Vue components cấp trang
- **src/components/**: Chứa các Vue components tái sử dụng
- **src/firebase/**: Chứa cấu hình Firebase
- **src/router/**: Chứa cấu hình Vue Router
- **src/assets/**: Chứa assets như CSS, hình ảnh

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
