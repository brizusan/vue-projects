<script setup>
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Titulo from "../components/Titulo.vue";
import { getClientById, updateClient } from "../services";

defineProps({
  title: String,
});

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const formData = reactive({});

onMounted(() => {
  obtenerCliente();
});

const obtenerCliente = async () => {
  try {
    const res = await getClientById(id);
    Object.assign(formData, res);
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = async (data) => {

  try {
    await updateClient(id, data);
    alert("El cliente se ha actualizado con exito");

    setTimeout(() => {
      router.push("/");
    }, 1200);
  } catch (error) {
    console.log(error);
  }


};

</script>
<template>
  <Titulo>
    {{ title }}
  </Titulo>

  <section class="my-10 bg-white shadow rounded-lg p-4">
    <div class="flex justify-center mx-auto max-w-md py-6">
      <FormKit @submit="handleSubmit" type="form" submit-label="Actualizar registro"
        incomplete-message="Revisa todos los campos">
        <FormKit type="text" label="Nombre" name="name" placeholder="Ingrese su nombre" validation="required"
          :validation-messages="{ required: 'El nombre es requerido' }" v-model="formData.name" />

        <FormKit type="text" label="Apellido" name="lastname" placeholder="Ingrese su Apellido" validation="required"
          :validation-messages="{ required: 'El apellido es requerido' }" v-model="formData.lastname" />

        <FormKit type="email" label="Email" name="email" placeholder="Ingrese su correo electronico"
          validation="required | email" :validation-messages="{
            required: 'El email es requerido',
            email: 'El email no es valido',
          }" v-model="formData.email" />

        <FormKit type="text" label="Telefono" name="phone" placeholder="Ingrese su telefono : xxx-xxx-xxx"
          help="Formato de telefono: xxx-xxx-xxx" validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/"
          :validation-messages="{ matches: 'formato de telefono no valido' }" v-model="formData.phone" />

        <FormKit type="text" label="Empresa" name="company" placeholder="Ingrese su Empresa donde labura"
          v-model="formData.company" />

        <FormKit type="text" label="Cargo" name="position"
          placeholder="Ingrese su cargo: Desarrollador, Administrador, etc" v-model="formData.position" />
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
