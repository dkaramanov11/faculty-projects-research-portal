import { useEffect, useState } from 'react'

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from '../services/categoryService'
import { useAuth } from '../context/AuthContext'

function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState({
        name: ''
    })
    const { user, token } = useAuth()

    useEffect(() => {
        loadCategories()
    }, [])

    function loadCategories() {
        getCategories()
            .then(data => setCategories(data.data))
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function resetForm() {
        setForm({
            name: ''
        })

        setEditingId(null)
        setShowForm(false)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const request = editingId
            ? updateCategory(editingId, form, token)
            : createCategory(form, token)

        request.then(() => {
            loadCategories()
            resetForm()
        })
    }

    function handleEdit(category) {
        setEditingId(category.id)
        setShowForm(true)

        setForm({
            name: category.name
        })
    }

    function handleDelete(id) {
        deleteCategory(id, token)
            .then(() => loadCategories())
    }

    return (
        <section className="categories-page">
            <div className="page-header">
                <div>
                    <h1>Categories</h1>
                    <p>Manage project and research categories.</p>
                </div>

                {user && (
                    <button className="add-button" onClick={() => setShowForm(true)}>
                        Add New Category
                    </button>
                )}
            </div>

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <section className="form-card">
                            <h2>{editingId ? 'Edit Category' : 'Add New Category'}</h2>

                            <form onSubmit={handleSubmit}>
                                <input
                                    name="name"
                                    placeholder="Category name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="actions">
                                    <button type="submit">
                                        {editingId ? 'Update Category' : 'Create Category'}
                                    </button>

                                    <button type="button" className="secondary" onClick={resetForm}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            )}

            <div className="category-list">
                {categories.map(category => (
                    <div className="category-row" key={category.id}>
                        <span>{category.name}</span>

                        {user && (
                            <div className="category-actions">
                                <button onClick={() => handleEdit(category)}>Edit</button>
                                <button className="danger" onClick={() => handleDelete(category.id)}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CategoriesPage