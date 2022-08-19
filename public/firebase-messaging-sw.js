importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

const firebaseConfig = {
    apiKey: "AIzaSyDktq0tZbbRJnQQNgMJ4rHIR1iob9f4b3w",
    authDomain: "nens-c26f8.firebaseapp.com",
    databaseURL: "https://nens-c26f8-default-rtdb.firebaseio.com",
    projectId: "nens-c26f8",
    storageBucket: "nens-c26f8.appspot.com",
    messagingSenderId: "834214222783",
    appId: "1:834214222783:web:ea9d604d2d0cf72ac61f0a",
    measurementId: "G-YZ861MTYQJ"
};

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messagin-sw.js] Received Background Message', payload)
})
