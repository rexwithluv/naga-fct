<script setup lang="ts">
  import { useAuthStore } from '@/stores/authStore'
  import { LoginForm } from '@/types/models/LoginForm'
  // @ts-ignore
  import { yupResolver } from '@primevue/forms/resolvers/yup'
  import { StoreGeneric } from 'pinia'
  import { useToast } from 'primevue/usetoast'
  import { Ref, ref } from 'vue'
  import { Router, useRouter } from 'vue-router'
  import { object, ObjectSchema, string } from 'yup'

  const toast = useToast()
  const router: Router = useRouter()
  const auth: StoreGeneric = useAuthStore()

  const formValues: Ref<LoginForm> = ref({
    email: '',
    password: '',
  })

  const formSchema: ObjectSchema<LoginForm> = object({
    email: string()
      .email('El correo debe tener un formato válido')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'El correo debe tener un formato válido',
      )
      .required('El correo es obligatorio'),
    password: string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es obligatoria'),
  })

  const handleSubmit = async (): Promise<void> => {
    try {
      await formSchema.validate(formValues.value)
      await auth.login(formValues.value.email, formValues.value.password)

      toast.add({
        severity: 'success',
        summary: 'Inicio de sesión correcto',
        detail: `Bienvenida/o ${auth.nombre}`,
        life: 3000,
      })
      router.push({ name: 'home' })
    } catch (error: any) {
      toast.add({
        severity: 'error',
        summary: 'Error de inicio de sesión',
        detail: error.message,
        life: 3000,
      })
    }
  }
</script>
<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center p-4 text-center">
    <Form
      class="w-150 rounded-lg shadow-md border p-4 space-y-4"
      @submit="handleSubmit"
      :model="formValues"
      :resolver="yupResolver(formSchema)"
    >
      <FormField v-slot="$field" name="email" class="flex flex-col gap-1">
        <InputText
          type="text"
          v-model="formValues.email"
          placeholder="cosita@edu.xunta.gal"
          autocomplete="email"
        />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="password" class="flex flex-col gap-1">
        <Password
          placeholder="renaido"
          v-model="formValues.password"
          :feedback="false"
          toggleMask
          fluid
        />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <Button type="submit" label="Iniciar sesión" />
    </Form>
  </div>
</template>
