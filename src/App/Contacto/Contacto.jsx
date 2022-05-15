import React, {useState} from 'react';
import close_sharp from '../../assets/close-sharp.svg';

const Contact = () => {

    const [search, setSearch] = useState({
        name: '',
        surname: '',
        email: '',
        dni: '',
        message: ''
    });

    function clearSearchState() {
        setSearch({     
            dni: '',
            name: '',
            surname: '',
            email: '',
            message: ''
        }
    )};

    return (
        <div className="Contacto__Container">
            <img src={close_sharp} id="close_Sharp" alt=""
            onClick={() => {
                document.getElementById("overlay_Display").style.display = "none";
            }}/>

            {/* PreventDefault() function of the onSubmit attribute of the below form prevent page from refreshing when the submit button is pressed */}
            <form className="Contacto__Form" onSubmit={(e) => {
                    e.preventDefault();
                    console.log('User message data:', search);
                    document.getElementById("overlay_Display").style.display = "none";
                    alert('Mensaje enviado correctamente');
                    clearSearchState();
                }}>

                <label className="Contacto__Label">
                    Nombre<br/>
                    <input type="text" value={search.name} name="Contacto_Nombre" id="contact_focus" placeholder="Escribe aquí..." required onChange={({target}) => setSearch(actualStateValue => ({...actualStateValue, name: target.value}))}/>
                </label>
                <br/>
                <label className="Contacto__Label">
                    Apellidos<br/>
                    <input type="text" value={search.surname} name="Contacto_Apellidos" placeholder="Escribe aquí..." required onChange={({target}) => setSearch(actualStateValue => ({...actualStateValue, surname: target.value}))}/>
                </label>
                <br/>
                <label className="Contacto__Label">
                    Email <br/>
                    <input type="text" value={search.email} name="Contacto__Email" placeholder="Escribe aquí..." required onChange={({target}) => setSearch(actualStateValue => ({...actualStateValue, email: target.value}))}/>
                </label>
                <br/>
                <label className="Contacto__Label">
                    DNI <br/>
                    <input value={search.dni} type="text" name="Contacto_DNI" placeholder="Escribe aquí..." required onChange={({target}) => setSearch(actualStateValue => ({...actualStateValue, dni: target.value}))}/>    
                </label>
                <br/>
                <label className="Contacto__Label">
                    Mensaje <br/>
                    <textarea name="Contacto_Mensaje" value={search.message} placeholder="Escribe aquí..." required onChange={({target}) => setSearch(actualStateValue => ({...actualStateValue, message: target.value}))}></textarea>    
                </label>
                <br/>
                <button type="submit" className="Contact__Submit"><b>Enviar</b></button>
            </form>
        </div>
    )
};

export default Contact;