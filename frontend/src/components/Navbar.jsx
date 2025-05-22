import {
  Button,
  Container,
  Stack,
  Typography,
  IconButton,
  useTheme,
  InputBase,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High', sortBy: 'price', sortOrder: 'asc' },
  { value: 'price-desc', label: 'Price: High to Low', sortBy: 'price', sortOrder: 'desc' },
  { value: 'name-asc', label: 'Name: A-Z', sortBy: 'name', sortOrder: 'asc' },
  { value: 'name-desc', label: 'Name: Z-A', sortBy: 'name', sortOrder: 'desc' },
  { value: 'date-desc', label: 'Date: Newest First', sortBy: 'createdAt', sortOrder: 'desc' },
  { value: 'date-asc', label: 'Date: Oldest First', sortBy: 'createdAt', sortOrder: 'asc' },
];

const getSortValue = (sortBy, sortOrder) => {
  if (sortBy === 'price' && sortOrder === 'asc') return 'price-asc';
  if (sortBy === 'price' && sortOrder === 'desc') return 'price-desc';
  if (sortBy === 'name' && sortOrder === 'asc') return 'name-asc';
  if (sortBy === 'name' && sortOrder === 'desc') return 'name-desc';
  if (sortBy === 'createdAt' && sortOrder === 'desc') return 'date-desc';
  if (sortBy === 'createdAt' && sortOrder === 'asc') return 'date-asc';
  return 'price-asc';
};

const Navbar = ({ mode, toggleTheme, search, setSearch, sortBy, setSortBy, sortOrder, setSortOrder }) => {
  const theme = useTheme();
  const sortValue = getSortValue(sortBy, sortOrder);

  const handleSortChange = (e) => {
    const selected = sortOptions.find(opt => opt.value === e.target.value);
    if (selected) {
      setSortBy(selected.sortBy);
      setSortOrder(selected.sortOrder);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ px: 2 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        height={64}
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography
          variant="h3"
          component={Link}
          to="/"
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'center',
            textDecoration: 'none',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          Product Store 🛒
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: 2,
              boxShadow: 0,
              bgcolor: theme.palette.background.paper,
              px: 1.5,
              py: 0.5,
              minWidth: { xs: 120, sm: 200, md: 260 },
              maxWidth: 320,
            }}
            onSubmit={e => e.preventDefault()}
          >
            <InputBase
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{ ml: 1, flex: 1, fontSize: '1.1rem' }}
              inputProps={{ 'aria-label': 'search products' }}
            />
          </Paper>
          <FormControl size="small" sx={{ minWidth: 180, bgcolor: theme.palette.background.paper, borderRadius: 2 }}>
            <InputLabel id="sort-combo-label">Sort</InputLabel>
            <Select
              labelId="sort-combo-label"
              value={sortValue}
              label="Sort"
              onChange={handleSortChange}
            >
              {sortOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton
            component={Link}
            to="/create"
            color="primary"
            sx={{ fontSize: 32, p: 1.5 }}
          >
            <CiSquarePlus size={28} />
          </IconButton>
          <IconButton color="inherit" onClick={toggleTheme} sx={{ fontSize: 32, p: 1.5 }}>
            {mode === 'dark' ? <Brightness7 sx={{ fontSize: 28 }} /> : <Brightness4 sx={{ fontSize: 28 }} />}
          </IconButton>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Navbar;
