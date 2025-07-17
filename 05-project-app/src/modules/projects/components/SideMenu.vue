<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <H2 class="text-lg font-bold mx-4">Proyectos</H2>
    <p v-if="projectStore.noProjects" class="text-sm text-gray-500 mx-4">No hay proyectos</p>
    <!-- Menu -->
    <ul v-else class="menu rounded-box w-56">
      <li v-for="project in projectStore.projectList" :key="project.id">
        <template v-if="project.tasks.length > 0">
          <details>
            <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
            <ul>
              <li v-for="task in project.tasks" :key="task.id"><RouterLink :to="`/project/${project.id}`">{{ task.name }}</RouterLink></li>
            </ul>
          </details>
        </template>

        <template v-else>
          <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
        </template>
      </li>
      
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { useProjectsStore } from '../store/projects.store'

const projectStore = useProjectsStore()
</script>

<style scoped></style>
