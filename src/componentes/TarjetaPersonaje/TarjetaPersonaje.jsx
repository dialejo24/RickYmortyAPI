import './TarjetaPersonaje.css';

const TarjetaPersonaje = ({ personaje }) => {
  if (!personaje) return null;

  const { name, status, species, gender, image } = personaje;

  return (
    <div className="tarjeta-personaje">
      <img src={image} alt={name} className="tarjeta-imagen" />
      <div className="tarjeta-info">
        <h2 className="tarjeta-nombre">{name}</h2>
        <p><strong>Estado:</strong> {status}</p>
        <p><strong>Especie:</strong> {species}</p>
        <p><strong>Género:</strong> {gender}</p>
      </div>
    </div>
  );
};

export default TarjetaPersonaje;
