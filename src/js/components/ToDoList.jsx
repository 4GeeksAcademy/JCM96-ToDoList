import React, { useState, useEffect } from "react";

const ToDoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState([]);
    const username = "jcm96"; // ¡Usa tu propio nombre de usuario aquí!
    const apiUrl = `https://playground.4geeks.com/todo`;

    // Función para obtener las tareas del servidor
    const getTodos = async () => {
        try {
            const response = await fetch(`${apiUrl}/users/${username}`);
            if (response.status === 404) {
                // Si el usuario no existe, lo creamos
                await createUser();
                return; // Salimos de la función ya que no hay tareas todavía
            }
            if (!response.ok) {
                throw new Error("No se pudieron obtener las tareas.");
            }
            const data = await response.json();
            setTasks(data.todos);
        } catch (error) {
            console.error(error);
        }
    };

    // Función para crear el usuario si no existe
    const createUser = async () => {
        try {
            const response = await fetch(`${apiUrl}/users/${username}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                // Después de crear el usuario, obtenemos la lista (que estará vacía)
                getTodos();
            }
        } catch (error) {
            console.error("Error al crear el usuario:", error);
        }
    };

    // Efecto para cargar las tareas cuando el componente se monta
    useEffect(() => {
        getTodos();
    }, []);

    // Función para añadir una tarea
    const handleAddTask = async (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            const newTask = {
                label: inputValue,
                is_done: false
            };
            try {
                const response = await fetch(`${apiUrl}/todos/${username}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newTask)
                });
                if (!response.ok) {
                    throw new Error("No se pudo añadir la tarea.");
                }
                setInputValue("");
                // Refrescamos la lista de tareas desde el servidor
                getTodos();
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Función para eliminar una tarea
    const handleDeleteTask = async (taskId) => {
        try {
            const response = await fetch(`${apiUrl}/todos/${taskId}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("No se pudo eliminar la tarea.");
            }
            // Refrescamos la lista de tareas
            getTodos();
        } catch (error) {
            console.error(error);
        }
    };

    // Función para limpiar todas las tareas
    const handleClearAllTasks = async () => {
        try {
            // La API permite eliminar el usuario para borrar todas sus tareas
            const response = await fetch(`${apiUrl}/users/${username}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("No se pudieron limpiar las tareas.");
            }
            // Vaciamos el estado y creamos el usuario de nuevo para empezar de cero
            setTasks([]);
            createUser();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">todos</h1>
            <div className="card">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <input
                            type="text"
                            className="form-control border-0"
                            placeholder="What needs to be done?"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleAddTask}
                        />
                    </li>
                    {tasks.length === 0 ? (
                        <li className="list-group-item text-muted">
                            No hay tareas, añadir tareas
                        </li>
                    ) : (
                        tasks.map((task) => (
                            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center task-item">
                                {task.label}
                                <span className="delete-icon" onClick={() => handleDeleteTask(task.id)}>
                                    <i className="fas fa-times"></i>
                                </span>
                            </li>
                        ))
                    )}
                </ul>
                <div className="card-footer text-muted d-flex justify-content-between align-items-center">
                    <span>
                        {tasks.length} item{tasks.length !== 1 ? 's' : ''} left
                    </span>
                    <button className="btn btn-danger btn-sm" onClick={handleClearAllTasks}>
                        Limpiar todo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;