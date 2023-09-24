import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from "@mui/material";
  
  import React from "react";
//   import { dressPage1 } from "../../../Data/dress/page1";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useState } from "react";
  import { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { deleteProduct, findProducts } from "../../Redux/Customers/Product/Action";
  
  const ProductsTableView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { customersProduct } = useSelector((store) => store);
    const [filterValue, setFilterValue] = useState({
      availability: "",
      category: "",
      sort: "",
    });
  console.log("product" ,customersProduct)
    // query 
    const searchParams = new URLSearchParams(location.search);
    const availability = searchParams.get("availability");
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const page = searchParams.get("page");
  
  
    const handlePaginationChange = (event, value) => {
      searchParams.set("page", value-1);
      const query = searchParams.toString();
      navigate({ search: `?${query}` });
    };
  
    useEffect(() => {
      // setFilterValue({ availability, category, sort });
      const data = {
        category:"",
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 10000,
        minDiscount: 0,
        sort: "price_low",
        pageNumber:0,
        pageSize: 10,
        stock: "",
      };
      dispatch(findProducts(data));
    }, [availability, category, sort,page,customersProduct.deleteProduct]);
  
    const handleFilterChange = (e, sectionId) => {
      console.log(e.target.value, sectionId);
      setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
      searchParams.set(sectionId, e.target.value);
      const query = searchParams.toString();
      navigate({ search: `?${query}` });
    };
  
    const handleDeleteProduct=(productId)=>{
      console.log("delete product ",productId)
      dispatch(deleteProduct(productId))
    }
  
    return (
      <Box width={"100%"}>
        <Card className="mt-2">
          <CardHeader
            title="All Products"
            sx={{
              pt: 2,
              alignItems: "center",
              "& .MuiCardHeader-action": { mt: 0.6 },
            }}
          />
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Category</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customersProduct?.products?.content?.map((item) => (
                  <TableRow
                    hover
                    key={item.name}
                    sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                    
                  >
                    <TableCell>
                      <Avatar alt={item.titel} src={item.imageUrl} />
                    </TableCell>
  
                    <TableCell
                      sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.875rem !important",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="caption">{item.brand}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.category.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.discountedPrice}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <Card className="mt-2 border">
          {/* <Pagination
            className="py-5 border w-auto"
            size="large"
            count={10}
            color="primary"
            onChange={handlePaginationChange}
          /> */}
  
          <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
            <Pagination
              count={customersProduct.products?.totalPages}
              color="primary"
              className=""
              onChange={handlePaginationChange}
              // value={page}
            />
          </div>
        </Card>
      </Box>
    );
  };
  
  export default ProductsTableView;
  