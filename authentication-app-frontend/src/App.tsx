import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes";
import { ToastErrorSvg, ToastSuccessSvg } from "./utils/svg";

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="toast-container-custom"
        toastOptions={{
          success: {
            icon: (
              <div className="toast-container-div">
                <ToastSuccessSvg />
              </div>
            ),
            style: {
              backgroundColor: "#009049",
              color: "#fff",
              fontSize: "16px",
              maxWidth: "90%",
            },
          },
          error: {
            icon: (
              <div className="toast-container-div">
                <ToastErrorSvg />
              </div>
            ),
            style: {
              backgroundColor: "red",
              color: "#fff",
              fontSize: "16px",
              maxWidth: "90%",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
