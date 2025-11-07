import "./Button.css";

function Button({ title, onClick, type }) {
  return (
    <button onClick={onClick} type={type}>
      {title}
    </button>
  );
}

export default Button;
