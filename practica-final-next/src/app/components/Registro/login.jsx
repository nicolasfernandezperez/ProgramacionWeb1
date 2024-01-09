"use client"
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';


const getUser = async (userEmail, userPass, router) => {

  try {
    const res = await fetch("http://localhost:3000/api/users");
    const data = await res.json();
    console.log(data)

    // Buscar el usuario por el correo electrónico
    const user = data.users.find((u) => u.email === userEmail);

    if (user) {
      console.log("Usuario encontrado:");
      const pass = data.users.find((u) => u.password === userPass);
      if (pass) {
        toast.loading("Redirigiendo a la pagina...", { duration: 1000 })
        const userType = user.userType;
        console.log("Usuario: ", user)
        console.log("Tipo de usuario:", userType);

        switch (userType) {
          case 'user':
            Cookies.set('user', JSON.stringify(user), { path: '/' });
            router.push("/user")
            break;
          case 'admin':
            Cookies.set('user', JSON.stringify(user), { path: '/' });
            router.push("/admin")
            break;
          case 'merchant':
            Cookies.set('user', JSON.stringify(user), { path: '/' });
            if (Cookies.get('user')) {
              console.log(Cookies.get('user'))
            } else {
              console.error('Error al establecer la cookie');
            }
            router.push("/merchant");
            break;
        }
      } else {
        toast.error("Contraseña incorrecta")
      }
      return user;
    } else {
      toast.error("Usuario incorrecto")
      console.log("Usuario no encontrado");

      return null;
    }
  } catch (error) {
   
    return null;
  }
};




function Login() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {

    console.log('Datos del formulario:', data);
    getUser(data.email, data.password, router)
  }

  const privateMode = () => {
    const userTemp ={
      userType: 'incognito'
    }
    Cookies.set('user', JSON.stringify(userTemp), { path: '/' });
    console.error("Error al obtener usuarios:");
    router.push("/user")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-gray-200 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Inicia Sesión</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              {...register('email', {
                required: 'Este campo es requerido',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Ingresa un correo electrónico válido',
                },
              })}
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-primary-500"
              placeholder="name@company.com"
              required
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              {...register('password', {
                required: 'Este campo es requerido',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              })}
              id="password"
              placeholder="••••••••"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-primary-500"
              required
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-primary-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Recordarme</label>
            </div>
            <p className="text-sm font-light text-blue-700">
              No tienes cuenta? <Link href="/register" className="font-medium text-blue-700 hover:underline">Regístrarse</Link>
            </p>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-green-400 hover:bg-primary-700 text-white rounded-md focus:outline-none focus:ring focus:border-primary-500"
          >
            Iniciar Sesión
          </button>
        </form>
        <button
          onClick={privateMode}
          className="w-full mt-4 p-2 bg-purple-500 hover:bg-purple-700 text-white rounded-md focus:outline-none focus:ring focus:border-purple-500"
        >
          Modo Incógnito
        </button>
      </div>
    </div>
  );
  
  
};

export default Login
