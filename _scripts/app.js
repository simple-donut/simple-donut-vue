
var app = new Vue({
    el: '#app',
    components: {
        'simple-donut': httpVueLoader('_scripts/simple-donut.vue')
    },
    data: {
        percent: 50,
        donut: true
    }
});

var simpleDonut = Vue.component('simple-donut');
