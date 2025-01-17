<script setup>
import { useRouter} from "vue-router"
import { FormKit } from "@formkit/vue";
import Titulo from "../components/Titulo.vue";
import { addClient } from "../services";

const props = defineProps({
  title: String,
});

const router = useRouter()


const handleSubmit = async (data) => {
  const newClient = {
    ...data,
    state:1,
    id:crypto.randomUUID()
  }
  const res = await addClient(newClient)
  
  if(Object.values(res).length > 0){
    alert("El cliente se ha registrado con exito")

  }

  setTimeout(() => {
    router.push("/")
  }, 1200);
 
}

</script>

<template>
  <Titulo>
    {{ title }}
  </Titulo>

  <section class="my-10 bg-white shadow rounded-lg p-4">
    <div class="flex justify-center mx-auto max-w-md py-6">
      <FormKit 
        @submit="handleSubmit"
        type="form" submit-label="Guardar registro" incomplete-message="Revisa todos los campos">
        <FormKit
          type="text"
          label="Nombre"
          name="name"
          placeholder="Ingrese su nombre"
          validation="required"
          :validation-messages="{ required: 'El nombre es requerido' }"
        />

        <FormKit
          type="text"
          label="Apellido"
          name="lastname"
          placeholder="Ingrese su Apellido"
          validation="required"
          :validation-messages="{ required: 'El apellido es requerido' }"
        />

        <FormKit
          type="email"
          label="Email"
          name="email"
          placeholder="Ingrese su correo electronico"
          validation="required | email"
          :validation-messages="{
            required: 'El email es requerido',
            email: 'El email no es valido',
          }"
        />

        <FormKit
          type="text"
          label="Telefono"
          name="phone"
          placeholder="Ingrese su telefono : xxx-xxx-xxx"
          help="Formato de telefono: xxx-xxx-xxx"
          validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/"
          :validation-messages="{ matches: 'formato de telefono no valido' }"
        />


        <FormKit
          type="text"
          label="Empresa"
          name="company"
          placeholder="Ingrese su Empresa donde labura"
        />

        <FormKit
          type="text"
          label="Cargo"
          name="position"
          placeholder="Ingrese su cargo: Desarrollador, Administrador, etc"
        />
      </FormKit>

    </div>
  </section>
</template>
<style scoped>
.formkit-form {
  width: 100%;
  margin-inline: auto;
}

.formkit-form .formkit-wrapper {
  width: 100%;
  max-width: 100%;
}
</style>
