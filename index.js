const express = require('express');
const students = require('./students');
const app = express()
const port = 3000
app.use(express.json())

app.get('/', (req, res) => {
    res.json({message:"Api is working"})
  })

  //Get All Records Api
  app.get('/api/students', (req, res) => {
    res.json(students);
  })

//Create Record Api

  app.post('/api/students', (req, res) => {
    if(!req.body.last_name)
    {
      res.status(400);
     return res.json({error:"Last name is required"});
    }
    const user={
      id:students.length+1,
      first_name:req.body.first_name,
      last_name:req.body.last_name
    }
    students.push(user);
    res.json(students);
  })

  //Update Record By Id
  app.put('/api/students/:id', (req, res) => {
   let id=req.params.id
   let first_name=req.body.first_name
   let last_name=req.body.last_name

   let index=students.findIndex((student)=>
   {
       return (student.id==Number.parseInt(id))
   })
   if(index>0)
   {
      let std=students[index]
      std.first_name=first_name
      std.last_name=last_name
      res.json(std)
   }
   else{
    res.status(404)
    res.end()
   }
  })

//Delete Records By Id 

app.delete('/api/students/:id', (req, res) => {
  let id=req.params.id
  let index=students.findIndex((student)=>
  {
      return (student.id==Number.parseInt(id))
  })
  if(index>0)
  {
     let std=students[index]
    students.splice(index, 1)
     res.json(std)
  }
  else{
   res.status(404)
  }
 })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})