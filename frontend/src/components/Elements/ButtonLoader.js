import Spinner from "react-bootstrap/Spinner";

function ButtonLoader() {
  return (
    <div className="button_loader">
      <Spinner animation="border" role="status"></Spinner>
    </div>
  );
}

export default ButtonLoader;
