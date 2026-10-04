import { useState, type FormEvent } from 'react'
import Modal from './ui/Modal'

type CreateGoalModalProps = {
  onClose: () => void
}

function CreateGoalModal({ onClose }: CreateGoalModalProps) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    form.reset()
    setSubmitted(true)
  }

  return (
    <Modal labelledBy="create-goal-title" onClose={onClose}>
        <div className="modal-heading"><div><p className="dashboard-kicker">New savings target</p><h2 id="create-goal-title">Create a goal</h2></div><button type="button" onClick={onClose} aria-label="Close create goal dialog">×</button></div>
        {submitted ? (
          <div className="goal-success" role="status"><span aria-hidden="true">✓</span><h3>Goal details look good</h3><p>This is a frontend demonstration, so no goal was saved.</p><button className="submit-button" type="button" onClick={onClose}>Done</button></div>
        ) : (
          <form className="goal-form" onSubmit={handleSubmit}>
            <label className="field"><span>Goal name</span><input name="goalName" type="text" minLength={2} required /></label>
            <div className="field-grid">
              <label className="field"><span>Target amount</span><input name="targetAmount" type="number" min="1" step="0.01" required /></label>
              <label className="field"><span>Target date</span><input name="targetDate" type="date" required /></label>
            </div>
            <label className="field"><span>Description <small>(optional)</small></span><textarea name="description" rows={3} maxLength={180} /></label>
            <div className="modal-actions"><button className="cancel-button" type="button" onClick={onClose}>Cancel</button><button className="submit-button" type="submit">Create Goal</button></div>
          </form>
        )}
    </Modal>
  )
}

export default CreateGoalModal
