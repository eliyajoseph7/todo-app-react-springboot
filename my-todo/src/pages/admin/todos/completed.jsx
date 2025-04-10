import Sidebar from "../layouts/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import TodoDatatable from "./todo-datatable";
import api from "../../../api/services";
import TodoForm from "./todo-form";

export default function CompletedTodos() {
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

  const fetchCompletedTodos = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await api.get("/todos/completed", { headers, params: { user: user.id } });
    setTodos(response.data);
  };

  useEffect(() => {
    fetchCompletedTodos();
  }, []);


  return (
    <Sidebar>
      <div className="bg-gray-50">
        <div className="flex justify-between items-center mb-2 bg-white p-2 rounded-md">
          <h1 className="text-lg font-bold text-gray-700">Completed Todos List</h1>
        </div>
        <div className="shadow-sm">
          <TodoDatatable todos={todos} fetchTodos={fetchCompletedTodos} />
          <TodoForm isOpen={showModal} closeModal={() => setShowModal(false)} fetchTodos={fetchCompletedTodos} />
        </div>
      </div>
    </Sidebar>
  );
}
