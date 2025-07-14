import React, { useState } from "react";
// Necesito una lista de cosas
// Almacenar la Lista - "React, guarda estas tareas por mí"
// Mostrar la Lista - "Quiero ver mis tareas en la pantalla
// Quiero un botón para eliminar cada tarea
// Quiero un botón para eliminar cada tarea 
// la Lógica de Borrado
const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState([]);

    const handleAddTask = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            setTasks([...tasks, inputValue]);
            setInputValue("");
        }
    };

    const handleDeleteTask = (indexToDelete) => {
        const newTasks = tasks.filter((_, index) => index !== indexToDelete);
        setTasks(newTasks);
    };

    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4 text-primary ">To<span className="text-danger">Do's</span></h1>
            <div className="card">
                <ul className="list-group list-group-flush">
                    {/* Input para nuevas tareas */}
                    <li className="list-group-item">
                        <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Que hay por hacer?"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleAddTask}
                        />
                    </li>

                    {/* AQUÍ VA LA LÓGICA PARA MOSTRAR LAS TAREAS */}
                    {tasks.length === 0 ? (
                        <li className="list-group-item text-muted">
                            No hay tareas, añadir tareas
                        </li>
                    ) : (
                        tasks.map((task, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center task-item">
                                {task}
                                <span className="delete-icon" onClick={() => handleDeleteTask(index)}>
                                    <i className="fas fa-times"></i>
                                </span>
                            </li>
                        ))
                    )}
                </ul>
                <div className="card-footer text-muted">
                    {tasks.length} items por hacer
                </div>
            </div>
        </div>
    );
};

export default Home;