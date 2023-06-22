import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [carrito, setCarrito] = useState([]);

    var total = 0;
    var cant_total = 0;

    carrito.map(i => {
      total += i.cantidad * i.precio
    })

    carrito.map(i => {
      cant_total += i.cantidad
    })

    // Recuperar los datos del carrito desde localStorage al cargar la página
    useEffect(() => {
      const carritoLocal = localStorage.getItem("carrito");
      if (carritoLocal) {
        setCarrito(JSON.parse(carritoLocal));
      }
    }, []);

    // Guardar los datos del carrito en localStorage cada vez que cambian
    useEffect(() => {
      window.addEventListener('beforeunload', () => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
      });
    
      return () => {
        window.removeEventListener('beforeunload', () => {
          localStorage.setItem('carrito', JSON.stringify(carrito));
        });
      };
    }, [carrito]);
    
    const addItem = (producto) => {
        const itemIndex = carrito.findIndex((item) => item.codigo === producto.codigo);
        if (itemIndex !== -1) {
          // Si el producto ya está en el carrito, aumentamos su cantidad en 1
          const newCarrito = [...carrito];
          newCarrito[itemIndex].cantidad += 1;
          setCarrito(newCarrito);
        } else {
          // Si el producto no está en el carrito, lo añadimos con una cantidad de 1
          const newItem = {
            codigo: producto.codigo,
            nombre: producto.nombre,
            cantidad: 1,
            precio: producto.precio,
            stock: producto.stock
          }
          setCarrito([...carrito, newItem]);
        }   
    }

    const restarItem = (producto) => {
      const itemIndex = carrito.findIndex((item) => item.codigo === producto.codigo);
      if (itemIndex !== -1) {
        // Si el producto ya está en el carrito, aumentamos su cantidad en 1
        const newCarrito = [...carrito];
        newCarrito[itemIndex].cantidad -= 1;
        setCarrito(newCarrito);
      }
    }

    const verificarStock = (producto) => {
      const item = carrito.find(item => item?.codigo == producto.codigo)
      return producto.stock == item?.cantidad
    }

    const getItem = (producto) => {
      const item = carrito.find(item => item?.codigo == producto.codigo)
      return item
    }

    const deleteItem = (producto) => {
        const newCarrito = carrito.filter(item => item.codigo !== producto.codigo);
        setCarrito(newCarrito);
    }

    return (
        <GlobalContext.Provider value={{carrito, setCarrito, addItem, deleteItem, total, restarItem, verificarStock, cant_total, getItem }}>
            {children}
        </GlobalContext.Provider>
    )
}