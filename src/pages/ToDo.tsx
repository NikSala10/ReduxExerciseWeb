import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { deleteTask, editTask, saveTasks } from "../redux/slices/toDoSlice";
import './ToDo.css'

const ToDoPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editItem, setEditItem] = useState<number | null>(null);

  const tasks = useSelector((state: RootState) => state.toDo.tasks);
  const dispatch = useDispatch();

  const handleSave = () => {
    if (!title.trim()) {
      alert("⚠️ La tarea necesita al menos un título");
      return;
    }
    
    if (editItem) {
      dispatch(editTask({ id: editItem, title, description }));
      setEditItem(null);
    } else {
      dispatch(saveTasks({ id: Date.now(), title, description }));
    }
    
    setTitle("");
    setDescription("");
  };

  const handleEdit = (id: number, title: string, description: string) => {
    setTitle(title);
    setDescription(description);
    setEditItem(id);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="todo-container">
      <div className="todo-box">
        <h2 className="todo-title">Crea tus Tareas 📃</h2>

        <div className="todo-form">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleSave}>
            {editItem ? "Actualizar" : "Agregar tarea"}
          </button>
        </div>
        <h2>Lista de Tareas:</h2>
        <ul className="todo-list">
          {tasks.length === 0 ? (
            <p className="todo-empty">No hay tareas todavía</p>
          ) : (
            tasks.map((task) => (
              <li key={task.id} className="todo-item">
                <div className="todo-info">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <div className="todo-actions">
                  <button onClick={() => handleEdit(task.id, task.title, task.description)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(task.id)}>Eliminar</button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
export default ToDoPage;
