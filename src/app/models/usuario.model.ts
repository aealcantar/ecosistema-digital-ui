// export class Usuario {
//     public email: string;
//     public password: string;

//     constructor(correo: string, pass: string) {
//         this.email = correo;
//         this.password = pass;
//      }


// }

export class Usuario {
    public idUsuario?: number | undefined;
    public strEmail?: string = "";
    public strUserName?: string = "";
    public strPassword?: string = "";
    public strRol?: string = "";
    public strNombres?: string = "";
    public strApellidoP?: string = "";
    public strApellidoM?: string = "";
    public cveUsuario?: number;
    public rolUser?: string = "";
    public areaDefault?: string = "";
    constructor() { }
}