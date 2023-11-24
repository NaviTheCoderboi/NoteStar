import clientPromise from '$lib/utils/mongodbPromise';
import type { OutputData } from '@editorjs/editorjs';
import { ObjectId } from 'mongodb';

interface Note {
	user_id: ObjectId;
	title: string;
	description: string;
	tags: string[];
	content: OutputData;
	createdAt: Date;
	updatedAt: Date;
}

interface DBNote {
	_id?: string;
	user_id: string;
	title: string;
	description: string;
	tags: string[];
	content: OutputData;
	createdAt: Date;
	updatedAt: Date;
}

interface NoteUpdate {
	title?: string;
	description?: string;
	tags?: string[];
	content?: OutputData;
	updatedAt?: Date;
}

export type { DBNote, Note };

const createNote = async (note: Note) => {
	const db = await clientPromise;
	const collection = db.db('notestar').collection<Note>('notes');
	const result = await collection.insertOne({
		...note
	});
	return result;
};

const getNotes = async (user_id: string) => {
	const _user_id = new ObjectId(user_id);
	const db = await clientPromise;
	const collection = db.db('notestar').collection<Note>('notes');
	const result = await collection.find({ user_id: _user_id }).toArray();
	const notes: DBNote[] = result.map((note) => {
		return {
			_id: note._id?.toString(),
			user_id: note.user_id.toString(),
			title: note.title,
			description: note.description,
			tags: note.tags,
			content: note.content,
			createdAt: note.createdAt,
			updatedAt: note.updatedAt
		};
	});
	return notes;
};

const getNote = async (user_id: string, id: string) => {
	const _user_id = new ObjectId(user_id);
	const _id = new ObjectId(id);
	const db = await clientPromise;
	const collection = db.db('notestar').collection<Note>('notes');
	const result = await collection.findOne({ user_id: _user_id, _id: _id });
	if (!result) return null;
	const note: DBNote = {
		_id: result._id?.toString(),
		user_id: result.user_id.toString(),
		title: result.title,
		description: result.description,
		tags: result.tags,
		content: result.content,
		createdAt: result.createdAt,
		updatedAt: result.updatedAt
	};
	return note;
};

const updateNote = async (user_id: string, id: string, note: NoteUpdate) => {
	if (!(await getNote(user_id, id))) return null;
	const _user_id = new ObjectId(user_id);
	const _id = new ObjectId(id);
	const db = await clientPromise;
	const collection = db.db('notestar').collection<Note>('notes');
	const result = await collection.updateOne(
		{ user_id: _user_id, _id: _id },
		{ $set: { ...note, updatedAt: new Date() } }
	);
	return result;
};

const deleteNote = async (user_id: string, id: string) => {
	if (!(await getNote(user_id, id))) return null;
	const _user_id = new ObjectId(user_id);
	const _id = new ObjectId(id);
	const db = await clientPromise;
	const collection = db.db('notestar').collection<Note>('notes');
	const result = await collection.deleteOne({ user_id: _user_id, _id: _id });
	return result;
};

export { createNote, deleteNote, getNote, getNotes, updateNote };
