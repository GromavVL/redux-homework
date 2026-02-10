import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FaRegTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { FaPen } from 'react-icons/fa';
import {
  deleteTodo,
  completeTodo,
  createTodo,
} from '../../store/slices/todoSlice';
import { TODO_VALIDATION_SCHEMA } from '../../utils/validatiosnShemas';
import classNames from 'classnames';
import styles from './todo.module.scss';

function Todo ({ todoTask, deleteTodoById, completeTodoTask, createTodoTask }) {
  const initialValues = {
    todo: '',
  };
  console.log('initialValues :>> ', initialValues);
  const submitHandler = (values, { resetForm }) => {
    createTodoTask(values);
    console.log('values :>> ', values);
    resetForm();
  };
  const changeCompleted = (id, checked) => {
    completeTodoTask(id, { isCompleted: checked });
  };
  const taskClass = isCompleted =>
    classNames(styles.task, { [styles.taskDisable]: isCompleted });

  const completeadtaskNumner = () =>
    todoTask.todo.filter(t => t.isCompleted).length;
  const taskNumber = () => todoTask.todo.length;
  
  return (
    <section className={styles.home}>
      <div className={styles.todoHeader}>
        <h1 className={styles.title}>✓ Todo App</h1>
        <p className={styles.progress}>
          {completeadtaskNumner()} or {taskNumber()} tasks completed
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={TODO_VALIDATION_SCHEMA}
        onSubmit={submitHandler}
      >
        <Form className={styles.addTask}>
          <Field
            name='todo'
            type='text'
            placeholder='Add a new task...'
            autoFocus
            className={styles.inputAdd}
          />
          <button type='submit' className={styles.buttonAdd}>
            + Add
          </button>
        </Form>
      </Formik>
      <div className={styles.taskList}>
        {todoTask.todo.length === 0 ? (
          <div className={styles.noTodo}>
            <h1 className={styles.noTodoTitle}>No todos yet!</h1>
            <p className={styles.noTodoText}>Add one above to get started</p>
          </div>
        ) : (
          todoTask.todo.map(t => (
            <div key={t.id} className={taskClass(t.isCompleted)}>
              <label className={styles.taskLabel}>
                <input
                  type='checkbox'
                  checked={t.isCompleted}
                  onChange={({ target: { checked } }) =>
                    changeCompleted(t.id, checked)
                  }
                  className={styles.checkBoxTask}
                />
                <p>{t.task}</p>
              </label>
              <div className={styles.buttonTask}>
                <button className={styles.updateTask}>
                  <FaPen />
                </button>
                <button
                  className={styles.deleteTask}
                  onClick={() => deleteTodoById(t.id)}
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

const mapStateToProps = ({ todoTask }) => ({ todoTask });
const mapDispatchToProps = dispatch => ({
  deleteTodoById: id => dispatch(deleteTodo(id)),
  completeTodoTask: (id, data) => dispatch(completeTodo({ id, data })),
  createTodoTask: data => dispatch(createTodo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
