const Types = ({ types, toggleActive, toggleHome }) => {
  return (
    <div className="types_container">
      <button onClick={() => toggleHome(true)} className="every_Where_button">
        Home
      </button>
      {types.map((e, i) => (
        <button
          className="every_Where_button"
          key={i}
          onClick={() => {
            toggleActive(e);
          }}
        >
          {e}
        </button>
      ))}
    </div>
  );
};

export default Types;
