//retornar un producto filtrado
// necesita un objeto y su id
// tomar el primer producto de mi lista de productos

import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";

export function useFilterProduct(id){
const {products} = useContext(ProductContext);
const [filteredProduct, setFilteredProduct] = useState(products[0])
  useEffect(()=>{
    setFilteredProduct(products.find((element)=> element.id == id))
  },[products, id])

  
}