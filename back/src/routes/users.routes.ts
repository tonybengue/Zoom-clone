import { Request, Response, Router } from 'express';
import { UserNotFoundError } from '../controllers/errors/userNotFound';
import { createUser, getUser, getUsers, updateUser } from '../controllers/users.controllers';

const router = Router();

// GET users
router.get('/', (req : Request, res : Response) => {
  const users = getUsers();

  res.send(users);
})

// GET an user by it's id
router.get('/:userId', (req : Request, res : Response) => {
  const id = parseInt(req.params["userId"]);
  const user = getUser(id);

  if(!user){
    return res.status(400).send("User not found");
  }
  res.send(user);
})

// POST an user
router.post('/', (req : Request, res : Response) => {
  const { firstName, lastName, email } = req.body;

  if(!firstName || !lastName || !email){
    return res.status(400).send("Please provide a firstname, lastname and email");
  }
  createUser(firstName, lastName, email);
  
  res.status(200).send('User created');
})

// UPDATE an user
router.patch('/:userId', (req: Request, res: Response) => {
  const id = parseInt(req.params["userId"]);
  const { firstName, lastName, email } = req.body;

  try {
    updateUser(id, firstName, lastName, email);
  } catch(err) {
    if(err instanceof UserNotFoundError){
      res.status(404).send("User not found");
    } else {
      throw err;
    }
  }
})

export default router; 