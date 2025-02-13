import {createRouter, createWebHistory } from "vue-router";
import (getAuth, onAuthStateChanged ) from "firebase/auth";
const router = creatRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/Home.vue") },
        {path: "/register", component: () => import("../views/Register.vue")},
        {path: "/sign-in", component: () => import("../views/SignIn.vue")},
        {
            path: "/feed",
            component: () => import("../views/Feed.vue"),
            meta:{
                requiresAuth: true,
            },
        },
    ],
})

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removelistener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removelistener();
                resolve(user);
            },
            reject
        );
    });
};

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser) {
            next();
        }else{
            alert("you dont have access!");
            next("/");
        }
    }else {
            next();
        }
    });

    export default router;