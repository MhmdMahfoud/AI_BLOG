import { createContext } from "react";
interface AuthContextType{
    user:User | null;
    loading:boolean;
login:(email:string,password:string)=>Promise<{success:boolean}>
register:(name:string,email:string,password:string)=>Promise<{success:boolean}>
logout:()=>Promise<void>
checkAuth:()=>Promise<void>

}
const AuthContext=createContext<AuthContextType|undefined>