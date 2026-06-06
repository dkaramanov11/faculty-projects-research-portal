function ProjectForm({ form, editingId, onChange, onSubmit, onCancel }) {
    return (
        <section className="form-card">
            <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>

            <form onSubmit={onSubmit}>
                <input
                    name="title"
                    placeholder="Project title"
                    value={form.title}
                    onChange={onChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Project description"
                    value={form.description}
                    onChange={onChange}
                    required
                />

                <div className="form-row">
                    <select name="type" value={form.type} onChange={onChange}>
                        <option value="project">Project</option>
                        <option value="research">Research</option>
                    </select>

                    <select name="status" value={form.status} onChange={onChange}>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                <div className="actions">
                    <button type="submit">
                        {editingId ? 'Update Project' : 'Create Project'}
                    </button>

                    {editingId && (
                        <button type="button" className="secondary" onClick={onCancel}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </section>
    )
}

export default ProjectForm