// WebPageViewer.jsx
import React, { useState } from "react";
import Cookies from "js-cookie";

const WebPageViewer = ({ webPageData }) => {
  const { commerceName, title, description, city, photos, addres, likes, dislikes, reviews } = webPageData;
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const userCookie = Cookies.get('user');
  const parsedUserData = userCookie ? JSON.parse(userCookie) : null;
  console.log('Usuario loged',parsedUserData)

  const handleLike = async () => {
    if (!liked && parsedUserData.userType === 'user') {
      try {
        const requestBody = { likes: +1 };
        //const requestID = webPageData.id
        console.log('Request Body:', requestBody);
  
        const response = await fetch(`http://localhost:3000/api/webPage/${webPageData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        if (response.ok) {
          // Verificar si la respuesta es un JSON válido antes de intentar analizarla
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            console.log('Response:', result); // Agrega este log para verificar la respuesta del servidor
            setLiked(true);
            setDisliked(false);
            console.log('+1');
          } else {
            console.error('La respuesta no es un JSON válido:', response);
          }
        } else {
          console.error('Error al actualizar los likes');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }finally{
        window.location.reload()
      }
    }else{
      alert("Inicia sesion para poder participar")
    }
  };
  
  const handleDislike = async () => {
    if (!disliked && parsedUserData.userType === 'user') {
      try {
        const requestBody = { dislikes: +1 };
        //const requestID = webPageData.id

        console.log('Request Body:', requestBody);
  
        const response = await fetch(`http://localhost:3000/api/dislike/${webPageData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        if (response.ok) {
          // Verificar si la respuesta es un JSON válido antes de intentar analizarla
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            console.log('Response:', result); // Agrega este log para verificar la respuesta del servidor
            setDisliked(true);
            setLiked(false);
            console.log('+1');
          } else {
            console.error('La respuesta no es un JSON válido:', response);
          }
        } else {
          console.error('Error al actualizar los dislikes');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }finally{
        window.location.reload()
      }
    }else{
      alert("Inicia sesion para poder participar")
    }
  };

  const handleReview = async () => {
    if (parsedUserData.userType === 'user') {
        const prompText = window.prompt('Introduzca su reseña: ');

        try {
            const requestBody = { reviews: prompText };
            const requestID = webPageData.id;

            console.log('Request Body:', requestBody);

            const response = await fetch(`http://localhost:3000/api/review/${webPageData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody), // Solo pasamos el cuerpo aquí
            });

            if (response.ok) {
                // Verificar si la respuesta es un JSON válido antes de intentar analizarla
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const result = await response.json();
                    console.log('Response:', result); // Agrega este log para verificar la respuesta del servidor
                    // Aquí puedes realizar acciones adicionales según sea necesario
                } else {
                    console.error('La respuesta no es un JSON válido:', response);
                }
            } else {
                console.error('Error al actualizar las reseñas');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        } finally {
            window.location.reload()
        }
    } else {
        alert("Inicia sesión para poder participar");
    }
};

return (
  <div className="min-h-screen bg-gray-100 text-gray-900 p-10">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-8">{commerceName}</h1>

      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-4xl font-semibold mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
        <p className="mb-4">Ciudad: {city}</p>
        <p className="mb-4">Direccion: {addres}</p>

        <hr className="my-6" />

        {photos && photos.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={`data:image/png;base64, ${photo}`} // Asegúrate de tener la URL o cadena base64 correcta
                alt={`Photo ${index + 1}`}
                className="object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        <div className="flex justify-center space-x-8 my-6">
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">{likes} 👍</div>
            <button
              onClick={handleLike}
              className={`mt-2 text-green-500 focus:outline-none ${liked ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Me gusta
            </button>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-red-600">{dislikes} 👎</div>
            <button
              onClick={handleDislike}
              className={`mt-2 text-red-500 focus:outline-none ${disliked ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              No me gusta
            </button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleReview}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center justify-center"
        >
          <span className="text-2xl">+</span> Agregar Reseña
        </button>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mt-8">
        <h3 className="text-3xl font-semibold mb-4">Reseñas</h3>
        {reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded-lg">
                {review}
              </div>
            ))}
          </div>
        ) : (
          <p>No hay reseñas aún.</p>
        )}
      </div>
    </div>
  </div>
);

};

export default WebPageViewer;
