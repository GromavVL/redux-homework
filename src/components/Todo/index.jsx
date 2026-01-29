import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import styles from './todo.module.scss';

function Todo ({ createNewTodo }) {
  const initialValues = {
    todo: '',
  };
  console.log('initialValues :>> ', initialValues);
  const submitHandler = (values, { resetForm }) => {
    // createNewTodo(values);
    console.log('values :>> ', values);
    resetForm();
  };
  return (
    <section className={styles.home}>
      <div className={styles.todoHeader}>
        <h1 className={styles.title}>✓ Todo App</h1>
        <p className={styles.progress}>
          {1} or {1} tasks completed
        </p>
      </div>
      <Formik initialValues={initialValues} onSubmit={submitHandler}>
        <Form className={styles.addTask}>
          <Field
            name='todo'
            type='text'
            placeholder='Add a new task...'
            autoFocus
            className={styles.inputAdd}
          />
          <ErrorMessage name='todo' component={'div'} />
          <button type='submit' className={styles.buttonAdd}>
            + Add
          </button>
        </Form>
      </Formik>
      <div className={styles.taskList}>
        {/* <div className={styles.noTodo}>
          <h1 className={styles.h1El}>No todos yet!</h1>
          <p className={styles.pEl}>Add one above to get started</p>
        </div> */}
        <div className={styles.task}>
          <label className={styles.taskLabel}>
            <input type='checkbox' className={styles.checkBoxTask} />
            <p>Welcome to your Todo App</p>
          </label>
          <div className={styles.buttonTask}>
            <button className={styles.updataTask}>
              <FaPen />
            </button>

            <button className={styles.deleteTask}>
              <FaRegTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Todo;
