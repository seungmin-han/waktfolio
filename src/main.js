import './assets/main.css';

import View3D from '@egjs/vue3-view3d';
import '@egjs/vue3-view3d/css/view3d-bundle.min.css';
import '@egjs/vue3-flicking/dist/flicking.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(View3D);

app.mount('#app');
