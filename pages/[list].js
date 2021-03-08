import Item from "../util/mongoose";
import styles from "../styles/Home.module.scss";
import { useState } from "react";
import { Checkbox, Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios";
import _ from "lodash";

export default function List({ page, data }) {

    const [list, setList] = useState(JSON.parse(data));

    const [input, setInput] = useState({ name: "", done: false, category: page }); 

    const [editMode, setEditMode] = useState(Array(list.length).fill(false));

    return (
        <div className={styles.container}>

            <div className={styles.heading}>
                <h1 className={styles.date}>{_.upperFirst(page)} List</h1>
            </div>

            <div className={styles.listbox}>

                {!list || list.length < 1 && <span className={styles.empty}>List is empty.</span>}

                {list.map((item, i) => (
                    <span key={i} className={item.done ? styles.done : styles.taskItem} title={item.name}> 
                    <Checkbox className={styles.checkbox} value={i} checked={item.done} onChange={toggleTask} />  
                    <input type="text" className={editMode[i] ? styles.edit__mode : styles.textfield} value={item.name} onChange={(e) => changeText(e, i)} />
                    <span className={styles.edit__button} onClick={() => { toggleEdit(i) }}>{editMode[i] ? <SaveIcon /> : <EditIcon /> }</span>
                    <DeleteIcon className={styles.delbutton} onClick={() => { deleteTask(i); }} />
                    </span>
                ))}

                <form className={styles.form} onSubmit={addNewTask}>
                    <div className={styles.compose}>
                    <input type="text" tabIndex={1} placeholder="New Task" value={input.name} onChange={(e) => setInput({...input, name: e.target.value}) } />

                    <Fab aria-label="add" className={styles.addbutton} onClick={addNewTask}>
                        <AddIcon />
                    </Fab>
                    </div>
                </form>
            </div>

            <p className={styles.footer}>© {new Date().getFullYear()} Ian Paul Buenconsejo 👽</p>

        </div>
    );

    function addNewTask(e) {

        e.preventDefault();
    
        if (input && input.name.trim().length) {
            setList([...list, {...input, name: input.name.trim()}]);
            setInput({ name: "", done: false, category: page });

            axios.post("/api/save", { task: input, list: page })
                 .then(({ data: { list } }) => setList(list))
                 .catch(err => console.log(err));
        }
      } 
    
      function toggleTask(e) {
    
        const { checked, value } = e.target;
    
        let copy = [...list];
    
        copy[value].done = checked;

        axios.put("/api/edit", { task: copy[value] })
             .then(({ data: { success } }) => { success && setList(copy); } )
             .catch(err => console.log(err));
      }
    
      function deleteTask(index) {

        const taskID = list[index]._id;

        axios.post("/api/delete", { taskID: taskID })
             .then(({ data: { success } }) => { success && setList(list.filter(item => list.indexOf(item) !== index)); })
             .catch(err => console.log(err));
      }
    
      function toggleEdit(i) {
    
        let copy = [...editMode];
    
        copy[i] = !copy[i];

        setEditMode(copy)

        !copy[i] && axios.put("/api/edit", { task: list[i] })
                         .catch(err => console.log(err))
      }
    
      function changeText(e, i) {
    
        const { value } = e.target;
    
        if (editMode[i]) {
            let copy = [...list];
            copy[i].name = value;
            setList(copy);
        }
    }
}

export async function getServerSideProps(context) {

    const { query: { list: page } } = context;

    let data = await Item.find({ category: page });

    data = JSON.stringify(data);

    return {
        props: { page, data }
    }
}