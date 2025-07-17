<script setup lang="ts">
import CustomModal from '@/modules/common/components/CustomModal.vue'
import FabButton from '@/modules/common/components/FabButton.vue'
import InputModal from '@/modules/common/components/InputModal.vue'
import AddCircle from '@/modules/common/icons/AddCircle.vue'
import ModalIcon from '@/modules/common/icons/ModalIcon.vue'
import { ref } from 'vue'
import { useProjectsStore } from '../store/projects.store'

const modalOpen = ref(false)
const cuustomModalOpen = ref(false)

const projectsStore = useProjectsStore()

</script>

<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Proyectos</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->

        <tr
          v-for="(projects, index) in projectsStore.projectList"
          :key="projects.id"
          class="hover:bg-base-300"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ projects.name }}</td>
          <td>{{ projects.tasks.length }}</td>
          <td>
            <progress class="progress progress-primary w-56" value="1" max="100"></progress>
          </td>
        </tr>
      </tbody>
    </table>

    <input-modal
      :open="modalOpen"
      @close="modalOpen = false"
      @value="projectsStore.addProject"
      title="Nuevo proyecto"
      subtitle="Dale un nombre unico a t proyecto"
    />

    <custom-modal :open="cuustomModalOpen">
      <template #header>
        <h1 class="text-3xl">Titulo del modal</h1>
      </template>

      <template #body>
        <h1 class="text-3xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, doloremque!
        </h1>
      </template>

      <template #footer>
        <div class="flex mt-5 justify-end">
          <button @click="cuustomModalOpen = false" class="btn">Close</button>
          <button @click="cuustomModalOpen = false" class="btn btn-primary ml-4">Aceptar</button>
        </div>
      </template>
    </custom-modal>

    <fab-button @click="modalOpen = true">
      <add-circle></add-circle>
    </fab-button>

    <fab-button @click="cuustomModalOpen = true" position="bottom-left">
      <modal-icon />
    </fab-button>
  </div>
</template>
