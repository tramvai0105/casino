import { Account, Session, User } from "./types";
import fs from 'fs';

export default function readDb(){
    let authdb : {users: User[], sessions: Session[], accounts: Account[]} = 
    JSON.parse(fs.readFileSync(process.cwd() + "/app/lib/authdb.json", 'utf8'));
    return authdb
  }