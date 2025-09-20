importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// 本ファイルはビルドを通らないので、バックグラウンド用の設定が必要
firebase.initializeApp({
    apiKey: "AIzaSyCO0leHI_zVN1v3goC082WlHjLKZqokUGo",
    authDomain: "web-push-9092f.firebaseapp.com",
    projectId: "web-push-9092f",
    storageBucket: "web-push-9092f.firebasestorage.app",
    messagingSenderId: "139283173258",
    appId: "1:139283173258:web:e587d24efebb93a9518273"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    // ブラウザがバックグラウンド中にプッシュ通知を受けると呼ばれる
    // Firebase SDKが自動でshowNotificationを実行する
    // https://developer.mozilla.org/ja/docs/Web/API/ServiceWorkerRegistration/showNotification
    console.log('[sw.js] Received background message ', payload);
});
