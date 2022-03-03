import http from '../features/axios'
import {Usuario} from '../types'



export const getUsuarios = async () => {
 
  return await http.get<Usuario[]>('/usuarios');

}


export const getUsuario = async (id: number) => {

  return await http.get<Usuario>(`usuarios/${id}`); 
}

export const eliminarUsuario = async (id: number) => {

  return await http.delete(`usuarios/${id}`); 
}


export const crearUsuario = async (data: Usuario) => {
  return await http.post('/usuarios', data);
}



export const actualizarUsuario = async (data : {id: number, data: Usuario } ) => {

  return await http.put(`/usuarios/${data.id}`, data.data); 
}