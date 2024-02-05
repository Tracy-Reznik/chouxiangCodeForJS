import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "@/components/views/Home.vue";
import Text from "@/components/views/Text.vue";
import File from "@/components/views/File.vue";
import Index from "@/components/views/Index.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home,
            children:[
                {path:'/',component:Index},
                {path:'text',component:Text},
                {path:'file',component:File},
            ]
        },
    ]
})
