import "./styles.css";

type Props = {
  text: string;
};
const Button = ({ text }: Props) => {
  return (
    <div className="main-button-container">
      <button className="btn-button">
        <h2>{text}</h2>
      </button>
    </div>
  );
};

export default Button;
