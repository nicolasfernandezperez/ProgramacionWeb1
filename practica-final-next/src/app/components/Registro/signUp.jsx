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
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="w-full max-w-lg p-10 bg-light-blue-200 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Registro de Usuario
          <input
            type="checkbox"
            id="adminMode"
            className="text-blue-600 bg-blue-300 hover:bg-blue-700 ml-4 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg "
            {...register('adminMode')}
          />
          <label htmlFor="adminMode" className="ml-2 text-blue-500 text-sm font-medium">
            Modo Admin
          </label>
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue-700">E-mail</label>
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
                className="bg-blue-50 border border-blue-300 text-blue-700 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
              {errors.email && <span className="text-blue-500 text-sm">{errors.email.message}</span>}
            </div>

            <div>
              <label htmlFor="age" className="block mb-2 text-sm font-medium text-blue-700">Edad</label>
              <input
                type="number"
                {...register('age', {
                  required: true,
                  min: 0,
                  max: 150,
                })}
                id="age"
                className="bg-blue-50 border border-blue-300 text-blue-700 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                required
              />
              {errors.age && <span className="text-blue-500 text-sm">Edad no válida</span>}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-blue-700">Contraseña</label>
              <input
                type="password"
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres',
                  },
                })}
                id="password"
                placeholder="••••••••"
                className="bg-blue-50 border border-blue-300 text-blue-700 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                required
              />
              {errors.password && <span className="text-blue-500 text-sm">{errors.password.message}</span>}
            </div>

            <div>
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-blue-700">Ciudad</label>
              <select
                id="city"
                {...register('city', {
                  required: 'This field is required',
                })}
                className="bg-blue-50 border border-blue-300 text-blue-700 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                required
              >
                <option value="" disabled defaultValue>
                  Selecciona una ciudad
                </option>
                <option value="Madrid">Madrid</option>
                <option value="Alcalá de Henares">Alcalá de Henares</option>
                <option value="Móstoles">Móstoles</option>
                <option value="Fuenlabrada">Fuenlabrada</option>
                <option value="Leganés">Leganés</option>
                <option value="Alcorcón">Alcorcón</option>
                <option value="Getafe">Getafe</option>
                <option value="Torrejón de Ardoz">Torrejón de Ardoz</option>
                <option value="Parla">Parla</option>
                <option value="Alcobendas">Alcobendas</option>
                <option value="Las Rozas de Madrid">Las Rozas de Madrid</option>
                <option value="San Sebastián de los Reyes">San Sebastián de los Reyes</option>
                <option value="Pozuelo de Alarcón">Pozuelo de Alarcón</option>
                <option value="Rivas-Vaciamadrid">Rivas-Vaciamadrid</option>
                <option value="Majadahonda">Majadahonda</option>
                <option value="Valdemoro">Valdemoro</option>
                <option value="Collado Villalba">Collado Villalba</option>
                <option value="Aranjuez">Aranjuez</option>
                <option value="Arganda del Rey">Arganda del Rey</option>
                <option value="Boadilla del Monte">Boadilla del Monte</option>
                <option value="Pinto">Pinto</option>
                <option value="Colmenar Viejo">Colmenar Viejo</option>
                <option value="Tres Cantos">Tres Cantos</option>
                <option value="San Fernando de Henares">San Fernando de Henares</option>
                <option value="Galapagar">Galapagar</option>
                <option value="Villaviciosa de Odón">Villaviciosa de Odón</option>
              </select>
              {errors.city && <span className="text-blue-500 text-sm">{errors.city.message}</span>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Registrarse
          </button>

          <p className="text-sm font-light text-blue-700">
            ¿Ya tienes una cuenta? <Link href="/" className="font-medium text-blue-800 hover:underline">Iniciar sesion</Link>
          </p>
        </form>
      </div>
    </div>
  );





};

export default SignUp
