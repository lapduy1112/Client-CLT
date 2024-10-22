export type Actions = 'search' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = 'user' | 'route' | 'permission' | 'role' | 'profile';
export type Abilities = { action: Actions; subject: Subjects };
