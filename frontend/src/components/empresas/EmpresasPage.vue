<script setup lang="ts">
  import { useConcello } from '@/composables/useConcello'
  import { useEmpresa } from '@/composables/useEmpresa'
  import { useSkill } from '@/composables/useSkill'
  import booleanToSpanish from '@/helpers/booleanToSpanish'
  import formatList from '@/helpers/formatList'
  import { ContactoEmpresa } from '@/types/models/ContactoEmpresa'
  import { Empresa } from '@/types/models/Empresa'
  import { FilterMatchMode } from '@primevue/core/api'
  import { onMounted, Ref, ref } from 'vue'

  const { getEmpresas, deleteEmpresa } = useEmpresa()
  const { getConcellos } = useConcello()
  const { getSkills } = useSkill()

  const empresas: Ref<Empresa[]> = ref([])
  const concellos = ref([])
  const skills = ref([])
  const empresaID: Ref<number> = ref(0)

  const selectedEmpresa: Ref<ContactoEmpresa> = ref(null)
  const showContactDialog: Ref<boolean> = ref(false)
  const showDetailsDialog: Ref<boolean> = ref(false)
  const showCreateDialog: Ref<boolean> = ref(false)

  const filters = ref({
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'concello.nombre': { value: null, matchMode: FilterMatchMode.EQUALS },
    skills: { value: null, matchMode: FilterMatchMode.CONTAINS },
    activa: { value: null, matchMode: FilterMatchMode.EQUALS },
  })

  const openContactDialog = (empresaData: Empresa) => {
    selectedEmpresa.value = empresaData
    showContactDialog.value = true
  }
  const openDetailsDialog = (empresaData: Empresa) => {
    selectedEmpresa.value = empresaData
    showDetailsDialog.value = true
  }
  const openCreateDialog = () => {
    showCreateDialog.value = true
  }

  const handleDeleteEmpresa = async (empresaData: Empresa) => {
    const success: boolean = await deleteEmpresa(empresaData)
    if (success) {
      empresas.value = await getEmpresas()
    }
  }

  onMounted(async () => {
    empresas.value = await getEmpresas()
    concellos.value = await getConcellos()
    skills.value = await getSkills()
  })
</script>

<template>
  <div>
    <ConfirmDialog />
    <DialogContactoEmpresa
      v-model:isVisible="showContactDialog"
      v-model:selectedEmpresa="selectedEmpresa"
    />
    <DialogDetallesEmpresa
      v-model:selectedEmpresa="selectedEmpresa"
      v-model:isVisible="showDetailsDialog"
    />
    <DialogCrearEmpresa
      v-model:isVisible="showCreateDialog"
      @empresaCreada="getEmpresas"
    ></DialogCrearEmpresa>

    <div class="mb-5 text-center">
      <div class="mb-5">
        <h1 class="text-2xl font-bold mb-3">Empresas</h1>
        <Button label="Crear empresa" @click="openCreateDialog" />
      </div>

      <div class="flex text-center gap-2">
        <div class="flex-grow">
          <label for="filter-nombre" class="font-semibold">Nombre</label>
          <InputText
            id="filter-nombre"
            class="flex-auto"
            placeholder="Telefónica Rueda SL"
            autocomplete="off"
            v-model="filters.nombre.value"
          />
        </div>

        <div class="flex-grow">
          <label for="filter-concello" class="font-semibold">Concello</label>
          <Select
            id="filter-concello"
            name="filter-concello"
            class="flex-auto"
            :options="concellos"
            optionValue="nombre"
            optionLabel="nombre"
            placeholder="Selecciona un concello..."
            v-model="filters['concello.nombre'].value"
            showClear
          />
        </div>

        <div class="flex-grow">
          <label for="filter-skills" class="font-semibold">Skills</label>
          <MultiSelect
            :options="skills"
            id="filter-skills"
            name="filter-skills"
            class="flex-auto"
            optionValue="nombre"
            optionLabel="nombre"
            placeholder="Selecciona las skills..."
            v-model="filters.skills.value"
          />
        </div>

        <div class="flex-grow">
          <label for="filter-activa" class="font-semibold w-24">Activa</label>
          <Checkbox v-model="filters.activa.value" id="filter-activa" name="filter-activa" binary />
        </div>
      </div>
    </div>

    <DataTable
      :value="empresas"
      v-model:filters="filters"
      filterDisplay="menu"
      paginator
      :rows="10"
      rowHover
    >
      <Column field="nombre" header="Nombre" />
      <Column field="concello" header="Concello" />
      <Column field="activa" header="Activa?">
        <template #body="slotProps">
          {{ booleanToSpanish(slotProps.data.activa) }}
        </template>
      </Column>
      <Column field="plazas" header="Plazas" />
      <Column header="Skills">
        <template #body="slotProps">
          {{ formatList(slotProps.data.skills) }}
        </template>
      </Column>
      <Column header="Acciones">
        <template #body="{ data }">
          <Button class="mr-2" label="Ver contacto" @click="openContactDialog(data)" />
          <Button class="mr-2" label="Ver detalles" @click="openDetailsDialog(data)" />
          <Button class="mr-2" label="Editar" @click="openDetailsDialog(data)" />
          <Button label="Marcar como inactiva" @click="deleteEmpresa(data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
