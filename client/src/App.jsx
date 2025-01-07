import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};
export default App
