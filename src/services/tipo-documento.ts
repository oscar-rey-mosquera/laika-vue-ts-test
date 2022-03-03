import http from '../features/axios'
import {TipoDocumento} from '../types'


export const getTipoDocumentos = async () => {
 
  return await http.get<TipoDocumento[]>('tipo-documentos');

}

export const eliminarTipoDocumento = async (id: number) => {

  return await http.delete(`tipo-documentos/${id}`); 
}


export const getTipoDocumento = async (id: number) => {

  return await http.get<TipoDocumento[]>(`tipo-documentos/${id}`); 
}


export const crearTipoDocumento = async (data: Object) => {

  return await http.post(`/tipo-documentos`, data); 
}


export const actualizarTipoDocumento = async (data : {id: number, data:TipoDocumento } ) => {

  return await http.put(`/tipo-documentos/${data.id}`, data.data); 
}