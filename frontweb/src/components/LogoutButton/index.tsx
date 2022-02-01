import "./styles.css";

type Props = {
  text: string;
};

const LogoutButton = ({ text }: Props) => {
  return (
    <div className="logout-button-styling">
      <h3>{text}</h3>
    </div>
  );
};

export default LogoutButton;
