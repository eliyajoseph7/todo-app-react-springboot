import { AnimatePresence, motion } from 'framer-motion'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import api from '../api/services'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Delete({ url, name, isOpen, closeModal, fetchData }) {
    const navigate = useNavigate();

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        toast.loading('Deleting...', { position: "bottom-center" })
        try {
            const response = await api.delete(url, { headers });
            
            toast.dismiss();
            if (response.status === 200) {
                toast.success('Deleted successfully');
                closeModal();
                fetchData();
            }
        } catch (error) {
            if (error.response.status === 403) {
                toast.dismiss();
                toast.error('Token expired, please login again');
                localStorage.clear();
                navigate('/login');
            } else if (error.response.status === 401) {
                toast.dismiss();
                toast.error(error.response.data.message);
            } else {
                toast.dismiss();
                toast.error('Failed to delete')
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
                                Delete {name}
                            </DialogTitle>

                            <div className="mt-4">
                                <div className="text-sm text-gray-500">Are you sure you want to delete {name}?</div>

                                <div className="mt-4 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    )
}

export default Delete;