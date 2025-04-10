import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import api from '../../../api/services'

function TodoForm({ isOpen, closeModal, fetchTodos, todo }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate();
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setDescription(todo.description);
        }
    }, [todo]);

    const handleSubmit = async (e) => {
        toast.loading('Creating todo...', { position: "bottom-center" })
        e.preventDefault()
        const body = {
            title,
            description
        }
        try {
            toast.dismiss();
            if (todo) {

                var response = await api.put(`/todos/${todo.id}`, body, { headers });
            } else {
                var response = await api.post('/todos', body, { headers });
            }
            if (response.status === 200) {
                toast.success(todo ? 'Todo updated successfully' : 'Todo created successfully')
                // if (fetchTodos) {
                fetchTodos();
                // } else {
                //     fetchTodos();
                // }
                closeModal()
                setTitle('');
                setDescription('');
            } else {
                toast.error(todo ? 'Failed to update todo' : 'Failed to create todo')
            }
        } catch (error) {
            toast.dismiss();
            if (error.response.status === 403) {
                toast.error("Token expired, please login again");
                localStorage.clear();
                navigate('/login');
            } else if (error.response.status === 401) {
                toast.error(error.response.data.message);
            } else {
                toast.error(todo ? "Failed to update todo" : "Failed to create todo");
            }
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog static open={isOpen} onClose={closeModal} className="relative z-50">
                    {/* Background overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30"
                        aria-hidden="true"
                    />

                    {/* Modal container */}
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel
                            as={motion.div}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                        >
                            <DialogTitle className="text-lg font-medium leading-6 text-gray-900">
                                {todo ? 'Edit Todo' : 'Add New Todo'}
                            </DialogTitle>

                            <form onSubmit={handleSubmit} className="mt-4">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="Enter title..."
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div className="mb-4">
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="Enter description..."
                                        required
                                        rows={5}
                                    >

                                    </textarea>
                                </div>

                                <div className="mt-4 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
                                    >
                                        {todo ? 'Update Todo' : 'Add Todo'}
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    )
}

export default TodoForm;