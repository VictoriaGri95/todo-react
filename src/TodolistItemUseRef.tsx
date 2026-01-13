// import {Button} from "./Button.tsx";
// import {Task} from "./Task.tsx";
//
// import {useRef} from "react";
// import type {FilterValuesType, TodolistType} from "./App.tsx";
//
// type Props = {
//   title: string
//   tasks: TaskType []
//   deleteTask: (taskId: TaskType['id']) => void
//   createTask: (title: TaskType['title']) => void
//   changeTodolistFilter: (filter: FilterValuesType) => void
//
// }
//
// export type TaskType = {
//   id: string
//   title: string
//   isDone: boolean
// }
//
//
// export const TodolistItem = ({
//                                title,
//                                tasks,
//                                deleteTask,
//                                createTask,
//                                changeTodolistFilter,
//                              }: Props) => {
//
//
//   const taskInputRef = useRef<HTMLInputElement>(null)
//
//   const createTaskHandler = () => {
//     if (taskInputRef.current) {
//       const taskTitle: string = taskInputRef.current.value
//       taskInputRef.current.value = ''
//       createTask(taskTitle)
//
//     }
//   }
//
//   return (
//     <div>
//       <h3>{title}</h3>
//       <div>
//         <input ref={taskInputRef} />
//         <Button
//           title={'+'}
//           onClick={createTaskHandler}
//         />
//       </div>
//       {
//         tasks.length === 0
//           ? <p>Тасок нет</p>
//           : <ul>
//             {
//               tasks.map(task =>
//                 <Task
//                   key={task.id}
//                   title={task.title}
//                   isDone={task.isDone}
//                   id={task.id}
//                   deleteTask={deleteTask}
//                 />
//               )
//             }
//           </ul>
//       }
//       <div>
//         <Button
//           title={'All'}
//           onClick={() => changeTodolistFilter("All")}
//         />
//         <Button
//           title={'Active'}
//           onClick={() => changeTodolistFilter("Active")}
//         />
//         <Button
//           title={'Completed'}
//           onClick={() => changeTodolistFilter("Completed")}
//         />
//       </div>
//     </div>
//   )
// }