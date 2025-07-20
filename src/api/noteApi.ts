import { apiClient } from "./config"
import type { Note, ApiResponse } from "./types"

export const getNotes = async (): Promise<Note[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Note[]>>("/notes")
    return response.data.data
  } catch (error) {
    console.error("Get notes error:", error)
    throw error
  }
}

export const getNoteById = async (id: string): Promise<Note> => {
  try {
    const response = await apiClient.get<ApiResponse<Note>>(`/notes/${id}`)
    return response.data.data
  } catch (error) {
    console.error("Get note by ID error:", error)
    throw error
  }
}

export const createNote = async (note: Omit<Note, "id" | "createdAt" | "updatedAt">): Promise<Note> => {
  try {
    const response = await apiClient.post<ApiResponse<Note>>("/notes", note)
    return response.data.data
  } catch (error) {
    console.error("Create note error:", error)
    throw error
  }
}

export const updateNote = async (id: string, note: Partial<Note>): Promise<Note> => {
  try {
    const response = await apiClient.put<ApiResponse<Note>>(`/notes/${id}`, note)
    return response.data.data
  } catch (error) {
    console.error("Update note error:", error)
    throw error
  }
}

export const deleteNote = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/notes/${id}`)
  } catch (error) {
    console.error("Delete note error:", error)
    throw error
  }
}

export const searchNotes = async (query: string): Promise<Note[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Note[]>>(`/notes/search?q=${encodeURIComponent(query)}`)
    return response.data.data
  } catch (error) {
    console.error("Search notes error:", error)
    throw error
  }
}
