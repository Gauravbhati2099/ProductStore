import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/store/product";
import { Container, Grid, Typography, Stack, useTheme } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = ({ search }) => {
  const { fetchProducts, products } = useProductStore();
  const theme = useTheme();

  useEffect(() => {
    fetchProducts(search);
  }, [fetchProducts, search]);

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Current Products 🚀
        </Typography>
        <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} justifyContent="center" alignItems="center">
          {products.map((product) => (
            <Grid span={1} key={product._id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        {products.length === 0 && (
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            color="text.secondary"
          >
            No products found 😢{" "}
            <Link to="/create" style={{ textDecoration: 'none' }}>
              <Typography
                component="span"
                color="primary"
                sx={{
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Create a product
              </Typography>
            </Link>
          </Typography>
        )}
      </Stack>
    </Container>
  );
};

export default HomePage;
