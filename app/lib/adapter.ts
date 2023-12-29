import type { Adapter, AdapterSession, AdapterAccount, AdapterUser } from "@auth/core/adapters"
import fs from 'fs';
import uniqid from "uniqid"

interface UserWithId extends AdapterUser{
  user_id: string,
}

export default function CasinoAdapter(): Adapter {

  function readDb(){
    let authdb : {users: AdapterUser[], sessions: AdapterSession[], accounts: AdapterAccount[]} = 
    JSON.parse(fs.readFileSync(process.cwd() + "/app/lib/authdb.json", 'utf8'));
    return authdb
  }

  function writeDb(authdb : {users: AdapterUser[], sessions: AdapterSession[], accounts: AdapterAccount[]}){
    fs.writeFileSync(process.cwd() + "/app/lib/authdb.json", JSON.stringify(authdb))
  }

  return {
    async createUser(user: AdapterUser){
      let authdb = readDb()
      // if(authdb.users.some(us=>us.id == user.user_id)){
      //   return user
      // }
      if(user.name && user.image){
          authdb.users.push(user);
          writeDb(authdb);
      }
      return user;
    },
    async createSession(session: AdapterSession){
      let authdb = readDb()
      authdb.sessions.push(session);
      writeDb(authdb);
      return session;
    },
    async getUser(id) {
      let authdb = readDb()
      let user = authdb.users.filter(us=>us.id == id)[0];
      return user
    },
    async getUserByEmail(email) {
      let authdb = readDb()
      let user = authdb.users.filter(us=>us.email == email)[0];
      return user
    },
    async getUserByAccount({ providerAccountId, provider }) {
      let authdb = readDb()
      let user = authdb.users.filter(us=>us.id == providerAccountId)[0];
      return user
    },
    async updateUser(user: AdapterUser) {
      let authdb = readDb()
      authdb.users = authdb.users.map(_user=>{
        if(user.id == _user.id){
          return user;
        }else{
          return _user;
        }
      })
      writeDb(authdb)
      return user
    },
    async deleteUser(userId) {
      let authdb = readDb()
      authdb.users = authdb.users.filter(_user=> _user.id != userId)
      writeDb(authdb)
    },
    async linkAccount(account: AdapterAccount) {
      let authdb = readDb()
      let id = uniqid()
      if(authdb.accounts.some(_acc=>_acc.userId == account.user_id?.toString())){
        return
      }
      if(account.user_id){
        let acc: AdapterAccount = {
          id: account.user_id?.toString(),
          userId: account.user_id.toString(),
          name: id,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at,
          tokenType: account.token_type,
          scope: account.scope,
          idToken: account.id_token,
          sessionState: "",
        } 
        authdb.accounts.push(acc);
      }
      
      writeDb(authdb);
      return
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return
    },
    async getSessionAndUser(sessionToken) {
      let authdb = readDb()
      let session = authdb.sessions.filter(ses=>ses.sessionToken == sessionToken)[0];
      if(!session){
        return null
      }
      let user = authdb.users.filter(us=>us.id == session.userId)[0];
      return {user: user, session: session};
    },
    async updateSession(session: AdapterSession) {
      let authdb = readDb()
      authdb.sessions = authdb.sessions.map(_ses=>{
        if(session.sessionToken == _ses.sessionToken){
          return session;
        }else{
          return _ses;
        }
      })
      writeDb(authdb)
      return session
    },
    // async deleteSession(sessionToken) {
    //   return
    // },
    // async createVerificationToken({ identifier, expires, token }) {
    //   return
    // },
    // async useVerificationToken({ identifier, token }) {
    //   return
    // },
  }
}

