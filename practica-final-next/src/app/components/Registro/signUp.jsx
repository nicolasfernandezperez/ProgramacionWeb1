"use client"
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const saveUser = async (user) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      toast.error("Error al añadir un nuevo usuario")
      console.error('Error en la función POST. Código de estado:', response.status);
      return;  // Salir de la función si hay un error en la respuesta
    } else {

      console.log('Usuario añadido con exito');
      toast.success("Usuario añádido con éxito")

    }

  } catch (error) {
    console.error('Error en la función POST:', error);
    toast.error("Error en el servidor")
  }
}

const checkExistingUser = async (user) => {

  try {

    const res = await fetch("http://localhost:3000/api/users");
    const data = await res.json();

    const userlog = data.users.find((u) => u.email === user.email);

    if (userlog) {
      toast.error("Usuario ya existente")
    } else {
      console.log("comprobando si hay un comercio asociado")
      checkExistingUserCommerce(user);
    }
  } catch {
    //esto se ejecuta en caso de no haya ningun usuario en el txt
    console.log("comprobando si hay un comercio asociado catch")
    checkExistingUserCommerce(user);
  }

}

const checkExistingUserCommerce = async (user) => {
  try {
    const res = await fetch("http://localhost:3000/api/commerce");
    const data = await res.json();

    const userMerchant = data.commerce.find((u) => u.email === user.email);
    if (userMerchant) {
      console.log(userMerchant);
      toast.success("Usuario comerciante");

      const newUserMerchant = {
        ...user,
        userType: 'merchant'
      };
      console.log(newUserMerchant);
      saveUser(newUserMerchant);

    } else {
      saveUser(user)
      
    }
  } catch (error) {
    saveUser(user)
  }

}

function SignUp() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const adminMode = watch('adminMode', false);

  const onSubmit = (data) => {
    const userType = adminMode ? 'admin' : 'user';
    console.log(data)

    const newUser = {
      id: uuidv4(),
      userType: userType,
      ...data
    }
    console.log(newUser)
    checkExistingUser(newUser)

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Registro de Usuario
          <input
            type="checkbox"
            id="adminMode"
            className="text-black bg-gray-300 hover:bg-red-700 ml-4 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg "
            {...register('adminMode')}
          />
          <label htmlFor="adminMode" className="ml-2 text-gray-500 text-sm font-medium">
            Modo Admin
          </label>
        </h1>
  
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-700">Ciudad</label>
              <select
                id="city"
                {...register('city', {
                  required: 'This field is required',
                })}
                className="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="" disabled defaultValue>
                  Selecciona una ciudad
                </option>
                <option value="Madrid">Madrid</option>
                <option value="Alcalá de Henares">Alcalá de Henares</option>
                <option value="Las Rozas">Las Rozas</option>
                <option value="Alcobendas">Alcobendas</option>
                <option value="Fuenlabrada">Fuenlabrada</option>
                <option value="Getafe">Getafe</option>
                <option value="Leganes">Leganes</option>
              </select>
              {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
            </div>
  
            <div>
              <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-700">Fecha de nacimiento</label>
              <input
                type="date"
                {...register('date', {
                  required: true,
                  min: '1930-01-01',
                  max: '2015-12-31',
                })}
                id="birthdate"
                className="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
              {errors.date && <span className="text-red-500 text-sm">Fecha no válida</span>}
            </div>
  
            <div>
              <label htmlFor="interests" className="block mb-2 text-sm font-medium text-gray-700">Interests</label>
              <select
                id="interests"
                {...register('interests', {
                  required: 'This field is required',
                })}
                className="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="" disabled defaultValue>
                  Selecciona tus intereses
                </option>
                <option value="hamburgers">Hamburguesas</option>
                <option value="pizza">Pizza</option>
                <option value="pasta">Pasta</option>
              </select>
              {errors.interests && <span className="text-red-500 text-sm">{errors.interests.message}</span>}
            </div>
  
            <div>
              <label htmlFor="offers" className="flex items-center text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  id="offers"
                  {...register('offers')}
                  className="text-black bg-gray-300 hover:bg-red-700 mr-2 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg"
                />
                Permito recibir ofertas
              </label>
            </div>
          </div>
  
          <hr className="my-6 border-1 border-gray-500" />
  
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Dirección de correo no válida',
                },
              })}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
  
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="text"
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              })}
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
  
          <button
            type="submit"
            className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Registrarse
          </button>
  
          <p className="text-sm font-light text-gray-700">
            ¿Ya tienes una cuenta? <Link href="/" className="font-medium text-blue-700 hover:underline">Iniciar sesion</Link>
          </p>
        </form>
      </div>
    </div>
  );
  





};

export default SignUp
