export  interface TipoDocumento extends Base{

}


export interface Usuario extends Base {
   documento: string;
   tipo_documento: string;
   tipo_documento_id: number;
}

export  interface Base {
   id?: number;
   nombre : string;
   created_at?: Date;
   updated_at?: Date;
}





