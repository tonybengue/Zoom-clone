import { Request, Response, Router } from 'express';
import { createUser, getUser } from '../controllers/users.controllers';

const router = Router();

// GET an user
router.get('/:userId', (req : Request, res : Response) => {
  const id = parseInt(req.params["userId"]);
  const user = getUser(id);

  res.send(user);
})

// POST an user
router.post('/', (req : Request, res : Response) => {
  const { firstName, lastName, email } = req.body;

  if(!firstName || !lastName || !email){
    return res.status(400).send("Please provide a firstname, lastname and email");
  }
  createUser(firstName, lastName, email);
  
  res.send('User created');
})

export default router; 