import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckDouble, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import TodoForm from "./todo-form";
import Delete from "../../../components/delete";
import MarkCompleted from "./mark-completed";

function TodoDatatable({ todos, fetchTodos }) {
    const [showModal, setShowModal] = useState(false);
    const [todo, setTodo] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showMarkCompletedModal, setShowMarkCompletedModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter todos based on search term
    const filteredTodos = useMemo(() => {
        if (!searchTerm) return todos;
        
        return todos.filter(todo => 
            todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (todo.completed ? 'completed' : 'not completed').includes(searchTerm.toLowerCase())
        );
    }, [todos, searchTerm]);

    const column = [
        {
            'name': 'SN.',
            'selector': (row, index) => index + 1,
            'sortable': false,
            'cell': (row, index) => {
                return <div className="text-center w-5 dt-control">{index + 1}</div>;
            },
            'width': '7%'
        },
        {
            'name': 'Title',
            'selector': row => row.title,
            'sortable': true,
            'cell': (row) => {
                return <div className="sorting">{row.title}</div>;
            },
            'width': '20%'
        },
        {
            'name': 'Description',
            'selector': row => row.description,
            'sortable': true,
            'cell': (row) => {
                return <div className="sorting" title={row.description}>{row.description.length > 50 ? row.description.substring(0, 50) + '...' : row.description}</div>;
            },
            'width': '30%'
        },
        {
            'name': 'Created At',
            'selector': row => row.created_at,
            'sortable': true,
            'cell': (row) => {
                return <div className="sorting">{new Date(row.created_at).toLocaleDateString()}</div>;
                // return <div className="sorting">{new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>;
            },
            'width': '20%'
        },
        {
            'name': 'Status',
            'selector': row => row.completed,
            'sortable': true,
            'cell': (row) => {
                return <div className="sorting">{row.completed ? <span className="text-green-500">Completed</span> : <span className="text-red-500">Not Completed</span>}</div>;
            },
            'width': '10%'
        },
        {
            'name': 'Actions',
            'selector': row => row.actions,
            'sortable': false,
            'cell': (row) => {
                return <div className="flex grid-cols-3 gap-1 text-xs">
                    <button onClick={() => {setShowModal(true); setTodo(row)}} className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-2 py-1 rounded-md w-full" title="Edit">
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button onClick={() => {setShowDeleteModal(true); setTodo(row)}} className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-2 py-1 rounded-md" title="Delete">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    {!row.completed && (
                        <button onClick={() => {setShowMarkCompletedModal(true); setTodo(row)}} className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-2 py-1 rounded-md" title="Mark as completed">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </button>
                    )}
                </div>;
            },
            'width': '23%'
        }
    ];
    return (
        <div className="p-4 bg-white rounded-lg w-full">
            <DataTable
                columns={column}
                data={filteredTodos}
                pagination
                highlightOnHover
                responsive
                subHeader
                subHeaderComponent={
                    <input
                        type="text"
                        placeholder="Search"
                        className="px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                }
                subHeaderAlign="right"
                subHeaderWrap
                customStyles={{
                    header: {
                        style: {
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: '#4A5568',
                            backgroundColor: 'var(--dt-html-background)',
                            padding: '1rem',
                        },
                    },
                    headRow: {
                        style: {
                            backgroundColor: '#F6F7F8',
                            border: 'none',
                        },
                    },
                    headCells: {
                        style: {
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            color: '#2D3748',
                        },
                    },
                    rows: {
                        style: {
                            fontSize: '0.875rem',
                            color: '#4A5568',
                            border: 'none !important',
                            backgroundColor: '#FFFFFF',
                            '&:nth-of-type(even)': {
                                backgroundColor: '#F9FAFB',
                            },
                            '&:nth-of-type(odd)': {
                                backgroundColor: '#FFFFFF',
                            },
                        },
                    },
                    table: {
                        style: {
                            borderStyle: 'solid',
                            borderWidth: '1px',
                            borderColor: '#E2E8F0',
                            width: '100%',
                            overflowX: 'auto',
                        },
                    },
                    tableWrapper: {
                        style: {
                            borderStyle: 'solid',
                            borderWidth: '0px',
                            borderColor: '#FFFFFF',
                        },
                    },
                
                    pagination: {
                        style: {
                            fontSize: '0.875rem',
                            color: '#4A5568',
                            backgroundColor: '#FFFFFF',
                            borderTopStyle: 'solid',
                            borderTopWidth: '1px',
                            borderTopColor: '#E2E8F0',
                            padding: '0.5rem',
                        },
                    },
                }}
            />
          <TodoForm isOpen={showModal} closeModal={() => setShowModal(false)} todo={todo} fetchTodos={fetchTodos} />
          {todo && <Delete url={`/todos/${todo.id}`} name={todo.title} isOpen={showDeleteModal} closeModal={() => setShowDeleteModal(false)} fetchData={fetchTodos} />}
          {todo && <MarkCompleted url={`/todos/${todo.id}/complete`} name={todo.title} isOpen={showMarkCompletedModal} closeModal={() => setShowMarkCompletedModal(false)} fetchData={fetchTodos} />}
        </div>
    );
}

export default TodoDatatable;
