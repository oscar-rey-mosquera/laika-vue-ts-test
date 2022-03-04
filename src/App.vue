<script setup lang="ts">
import { ref } from 'vue';
import {TipoDocumento, Usuario} from './types'
import {useHttpState} from './composable/useHttpState'
import {getTipoDocumentos, 
eliminarTipoDocumento, 
crearTipoDocumento, 
getTipoDocumento,
actualizarTipoDocumento
} from './services/tipo-documento'
import {
       getUsuarios, 
       eliminarUsuario,
       crearUsuario,
       getUsuario,
       actualizarUsuario
       } from './services/usuario'


let nombre = ref()
let idDId = ref<number | null>(null)
let userId = ref<number | null>(null)
let  nombreUsuario = ref()
let  documentoId = ref()
let  documento = ref()


const  { data:         tipoDocumentos, 
         error:        tipoDocumentoError, 
         loadingText:  tipoDocumentoLoadingText,
         mutation: mutationTipoDocumento
} = 
useHttpState<TipoDocumento[]>(getTipoDocumentos);

const  { data:         usuarios, 
         error:        usuarioError, 
         loadingText:  usuarioLoadingText,
         mutation: mutationPersona
} = 
useHttpState<Usuario[]>(getUsuarios);

const eliminarDId = (id: number) => {
  
   mutationTipoDocumento(eliminarTipoDocumento,id);


}


const submitEliminarUsuario = (id: number) => {
   mutationPersona(eliminarUsuario,id);
}

const findDId = async (id: number) => {
  const {data} = await getTipoDocumento(id)
   nombre.value = data[0].nombre
   idDId.value = data[0].id ?? 0
   
}

const findUsuario = async (id: number) => {
  const {data} = await getUsuario(id)
   nombreUsuario.value = data.nombre
   userId.value = data.id ?? 0
   documento.value = data.documento
   documentoId.value= data.tipo_documento_id

   
}

const submitUsuario = () => {
  const data = {
    nombre : nombreUsuario.value,
    tipo_documento_id: documentoId.value,
    documento: documento.value
  }
  const id = userId.value;

   if(id){
   mutationPersona(actualizarUsuario,{id, data });
   userId.value = null
   }else {
   mutationPersona(crearUsuario,data);
   }


}

const crearDId = () => {

  const id = idDId.value;

  if(id) {
   mutationTipoDocumento(actualizarTipoDocumento, {id, data: {nombre: nombre.value}})
   idDId.value = null
  }else {
      mutationTipoDocumento(crearTipoDocumento, {nombre : nombre.value});
  }
 
 
}

</script>

<template>

<div v-if="tipoDocumentos && !tipoDocumentoLoadingText">
  <ul>
  <h2>Tipos de documentos</h2>
  <li v-for="tipoDcomento in tipoDocumentos" :key="tipoDcomento.id">
    {{tipoDcomento.nombre}}
    <a @click="eliminarDId(tipoDcomento.id ?? 0)">Eliminar</a>
    <a @click="findDId(tipoDcomento.id ?? 0)">Editar</a>
  </li>
</ul>
<form @submit.prevent="crearDId">
  <input type="text" required v-model="nombre">
  <button>{{idDId ? 'Editar' : 'Crear'}}</button>
</form>
</div>
<h4>{{tipoDocumentoLoadingText}}</h4>
<h4>{{tipoDocumentoError}}</h4>

<div v-if="usuarios && !usuarioLoadingText">
<ul>
  <h2>Usuarios</h2>
  <li v-for="usuario in usuarios" :key="usuario.id">
   <b>nombre:</b> {{usuario.nombre}} 
   <b>documento:</b> {{usuario.documento}} 
   <b>tipoDcumento:</b> {{usuario.tipo_documento}}
   <a @click="submitEliminarUsuario(usuario.id ?? 0)">Eliminar</a>
   <a @click="findUsuario(usuario.id ?? 0)">Editar</a>
  </li>
</ul>
<form @submit.prevent="submitUsuario">
  <input type="text" placeholder="Nombre" required v-model="nombreUsuario">
  <select v-model="documentoId">
  <option v-for="tipoDcomento in tipoDocumentos" :key="tipoDcomento.id" 
  :value="tipoDcomento.id">{{tipoDcomento.nombre}}</option>
  </select>
  <input type="text" placeholder="Documento" required v-model="documento">
   <button>{{userId ? 'Editar' : 'Crear'}}</button>
</form>
</div>
<h4>{{usuarioLoadingText}}</h4>
<h4>{{usuarioError}}</h4>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
