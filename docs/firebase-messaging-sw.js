importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// 本ファイルはビルドを通らないので、バックグラウンド用の設定が必要
firebase.initializeApp({
    apiKey: "AIzaSyBxqZiv5BLYapzXGcGPapwUikgM041EHPU",
    authDomain: "web-push2-c5731.firebaseapp.com",
    projectId: "web-push2-c5731",
    storageBucket: "web-push2-c5731.firebasestorage.app",
    messagingSenderId: "643412835670",
    appId: "1:643412835670:web:4aa5c8629e410b38ae6af7"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    // ブラウザがバックグラウンド中にプッシュ通知を受けると呼ばれる
    // Firebase SDKが自動でshowNotificationを実行する
    // https://developer.mozilla.org/ja/docs/Web/API/ServiceWorkerRegistration/showNotification
    console.log('[sw.js] Received background message ', payload);
});
