import Vue from 'vue'
import { mapGetters } from 'vuex';
import floatObj from '../util/floatObj'
Vue.mixin({
    computed:{
        ...mapGetters([
            "getIsMobile"
        ])
    },
    methods:{
        mathFloor(value, bit=3) {
            let str = value.toString();
            let strIndex = str.indexOf('.');
            if (strIndex === -1) return str;
            str = str.substring(0, strIndex + 1 + bit);
            return str;
        },
    }
})