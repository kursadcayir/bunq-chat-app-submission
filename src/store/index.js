// import create from 'zustand'

// export const useStore = create(set => ({
//   user: null,
//   users: [],
//   setUsers: (users) => set({ users }),
//   setUser: (user) => set({ user })
// }))



import create from 'zustand'


delete localStorage['user'];
delete localStorage['conversationid'];
delete localStorage['isConversationListFetchable'];

let user = null;
try {
  user = localStorage['user'] ? JSON.parse(localStorage['user']) : null;
} catch (e) { console.log(e) }

let id = 0;
try {
  id = localStorage['conversationid'] ? JSON.parse(localStorage['conversationid']) : 0;
} catch (e) { id = 0; console.log(e) }


let isConversationListFetchable = true;
try {
  isConversationListFetchable = localStorage['isConversationListFetchable'] ? JSON.parse(localStorage['isConversationListFetchable']) : true;
} catch (e) { isConversationListFetchable = true; console.log(e) }



export const useStore = create(set => ({
  user: user,
  users: [],
  setUsers: (users) => set({ users }),
  setUser: (user) => set(() => {
    localStorage['user'] = JSON.stringify(user);
    return { user }
  }),

  conversationid: { conversationid: id },
  setConversationid: (conversationid) => set(() => {
    localStorage['conversationid'] = JSON.stringify(conversationid);
    return conversationid
  }),
  conversationListFetchFlag : { conversationListFetchFlag: isConversationListFetchable },
  setconversationListFetchFlag: (conversationListFetchFlag) => set(() => {
    localStorage['isConversationListFetchable'] = JSON.stringify(conversationListFetchFlag);
    return  conversationListFetchFlag 
  })
}
))

