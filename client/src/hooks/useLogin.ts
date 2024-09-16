import { useState } from "react";

interface LoginData{
    emailOrUsername: string;
    password: string;
}

 const useLogin = () => {
    const [loginData, setLoginData] = useState <LoginData>({"emailOrUsername":'', password:''});
    const [error, setError] = useState <string | null>(null)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginData((prevData)=>({
            ...prevData,
            [name]:value,
        }));
    };

    //peticion
    const handleSubmit = async (e:React.FormEvent)=> {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/login',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(loginData)
            });
            const result = await response.json();

            if(result.status == 200){
                localStorage.setItem("token",result.token)
                window.location.href = "/pages/home";
            }else{
                setError(result.message || 'error al iniciar sesión. Intente de nuevo!.')
            }
  
        } catch (error) {
            setError('Error al iniciar sesión. Intente mas tarde!.')            
        }
    };
    return {loginData, error,handleChange,handleSubmit};
}

export default useLogin;
