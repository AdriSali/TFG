import React, { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import Images_Grid from './App/Imagenes_Grid/Imagenes_Grid';
import Contact from './App/Contacto/Contacto'

// En esta constante pongo la accesKey de la API la cual nos da acceso a las imágenes
const serverApi = createApi({
    accessKey: '1sQuUhnS4JhwfJRXWginm3JYicJsZ0GVtTx2bjPFyh8'
});

const Search = () => {
    
    // Hook que controla los parámetros de la "Búsqueda avanzada"
    const [search, setSearch] = useState({
        query: '',
        perPage: undefined,
        userOrientation: undefined,
        orderBy: undefined,
    });

    // Hook que controla el array de las imágenes que nos devuelve la respuesta de la API
    const [imgsArray, setImgsArray] = useState([]);

    // Hook que controla si la respuesta de la API contine imágenes o esta vacío
    const[response_IsEmpty, setResponse_IsEmpty] = useState(false);

    // Hook que controla si la "Busqueda avanzada" se muestra o no
    const [advSearch_isShown, setAdvSearch] = useState(false);

    // Hook que hace que el focus esté en el input al iniciar la página, es decir, que el input de búsqueda ya esté seleccionado de forma predeterminada
    useEffect( () => {
        document.getElementById("initial_focus").focus();
    }, []);

    
    // Esta funcion hace la petición a la API a traves del objetocreado anteriormente llamada "serverApi".
    // Y nos devuelve los parámetros que le pedimos. (Le decimos que nos muestre 20 imágenes de forma predeterminada, user_PerPage = 20) 

    function searchImgs(user_Query, user_PerPage = 20, userOrientation = null, user_OrderBy = null) {
       serverApi.search.getPhotos({query: user_Query, perPage: user_PerPage, orientation: userOrientation, orderBy: user_OrderBy})
       .then( imgs => {
           console.log('Api results: ', imgs.response);
           setImgsArray(imgs.response.results);
           if (imgs.response.total !== 0) {
               setResponse_IsEmpty(false);
           } else {
               setResponse_IsEmpty(true);
           }
       })
    }

    // Funcion que hace que el margin-top del buscador se suba hacia arriba despues de buscar algo, es decir, se ponga a 0px
    function sendSearchToTop() {
        document.getElementById("Search__Up-animation").style.marginTop = "0px";
    }


    return (
    <>
        <div id="overlay_Display">
            <Contact/>
        </div>
        <div className="Search__Container" id="Search__Up-animation">
            <input type="search" value={search.query} id="initial_focus" name="buscador_Input" className="Search__Input" placeholder="Pick a pic" 
                onChange={
                    ({target}) => setSearch(actualStateValue => ({...actualStateValue, query: target.value}))
                } onKeyDown={
                    (event) => {
                        if (event.key === 'Enter') {
                            searchImgs(search.query, search.perPage, search.userOrientation, search.orderBy);
                            sendSearchToTop();
                        }
                    }
                }
            />
            <br/>
            <p className="Search__AdvSearch__Toggle" onClick={ () => {setAdvSearch(!advSearch_isShown)}}>
                <small><b>Busqueda Avanzada</b></small>
            </p>
            <br/>

            {/* Solo se muestra si 'advSearch_isShown' es true */}
            { !advSearch_isShown ? null : 
            
                <div className="Search__AdvSearch__Container">

                    <label className="Search__AdvSearch__Label">
                        Numero de resultados (30 max.): <br/>
                        <input type="number" min="1" max="30" name="Search_UserPerPage" className="Search__AdvSearch__Input" placeholder="Número de fotos..." onChange={({target}) => setSearch(actualStateValue => ({...actualStateValue, perPage: target.value}))}/>
                    </label>

                    <br/>

                    <label className="Search__AdvSearch__Label">
                        Orientacion: <br/>

                        <select name="Search_UserOrientation" className="Search__AdvSearch__Input" value={search.userOrientation} onChange={({target}) => {if (target.value === "undefined"){ 
                            setSearch(actualStateValue => ({...actualStateValue, userOrientation: undefined}))
                         } else {
                            setSearch(actualStateValue => ({...actualStateValue, userOrientation: target.value}))
                        }}}>

                            <option value="undefined">Todos los tipos</option>
                            <option value="landscape">Apaisado</option>
                            <option value="portrait">Retrato</option>
                            <option value="squarish">Cuadrado</option>

                        </select>
                    </label>

                    <br/>

                    <label className="Search__AdvSearch__Label">
                        Ordenar por: <br/>
                        <select name="Search_UserOrderBy" className="Search__AdvSearch__Input" value={search.orderBy} onChange={({target}) => setSearch(actualStateValue => ({...actualStateValue, orderBy: target.value}))}>
                            <option value="relevant">Más relevantes</option>
                            <option value="latest">Más recientes</option>
                        </select>
                    </label>


                </div>
            }

            <div className="Search__ButtonWrapper">
                <button className="Search__Button" disabled={search.query === '' ? true : false}
                    onClick={
                        () => {
                                console.log('User search: ', search);
                                searchImgs(search.query, search.perPage, search.userOrientation, search.orderBy);
                                sendSearchToTop();
                            }
                    }>
                <b>Buscar</b></button>
    
                <button className="Contact__Butt"
                    onClick={
                        () => {
                            let actualDisplay = window.getComputedStyle(document.getElementById("overlay_Display"));
    
                            if (actualDisplay.getPropertyValue("display") === "none") {
                                document.getElementById("overlay_Display").style.display = "block";
                            } else {    
                                document.getElementById("overlay_Display").style.display = "none";
                            }

                            document.getElementById("contact_focus").focus();
                        }
                    }><b>Contáctanos</b></button>
            </div>
        </div>

        <Images_Grid imgsArray={imgsArray} response_IsEmpty={response_IsEmpty}/>
    </>
    )
};

export default Search;