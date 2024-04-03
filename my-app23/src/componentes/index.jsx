import React from 'react';

function ReservationForm() {
  return (
    <div className="reservation-form">
      <div className="image-upload">
        <button className="upload-button">+</button>
      </div>
      
      <div className="form-content">
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input type="text" id="title" placeholder="Descripción..." />
        </div>
        
        <div className="form-group">
          <label>Intrumentos</label>
          <div className="checkbox-group">
            <label htmlFor="trumpet"><input type="checkbox" id="trumpet" /> trompeta</label>
            <label htmlFor="flute"><input type="checkbox" id="flute" /> flauta</label>
            <label htmlFor="violin"><input type="checkbox" id="violin" /> violin</label>
            <label htmlFor="guitar"><input type="checkbox" id="guitar" /> guitarra</label>
          </div>
        </div>
        
        <div className="form-group radio-group">
          <label htmlFor="public"><input type="radio" name="visibility" id="public" /> Pública</label>
          <label htmlFor="private"><input type="radio" name="visibility" id="private" /> Privada</label>
        </div>
        
        <div className="form-group datetime-group">
          <label htmlFor="date">Fecha</label>
          <input type="date" id="date" />
          
          <label htmlFor="start-time">Hora Inicio</label>
          <input type="time" id="start-time" defaultValue="20:00" />
          
          <label htmlFor="end-time">Final</label>
          <input type="time" id="end-time" defaultValue="21:30" />
        </div>
        
        <button className="reserve-button">Reservar espacio</button>
      </div>
    </div>
  );
}

export default ReservationForm;
