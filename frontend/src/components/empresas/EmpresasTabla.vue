<script setup lang="js">
const empresas = defineModel('empresas')
const dialogVisible = defineModel('dialogVisible')
const datosContacto = defineModel('datosContacto')

const turnDialogVisible = (datos) => {
  datosContacto.value = datos
  dialogVisible.value = true
}
const formatSkills = (lista) => lista.join(', ')
</script>

<template>
  <DataTable :value="empresas" rowHover>
    <Column field="nombre" header="Nombre" />
    <Column field="concello" header="Concello" />
    <Column field="direccion" header="Dirección" />
    <Column field="observaciones" header="Observaciones" />
    <Column field="especialidad" header="Especialidad" />
    <Column header="Nombre de contacto">
      <template #body="slotProps">
        <Button
          :label="slotProps.data.contacto.nombre"
          @click="turnDialogVisible(slotProps.data.contacto)"
        />
      </template>
    </Column>
    <Column field="plazas" header="Plazas" />
    <Column header="Skills">
      <template #body="slotProps">
        {{ formatSkills(slotProps.data.skills) }}
      </template>
    </Column>
  </DataTable>
</template>
