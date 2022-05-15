import React from 'react';
import Photo_card from '../Imagen/imagen';

const Images_Grid = ({imgsArray, response_IsEmpty}) => {

    const images = imgsArray;

    const imagesUnit = imgsArray.length / 3;

    return (<>
        
        {/* Aqui lo que hago es un operador ternario donde si lo que se busca no encuentra nada(ya que en la API no encuentra nada relacionado
         con lo que se ha buscado) pues le aparece este mensaje*/}
        { response_IsEmpty ? 
            <div className="Images_Grid__Text">
                ¡Ups! Parece que no se ha encontrado ninguna foto relacionada con el término introducido. ¡Prueba a poner otra cosa!
                <br/><small>(Quizás el termino en inglés obtenga más resultados)</small>
            </div> 
        : 
            images.length == 0 ? 
                <div className="Images_Grid__Text">
                    ¡Introduce un término y se mostrarán imágenes relacionadas!
                </div>
            : null}

        {/* Aquí es donde lo divido en tres columnas*/}
        <div className="Images_Grid__Container">
            <div>
                {images.slice(0, imagesUnit).map( img => 
                        <Photo_card img_data={img} key={img.id}/>
                )}
            </div>

            <div>
                {images.slice(imagesUnit, imagesUnit * 2).map( img =>
                        <Photo_card img_data={img} key={img.id}/>
                )}
            </div>

            <div>
                {images.slice(imagesUnit * 2, imagesUnit * 3).map( img =>
                        <Photo_card img_data={img} key={img.id}/>
                )}
            </div>
        </div>
    </>)
}

export default Images_Grid;