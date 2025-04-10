import Sidebar from "../layouts/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import TodoDatatable from "./todo-datatable";
import api from "../../../api/services";
import TodoForm from "./todo-form";

export default function TodosList() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  };

  const handleAddTodo = () => {
    setShowModal(true);
    setSelectedTodo(null);
  };

  const fetchTodos = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await api.get("/todos", { headers, params: { user: user.id } });
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // function openModal() {
  //   setShowModal(true);
  // }

  // function closeModal() {
  //   setShowModal(false);
  // }

  return (
    <Sidebar>
      <div className="bg-gray-50">
        <div className="flex justify-between items-center mb-2 bg-white p-2 rounded-md">
          <h1 className="text-lg font-bold text-gray-700">Todos List</h1>
          <button onClick={() => setShowModal(true)} className="hover:bg-indigo-700 transition-colors duration-300 bg-white hover:text-white border border-indigo-700 text-indigo-700 px-2 py-1.5 rounded-md text-sm cursor-pointer">
            <FontAwesomeIcon icon={faPlus} /> Add Todo
          </button>
        </div>
        <div className="shadow-sm">
          <TodoDatatable todos={todos} fetchTodos={fetchTodos} />
          <TodoForm isOpen={showModal} closeModal={() => setShowModal(false)} fetchTodos={fetchTodos} />
        </div>
      </div>
    </Sidebar>
  );
}
