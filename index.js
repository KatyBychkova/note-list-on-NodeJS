const yargs = require('yargs')
const pkg = require('./package.json')
const {addNote, printNotes, removeNote} = require('./notes.controller')


yargs.version(pkg.version)

yargs.command({
    command: "add",
    describe: "add new note",
    builder: {
        title: {
            type: "string",
            describe: "note title",
            demandOption: true
        }
    },
    handler({title}){
        addNote(title);
    }
})

yargs.command({
    command: "list",
    describe: "Print all notes",
    async handler(){
       await printNotes()
    }
})

yargs.command({
    command: 'remove',
    describe: "Remove note by id",
    builder:{
        id: {
            type: "string",
            describe: "note id",
            demandOption: true
        }
    },
    handler({id}){
        removeNote(id)
    }
})

yargs.parse()