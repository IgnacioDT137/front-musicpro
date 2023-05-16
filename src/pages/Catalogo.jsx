const Catalogo = () => {
    return (
        <>
        <h1 className="text-center mt-5">Bienvenido a MusicPro!</h1>
        <h3 className="text-center mt-2">Aquí podras encontrar bastante de lo que un rockero necesita! Revisa nuestros productos:</h3>
        <div className="catalogo" style={{display: "flex", justifyContent: "space-between", padding: "2%", margin: "2%"}}>
            <div className="card" style={{width: "18rem", margin: "1%"}}>
                <img src="https://cdnx.jumpseller.com/guitarstore/image/4615779/resize/450/450?1649686688" className="card-img-top" alt="..." />
                <div className="card-body">
                <a href="/tienda/1"><h5 className="card-title" style={{textAlign: "center"}}>Guitarras</h5></a>
                </div>
            </div>
    
            <div className="card" style={{width: "18rem", margin: "1%"}}>
                <img src="https://audiomusicacl.vtexassets.com/arquivos/ids/170506/set-de-bateria-tama-imperialstar-ie58h6w-color-candy-apple-mist-cpm-212128-1.jpg?v=1768749930" className="card-img-top" alt="..." />
                <div className="card-body">
                <a href="/tienda/2"><h5 className="card-title" style={{textAlign: "center"}}>Baterías</h5></a>
                </div>
            </div>

            <div className="card" style={{width: "18rem", margin: "1%"}}>
                <img src="https://armonicos.cl/2861-home_default/harley-benton-bajo-jb-20-ca-deluxe-series.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                <a href="/tienda/3"><h5 className="card-title" style={{textAlign: "center"}}>Bajos</h5></a>
                </div>
            </div>
        
            <div className="card" style={{width: "18rem", margin: "1%"}}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk4F21CZ9TSKEpIbHsl98QIyPqg06BT88oL2lNZ3ZZtjJ2Xwh8pckFEUeQYh6zyjCAhYA&usqp=CAU" className="card-img-top" alt="..." />
                <div className="card-body">
                <a href="/tienda/4"><h5 className="card-title" style={{textAlign: "center"}}>Amplificadores</h5></a>
                </div>
            </div>

    
            <div className="card" style={{"width": "18rem", "margin": "1%"}}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8qJPtuVHXlxzKQihzo4InOkERkliyPpYEw&usqp=CAU" className="card-img-top" alt="..." width="200" />
                <div className="card-body">
                <a href="/tienda/5"><h5 className="card-title" style={{textAlign: "center"}}>Accesorios</h5></a>
                </div>
            </div>
    
            <div className="card" style={{"width": "18rem", "margin": "1%"}}>
                <img src="https://danivoiceovers.com/wp-content/uploads/2019/09/accesorios-estudio-de-grabacio%CC%81n-300x300.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                <a href="/tienda/6"><h5 className="card-title" style={{textAlign: "center"}}>Estudio</h5></a>
                </div>
            </div>
  
        </div>
        </>
    );
}

export default Catalogo