// zenClassDB Setup and Queries

// 1. Switch to the zenClassDB database (or create it if it doesn't exist)
use zenClassDB

// 2. Insert user data into the 'users' collection
db.users.insertMany([
  { user_id: 1, name: "Alice", email: "alice@example.com", codekata_solved: 20 },
  { user_id: 2, name: "Bob", email: "bob@example.com", codekata_solved: 15 },
  { user_id: 3, name: "Charlie", email: "charlie@example.com", codekata_solved: 25 },
  { user_id: 4, name: "Diana", email: "diana@example.com", codekata_solved: 5 },
  { user_id: 5, name: "Ethan", email: "ethan@example.com", codekata_solved: 30 }
])

// 3. Insert problem data into the 'codekata' collection
db.codekata.insertMany([
  { problem_id: 1, title: "Problem A", difficulty: "Easy", solved_by: [1, 2] },
  { problem_id: 2, title: "Problem B", difficulty: "Medium", solved_by: [1, 3, 4] },
  { problem_id: 3, title: "Problem C", difficulty: "Hard", solved_by: [2, 3] },
  { problem_id: 4, title: "Problem D", difficulty: "Easy", solved_by: [5] },
  { problem_id: 5, title: "Problem E", difficulty: "Medium", solved_by: [1, 3, 5] }
])

// 4. Insert attendance data into the 'attendance' collection
db.attendance.insertMany([
  { user_id: 1, date: "2020-10-01", status: "Present" },
  { user_id: 2, date: "2020-10-01", status: "Absent" },
  { user_id: 3, date: "2020-10-02", status: "Present" },
  { user_id: 4, date: "2020-10-03", status: "Absent" },
  { user_id: 5, date: "2020-10-04", status: "Present" }
])

// 5. Insert topic data into the 'topics' collection
db.topics.insertMany([
  { topic_id: 1, name: "JavaScript Basics", date: "2020-10-01" },
  { topic_id: 2, name: "React Introduction", date: "2020-10-05" },
  { topic_id: 3, name: "Node.js Fundamentals", date: "2020-10-10" },
  { topic_id: 4, name: "Express.js", date: "2020-10-15" },
  { topic_id: 5, name: "MongoDB", date: "2020-10-20" }
])

// 6. Insert task data into the 'tasks' collection
db.tasks.insertMany([
  { task_id: 1, title: "Build a To-Do App", due_date: "2020-10-10", submitted: true },
  { task_id: 2, title: "Create a Blog", due_date: "2020-10-15", submitted: false },
  { task_id: 3, title: "Design a Landing Page", due_date: "2020-10-20", submitted: false },
  { task_id: 4, title: "API Integration", due_date: "2020-10-25", submitted: true },
  { task_id: 5, title: "Final Project", due_date: "2020-10-31", submitted: false }
])

// 7. Insert company drive data into the 'company_drives' collection
db.company_drives.insertMany([
  { drive_id: 1, company_name: "TechCorp", date: "2020-10-16", participants: [1, 2] },
  { drive_id: 2, company_name: "InnovateX", date: "2020-10-20", participants: [3, 4, 5] },
  { drive_id: 3, company_name: "DevSolutions", date: "2020-10-25", participants: [1, 5] },
  { drive_id: 4, company_name: "Webify", date: "2020-10-18", participants: [2, 3] },
  { drive_id: 5, company_name: "CodeCrafters", date: "2020-10-30", participants: [4] }
])

// 8. Insert mentor data into the 'mentors' collection
db.mentors.insertMany([
  { mentor_id: 1, name: "Mentor A", mentees_count: 20 },
  { mentor_id: 2, name: "Mentor B", mentees_count: 10 },
  { mentor_id: 3, name: "Mentor C", mentees_count: 15 },
  { mentor_id: 4, name: "Mentor D", mentees_count: 25 },
  { mentor_id: 5, name: "Mentor E", mentees_count: 5 }
])

// 9. Run MongoDB queries

// Query 1: Find all the topics and tasks taught in October
db.topics.find({ date: { $gte: "2020-10-01", $lte: "2020-10-31" } })
db.tasks.find({ due_date: { $gte: "2020-10-01", $lte: "2020-10-31" } })

// Query 2: Find all the company drives between 15 Oct 2020 and 31 Oct 2020
db.company_drives.find({ date: { $gte: "2020-10-15", $lte: "2020-10-31" } })

// Query 3: Find all company drives and students who appeared for placements
db.company_drives.find().forEach(drive => {
  print(`Drive: ${drive.company_name}, Participants: ${drive.participants}`);
})

// Query 4: Find the number of problems solved by each user in codekata
db.users.find({}, { name: 1, codekata_solved: 1 })

// Query 5: Find all mentors with more than 15 mentees
db.mentors.find({ mentees_count: { $gt: 15 } })

// Query 6: Find number of users who are absent and tasks not submitted between 15 Oct 2020 and 31 Oct 2020
db.attendance.aggregate([
  {
    $match: {
      status: "Absent",
      date: { $gte: "2020-10-15", $lte: "2020-10-31" }
    }
  },
  {
    $lookup: {
      from: "tasks",
      localField: "user_id",
      foreignField: "user_id",
      as: "task_status"
    }
  },
  {
    $match: {
      "task_status.submitted": false
    }
  }
])
