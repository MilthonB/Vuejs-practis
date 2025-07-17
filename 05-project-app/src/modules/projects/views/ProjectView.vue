<template>
    <div w-full>
    <section class="m-2">
        <BreadCrumbs :name="project?.name ?? 'No name'"/>
    </section>

    <section class="m-2">
        <div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th class="w-14">Completada</th>
        <th>Tarea</th>
        <th>Completada en</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="task in project?.tasks" :key="task.id" class="hover:bg-base-300">
        <th>2</th>
        <td>{{ task.name }}</td>
        <td>Desktop Support Technician</td>
      </tr>

      

      <!-- row 1 -->
      <tr class="">
        <th></th>
        <td>
            <input 
            v-model="newTask"
            @keyup.enter="addtask"
            type="text" class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100" placeholder="Nueva tarea"/>
        </td>
        <td></td>
      </tr>
      
    </tbody>
  </table>
</div>
    </section>
    </div>
    
</template>

<script setup lang="ts">
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useRoute, useRouter } from 'vue-router';
import { useProjectsStore } from '../store/projects.store';
import { ref, watch } from 'vue';
import type { Project } from '../interfaces/project.interface';


const newTask = ref('');
interface Props{
    id:string;
}



// const route = useRoute();// esta es ptra forma
// const id = route.params.id;

const router = useRouter();

const props = defineProps<Props>(); // aqui cargo el id del url hay otra forma
//  Estos los tienes que definir en las rutas como true las props

const projectStore =  useProjectsStore();

const project =  ref<Project | null>();

// const project  = projectStore.projectList.find(project => project.id === props.id);


watch(()=> props.id, ()=>{
    project.value  = projectStore.projectList.find(project => project.id === props.id);
    if(!project.value){
        router.replace('/');
    }
},{
    immediate: true // para ejecuar el watch en el momento de la contruccion de componente 
});


const addtask = () =>{

  if(!project.value) return;
  console.log('task added')
    projectStore.addtaskToProjects(project.value.id, newTask.value);
}


</script>

<style scoped>

</style>