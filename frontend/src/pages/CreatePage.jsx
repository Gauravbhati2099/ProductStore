import { useProductStore } from "@/store/product";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Stack,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      // Show error message
      window.dispatchEvent(new CustomEvent('show-snackbar', {
        detail: {
          message,
          severity: 'error'
        }
      }));
    } else {
      // Show success message
      window.dispatchEvent(new CustomEvent('show-snackbar', {
        detail: {
          message,
          severity: 'success'
        }
      }));
      navigate("/");
    }
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxWidth="sm">
      <Stack spacing={4} alignItems="center">
        <Typography variant="h2" component="h1" textAlign="center" gutterBottom>
          Create New Product
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
              fullWidth
              size="large"
            >
              Add Product
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default CreatePage;
