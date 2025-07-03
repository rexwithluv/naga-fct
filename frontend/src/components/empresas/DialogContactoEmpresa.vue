<script setup lang="ts">
  import { ContactoEmpresa } from '@/types/models/ContactoEmpresa'
  import { BookUser, Mail, Phone } from 'lucide-vue-next'
  import { ModelRef, ref, watch } from 'vue'

  const isVisible: ModelRef<boolean | undefined> = defineModel('isVisible')
  const selectedEmpresa: ModelRef<Empresa> = defineModel('selectedEmpresa')
  const contactData: Ref<ContactoEmpresa | null> = ref(null)

  watch(isVisible, (newValue) => {
    if (newValue) {
      contactData.value = selectedEmpresa.value.contacto
    }
  })
</script>

<template>
  <Dialog v-model:visible="isVisible" header="Datos de contacto" modal dismissableMask>
    <div class="flex flex-col items-center justify-center mb-5">
      <BookUser class="text-primary mb-3" :size="36" />
      <h3 class="text-xl font-semibold">{{ contactData?.nombre || 'No disponible' }}</h3>
    </div>

    <hr class="mb-4" />

    <div class="field mb-1">
      <p class="flex items-center gap-2">
        <Phone :size="18" aria-label="Teléfono de contacto" />
        {{ contactData?.telefono }}
      </p>
    </div>
    <div class="field">
      <p class="flex items-center gap-2">
        <Mail :size="18" aria-label="E-mail de contacto" />
        {{ contactData?.email }}
      </p>
    </div>
  </Dialog>
</template>
