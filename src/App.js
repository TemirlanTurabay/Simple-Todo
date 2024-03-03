import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';

function App() {

  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [{
    id: 1,
    title: "This is an example",
    status: "active"
  }];
  const [todo, setTodo] = useState(initialTodos);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo));
  }, [todo]);

  const [todoNew, setTodoNew] = useState("");
  function addTodo(){
    if(todoNew.trim() === "") return;
    const newTodoItem = {
      id: Date.now(),
      title: todoNew,
      status: "active"
    }
    setTodo([...todo, newTodoItem]);
    setTodoNew("");
    setModalOpen(false);
  }

  function deleteTodo(idx){
    const newTodos = todo.filter((task) => task.id !== idx);
    setTodo(newTodos);
  }

  function removeTodo(idx) {
    const newTodos = todo.map((todo_item) =>
      todo_item.id === idx
        ? { ...todo_item, status: todo_item.status === "trash" ? "active" : "trash" }
        : todo_item
    );
    setTodo(newTodos);
  }

  function makeTodoDone(idx) {
    const newTodos = todo.map((todo_item) =>
      todo_item.id === idx
        ? { ...todo_item, status: todo_item.status === "done" ? "active" : "done" }
        : todo_item
    );
    setTodo(newTodos);
  }
  
  const [filteredStatus, setFilteredStatus] = useState("active");
  const filteredTodos = todo.filter((task) => {
    if(filteredStatus == "active" && task.status == "active") return task;
    if(filteredStatus == "done" && task.status == "done") return task;
    if(filteredStatus == "trash" && task.status == "trash") return task;
  })
  function changeStatus(newStatus){
    setFilteredStatus(newStatus);
  }

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(!isModalOpen);
  }

  return (
    <div>
      <header className="header">
        <div>Simple To Do List</div>
        <div>Today is awesome day. The weather is awesome, you are awesome too!</div>
      </header>

      <div className="buttons">
        <button onClick={() => {changeStatus("active")}} className={filteredStatus === 'active' ? 'activeButton' : ''}>To Do</button>
        <button onClick={() => {changeStatus("done")}} className={filteredStatus === 'done' ? 'activeButton' : ''}>Done</button>
        <button onClick={() => {changeStatus("trash")}} className={filteredStatus === 'trash' ? 'activeButton' : ''}>Trash</button>
      </div>

      {isModalOpen && (
        <div className="modal_screen">
          <div>Add New To Do</div>
          <input onChange={(event) => {setTodoNew(event.target.value)}} type="text" className='todo_input' placeholder='your text' value={todoNew}/>
          <button onClick={addTodo}>Add</button>
        </div>
      )}

      <button onClick={openModal} className="pop_modal">
        <img src="https://s3-alpha-sig.figma.com/img/2013/0d80/400dce2e030b037099cfdabaa86aa7b9?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KDdFaHH4HJneMaI7TxOuWc~x5vbf1ofzZKXldTLfBZrfj3i4XchSQxc3UAGO3uUpU-Y9GJs6ojTSevna6wslBY~GIpofszrkSEewc~X~MasLnMrcPIbCG21TXFQ5XtfX7P~DZ8m0hB0GwSdMmcBcYJDLh9LLbgQzMWeih-DMco-XH7067Zwi5OeYJEmGOkC23ddJtinLvDbOahASGJAolK2eMmOI-kPMcH~X~yXTjhDdNkssQXrTo5Rb4oAPvllX9wFCHq73fz9N4mWdObwjuCFaSmMHGhv4YX65jTyry9GpNqH3A3BHO7DrRTIJibrGm2IjSgBVKX4IavsgV0LTcw__" alt="" />
      </button>

      <div className="list_header">
        <h2>To Do</h2>
        <div></div>
      </div>

      <div className="todo_list">
        {filteredTodos.map((todo_item, idx) => 
        <div className="todo" key={idx}>
          <div>{todo_item.title}</div>
          {todo_item.status !== "trash" && (
            <button onClick={() => {makeTodoDone(todo_item.id)}}>
              {todo_item.status === "done" ? "active" : "done"}
            </button>
          )}
          <button onClick={() => {removeTodo(todo_item.id)}}>{todo_item.status === "trash" ? "active" : "trash"}</button>
          {todo_item.status === "trash" && (
            <button onClick={() => {deleteTodo(todo_item.id)}}>delete</button>
          )}
        </div>
        )}
      </div>

      <footer>
        <div>
          <div>Made with ❤️ at nFactorial in 2022.</div>
          <div>Credits: Temirlan Turabay.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
