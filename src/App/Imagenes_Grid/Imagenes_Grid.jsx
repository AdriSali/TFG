import React from 'react';
import Photo_card from '../Foto/foto';

const Images_Grid = ({imgsArray, response_IsEmpty}) => {

    const images = imgsArray;

    const imagesUnit = imgsArray.length / 3;

    /*To replicate Unsplash layout, we need a grid with 3 'div'. In order to achieve this, the props array api results is sliced in 3 parts. 
    Each part contains a third part of the photos so we can make each part to be a grid column with a third part of the photos.*/
    return (<>
        
        {/* This conditional estructure allow to show a template text when the user hasn't search anything yet or when the search doesn't get any image from the API */}
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

        {/* Grid that contains the images */}
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