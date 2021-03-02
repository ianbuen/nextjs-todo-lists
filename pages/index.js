import Head from "next/head";
import styles from "../styles/Home.module.scss";
// import { connectToDatabase } from '../util/mongodb';
import { Checkbox, Fab } from '@material-ui/core'; 
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/HighlightOff';
import { useRef, useState } from "react";


// export default function Home({ isConnected }) {
export default function Home() {

  const [list, setList] = useState([
    { name: "Code", done: false }, { name: "Test", done: true }, { name: "Debug", done: true }
  ]);

  const [input, setInput] = useState({ name: "", done: false }); 

  return (
    <div className={styles.container}>

      <Head>
        <title>To Do List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={styles.heading}>
        <h1 className={styles.date}>{new Date().toLocaleDateString("en-US", {weekday: 'long', day: 'numeric', month: 'long'})}</h1>
      </div>
      
      <div className={styles.listbox}>

          {!list || list.length < 1 && <span className={styles.empty}>List is empty.</span>}

          {list.map((item, i) => (
            <span key={i} id={`task-${i}`} style={{ textDecoration: item.done ? "line-through" : "none" }}>
              <Checkbox disableRipple className={styles.checkbox} value={i} defaultChecked={item.done} onChange={toggleTask} />  
              {item.name} 
              <DeleteIcon className={styles.delbutton} onClick={() => { deleteTask(i); }} />
            </span>
          ))}

          <form className={styles.compose} onSubmit={addNewTask}>
            <input type="text" placeholder="New Task" value={input.name} onChange={(e) => setInput({ name: e.target.value, done: false }) } />

            <Fab aria-label="add" className={styles.addbutton} onClick={addNewTask}>
              <AddIcon />
            </Fab>
          </form>
      </div>

      <p className={styles.footer}>© {new Date().getFullYear()} Ian Paul Buenconsejo</p>
    </div>
  );

  
  function addNewTask(e) {
    e.preventDefault();
    
    if (input) {
        setList([...list, input]);
        setInput({ name: "", done: false });
    }
  }

  function toggleTask(e) {    
    const { checked, value } = e.target;
  
    setList(list => { list[value].done = checked; return list; });
    
    document.querySelector(`#task-${value}`).style.textDecoration = checked ? "line-through" : "none";
  }

  function deleteTask(id) {
    setList(list.filter(item => list.indexOf(item) !== id));
  }
}

// export async function getServerSideProps(context) {
//   const { client } = await connectToDatabase()

//   const isConnected = await client.isConnected()

//   return {
//     props: { isConnected },
//   }
// }
