"use client"

import { useState } from "react"

interface Task {
  id: number
  text: string
  completed: boolean
}

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState("")
  const [duplicateWarning, setDuplicateWarning] = useState(false)

  const isDuplicate = () =>
    tasks.some(task => task.text.toLowerCase() === input.trim().toLowerCase())

  const commitTask = () => {
    setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }])
    setInput("")
    setDuplicateWarning(false)
  }

  const addTask = () => {
    if (input.trim() === "") return
    if (isDuplicate()) {
      setDuplicateWarning(true)
      return
    }
    commitTask()
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const remaining = tasks.filter(task => !task.completed).length

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-16 px-4">

      {/* Header */}
      <div className="w-full max-w-lg mb-8">
        <h1 className="text-3xl font-bold text-white">Task List</h1>
        <p className="text-gray-400 mt-1">
          {tasks.length === 0
            ? "No tasks yet — add one below"
            : `${remaining} of ${tasks.length} remaining`}
        </p>
      </div>

      {/* Input */}
      <div className="w-full max-w-lg flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setDuplicateWarning(false)
          }}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a new task..."
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
        />
        <button
          onClick={addTask}
          className="bg-violet-600 hover:bg-violet-500 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          Add
        </button>
      </div>

      {/* Duplicate warning */}
      {duplicateWarning && (
        <div className="w-full max-w-lg mb-4 bg-yellow-950 border border-yellow-700 rounded-lg px-4 py-3 flex items-center justify-between gap-4">
          <p className="text-yellow-400 text-sm">
            &ldquo;{input.trim()}&rdquo; already exists. Add it anyway?
          </p>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={commitTask}
              className="bg-yellow-600 hover:bg-yellow-500 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
            >
              Add anyway
            </button>
            <button
              onClick={() => setDuplicateWarning(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Task list */}
      <ul className="w-full max-w-lg flex flex-col gap-2">
        {tasks.map(task => (
          <li
            key={task.id}
            className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3"
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${
                task.completed
                  ? "bg-violet-600 border-violet-600"
                  : "border-gray-600 hover:border-violet-400"
              }`}
            />

            {/* Task text */}
            <span className={`flex-1 text-sm ${
              task.completed ? "line-through text-gray-500" : "text-gray-100"
            }`}>
              {task.text}
            </span>

            {/* Delete button */}
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-600 hover:text-red-400 text-lg leading-none transition-colors"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

    </main>
  )
}
