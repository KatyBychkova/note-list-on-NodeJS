const fs = require('fs/promises') // модуль позволяет записывать и читать  файлы
const path = require('path')
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json')

async function saveNotes(notes){
    await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function addNote(title) {
    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await saveNotes(notes)
    console.log(chalk.cyan(`Added note`), chalk.cyanBright(`"${title}"`));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes(){
    const notes = await getNotes();
    console.log(chalk.bgMagentaBright("Here is а list of notes:"))
    notes.forEach(note=>{
        console.log(chalk.magenta(note.id), chalk.magentaBright(note.title))
    })
}


async function removeNote(id) {
    let notes = await getNotes()
    console.log(chalk.blue(`Note with the id=${id} has been deleted`))
    notes = notes.filter(note=>note.id !== id)
    await saveNotes(notes)
}

async function updateNote(noteData) {
    const notes = await getNotes()
    const index = notes.findIndex(note => note.id === noteData.id)
    if (index >= 0) {
        notes[index] = { ...notes[index], ...noteData }
        await saveNotes(notes)
        console.log(chalk.bgGreen(`Note with id="${noteData.id}" has been updated!`))
    }
}

module.exports = {
    addNote, getNotes, removeNote, updateNote
}