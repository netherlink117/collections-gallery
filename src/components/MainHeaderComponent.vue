<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const paths = computed(()=> {
    const paths_array = ['/'];
    console.log(route.query.path)
    if (route.query.path === '/' || route.query.path === undefined) return ["/"]
    let splited_paths = String(route.query.path).split('/')
    let base_for_paths = ''
    for (let i = 1; i < splited_paths.length; i++) {
        base_for_paths += '/' + splited_paths[i]
        paths_array.unshift(base_for_paths)
    }
    return paths_array
})

function select(e: Event) {
    for(let i = 0; i < paths.value.length; i++) {
        if (paths.value[i] === e.target.value) {
            router.go(-1 * i);
            break;
        }
    }
}
</script>

<template>
    <select @change="select($event)" class="w-full p-3 dark:bg-dark-900 bg-light-900 text-emerald-500 border-1 border-l-0 border-r-0 border-emerald-500">
        <option v-for="path in paths" :key="path" :value="path" :selected="path === route.query.path">{{ path }}</option>
    </select>
</template>