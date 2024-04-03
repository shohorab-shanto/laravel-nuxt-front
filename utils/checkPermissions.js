import { useAuthStore } from "~/stores/auth";

export default (permissions = [], roles = []) =>{
    let return_value = false;
    const auth = useAuthStore();

    if((Array.isArray(auth.roles) && auth.roles.includes("Admin")) || auth.roles == 'Admin'){
        return_value = true;
    }else if(permissions !== [] || permissions !== '' || roles !== [] || roles !== ''){
        
        if(Array.isArray(permissions)){
            permissions.forEach(element => {
                if(auth.permissions.includes(element)) return_value = true;
            });
        }else{
            if(auth.permissions.includes(permissions)) return_value = true;
        }
        
        if(Array.isArray(roles)){
            roles.forEach(element => {
                if(auth.roles.includes(element)) return_value = true;
            });
        }else{
            if(auth.roles.includes(roles)) return_value = true;
        }
    }

    return return_value;
}