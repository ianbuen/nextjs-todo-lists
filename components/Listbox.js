export default function Listbox() {

    const [list, setList] = useState([
        { name: "Code", done: false }, { name: "Test", done: true }, { name: "Debug", done: true }
    ]);

    return (
        <div className={styles.listbox}>

          {!list || list.length < 1 && <span className={styles.empty}>List is empty.</span>}

          <form className={styles.form} onSubmit={addNewTask}>

          {list.map((item, i) => (
            <span key={i} className={item.done ? styles.done : styles.taskItem}> 
              <Checkbox className={styles.checkbox} value={i} checked={item.done} onChange={toggleTask} />  
              <input type="text" className={styles.textfield} value={item.name} onDoubleClick={() => { editTask(i) }} />
              <DeleteIcon className={styles.delbutton} onClick={() => { deleteTask(i); }} />
            </span>
          ))}

            <div className={styles.compose}>
              <input type="text" placeholder="New Task" value={input.name} onChange={(e) => setInput({ name: e.target.value, done: false }) } />

              <Fab aria-label="add" className={styles.addbutton} onClick={addNewTask}>
                <AddIcon />
              </Fab>
            </div>
          </form>
      </div>
    );
}