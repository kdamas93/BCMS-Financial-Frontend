import AppRoutes from "./routes/AppRoutes";
import MaintenancePage from "./pages/Maintenance";

function App() {

  if (
    import.meta.env.VITE_MAINTENANCE_MODE === "true"
  ) {

    return <MaintenancePage />;

  }

  return <AppRoutes />;

}

export default App;