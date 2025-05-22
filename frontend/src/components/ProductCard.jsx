import {
  Button,
  Typography,
  Stack,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "@/store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [open, setOpen] = useState(false);
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    window.dispatchEvent(new CustomEvent('show-snackbar', {
      detail: {
        message,
        severity: success ? 'success' : 'error'
      }
    }));
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    window.dispatchEvent(new CustomEvent('show-snackbar', {
      detail: {
        message: success ? "Product updated successfully" : message,
        severity: success ? 'success' : 'error'
      }
    }));
    setOpen(false);
  };

  return (
    <Card
      sx={{
        width: 320,
        height: 420,
        bgcolor: '#232326',
        borderRadius: 3,
        boxShadow: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 0,
      }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 240,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            maxHeight: 220,
            maxWidth: '90%',
            objectFit: 'contain',
            m: 'auto',
          }}
        />
      </Box>
      <CardContent sx={{ color: '#fff', flexGrow: 1, pb: 1 }}>
        <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500, mb: 1 }} noWrap>
          {product.name}
        </Typography>
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Stack direction="row" spacing={1}>
          <IconButton
            sx={{ bgcolor: '#19c6c6', color: '#fff', borderRadius: 2, '&:hover': { bgcolor: '#15a3a3' } }}
            onClick={() => setOpen(true)}
          >
            <FaEdit />
          </IconButton>
          <IconButton
            sx={{ bgcolor: '#f44336', color: '#fff', borderRadius: 2, '&:hover': { bgcolor: '#c62828' } }}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdDelete />
          </IconButton>
        </Stack>
      </CardActions>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  name: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  price: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={updatedProduct.image}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  image: e.target.value,
                })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProductCard;
