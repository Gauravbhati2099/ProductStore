import { Box, ThemeProvider, createTheme, CssBaseline, Snackbar, Alert } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import { useState, useEffect, useMemo } from "react";

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#2196f3' },
          secondary: { main: '#f50057' },
          background: { default: '#eaf6ff', paper: '#ffffff' },
          text: { primary: '#232326', secondary: '#555' },
        }
      : {
          primary: { main: '#90caf9' },
          secondary: { main: '#f48fb1' },
          background: { default: '#23272f', paper: '#2c313a' },
          text: { primary: '#fff', secondary: '#bdbdbd' },
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  const [mode, setMode] = useState('light');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const handleSnackbar = (event) => {
      const { message, severity } = event.detail;
      setSnackbar({
        open: true,
        message,
        severity,
      });
    };
    window.addEventListener('show-snackbar', handleSnackbar);
    return () => window.removeEventListener('show-snackbar', handleSnackbar);
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const theme = useMemo(() => getTheme(mode), [mode]);
  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box minHeight="100vh" bgcolor="background.default">
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
        <Navbar
          mode={mode}
          toggleTheme={toggleTheme}
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <Routes>
          <Route path="/" element={<HomePage search={search} sortBy={sortBy} sortOrder={sortOrder} />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
