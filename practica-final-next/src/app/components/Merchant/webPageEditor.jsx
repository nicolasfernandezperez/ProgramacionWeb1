// WebPageEditor.jsx
import React from "react";
import { useForm } from "react-hook-form";

const WebPageEditor = ({ onSave, onCancel, initialData }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData,
  });
  const reviews = []

  const handleSave = async (data) => {
    // Convierte la imagen a base64 antes de enviarla al servidor
    const photosBase64 = await convertImagesToBase64(data.photos);

    const webPage = {
      id: initialData.id,
      ...data,
      likes: 0,
      dislikes: 0,
      reviews: [],
      photos: photosBase64, // Adjunta la imagen en formato base64 al objeto
    };

    onSave(webPage);
  };


  const convertImagesToBase64 = async (images) => {
    // Maneja la conversión de múltiples imágenes a base64
    const base64Promises = Array.from(images).map(async (image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(image);
      });
    });

    return Promise.all(base64Promises);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} className="max-w-lg mx-auto my-10">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Registrar Información</h2>
  
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="title">
            Título:
          </label>
          <input
            type="text"
            name="title"
            {...register("title")}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="title"
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="description">
            Descripción:
          </label>
          <textarea
            name="description"
            {...register("description")}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="description"
          ></textarea>
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="city">
            Ciudad:
          </label>
          <select
            name="city"
            {...register("city")}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="city"
          >
            <option value="">Selecciona una ciudad</option>
            <option value="Madrid">Madrid</option>
            <option value="Alcalá de Henares">Alcalá de Henares</option>
            <option value="Las Rozas">Las Rozas</option>
            <option value="Alcobendas">Alcobendas</option>
            <option value="Fuenlabrada">Fuenlabrada</option>
            <option value="Getafe">Getafe</option>
            <option value="Leganes">Leganes</option>
          </select>
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="photos">
            Fotos:
          </label>
          <input
            type="file"
            name="photos"
            {...register("photos")}
            multiple
            className="block w-full text-sm text-gray-500 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-sm file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            id="photos"
          />
        </div>
  
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
  
  
  
};

export default WebPageEditor;
