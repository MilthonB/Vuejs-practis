import { defineStore } from "pinia"
import { computed, ref } from "vue";
import type { Project } from "../interfaces/project.interface";
import { v4 as uuiv4  } from 'uuid';
import { useLocalStorage } from "@vueuse/core";



// const initialLoad = ():Project[]=>{


//     return[
//         {
//             id:uuiv4(),
//             name:'project 1',
//             tasks:[]
//         },
//         {
//             id:uuiv4(),
//             name:'project 1',
//             tasks:[]
//         }
//     ]
// }


export const useProjectsStore = defineStore('projects', () => {

    const projects = ref( useLocalStorage<Project[]>('projects',[]));




    const addProject = (name: string) => {
        if(name.length === 0) return;

        projects.value.push({
            id: uuiv4(),
            name:name,
            tasks: []
        })
      
    }

    const addtaskToProjects= (projectId:string, taskName: string)=> {

        if(taskName.trim().length === 0 )return;

        const project = projects.value.find(project => project.id = projectId);

        if(!project) return;

        project.tasks.push(
            {
                id: uuiv4(),
                name:taskName,
                // completedAt: undefined
            }
    
        );


        // {
        //     id: uuiv4(),
        //     name:xxxx,
        //     completedAt: undefined
        // }
    }

    return {
        projects,
        
        projectList:computed(()=> [...projects.value]),
        noProjects: computed(()=> projects.value.length === 0),

        // Actions
        addProject,

        addtaskToProjects
    }

})


