// Hàm đăng ký service worker
export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Đường dẫn tới service worker tương đối với gốc của trang
            const swUrl = `/ghidiembai/service-worker.js`;

            navigator.serviceWorker.register(swUrl)
                .then(registration => {
                    console.log('ServiceWorker đã đăng ký thành công:', registration.scope);

                    // Kiểm tra và yêu cầu đồng bộ hóa dữ liệu khi online
                    window.addEventListener('online', () => {
                        if (registration.sync) {
                            registration.sync.register('sync-games')
                                .then(() => console.log('Đã đăng ký sync cho ván bài'))
                                .catch(error => console.error('Lỗi khi đăng ký sync:', error));
                        }
                    });
                })
                .catch(error => {
                    console.error('Đăng ký ServiceWorker thất bại:', error);
                });
        });
    } else {
        console.log('Trình duyệt không hỗ trợ service worker');
    }
}

// Hàm hủy đăng ký service worker
export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then(registration => {
                registration.unregister();
            })
            .catch(error => {
                console.error(error.message);
            });
    }
} 