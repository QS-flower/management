const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 模拟用户数据库
const users = [
  { id: 1, username: '2021080911032', password: 'Q520S1314' }
];
const testdata1=[
  {
    value: 'Option1-1',
    label: '第一次月考',
  },
  {
    value: 'Option1-2',
    label: '第二次月考',
  },
  {
    value: 'Option1-3',
    label: '第三次月考',
  },
  {
    value: 'Option1-4',
    label: '期中考试',
  },
  {
    value: 'Option1-5',
    label: '期末考试',
  },
]
const testdata2=[
  {
    value: 'Option2-1',
    label: '语文',
  },
  {
    value: 'Option2-2',
    label: '数学',
  },
  {
    value: 'Option2-3',
    label: '英语',
  },
  {
    value: 'Option2-4',
    label: '物理',
  },
  {
    value: 'Option2-5',
    label: '历史',
  },
]

const testdata3=[
  {
    subject: '数学',
    name: '李哲',
    score: 150,
    rank:'1/1236',
},
{
  subject: '数学',
  name: '李哲',
  score: 150,
  rank:'1/1236',
},
{
  subject: '数学',
  name: '李哲',
  score: 150,
  rank:'1/1236',
},
{
  subject: '数学',
  name: '李哲',
  score: 150,
  rank:'1/1236',
},
{
  subject: '数学',
  name: '李哲',
  score: 150,
  rank:'1/1236',
},
{
  subject: '数学',
  name: '李哲',
  score: 150,
  rank:'1/1236',
},
{
  subject: '数学',
  name: '李哲',
  score: 150,
  rank:'1/1236',
},
{
  subject: '数学',
  name: '李哲',
  score: 150,
  rank:'1/1236',
},
]
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
  }
));
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username + password);

  // 在实际应用中，这里应该查询真实的用户数据库
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    return res.status(200).json({ status: 'success', message: 'Login successful',token:'123456789' });
  } else {
    return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
  }
});
app.post('/api/exam_course', (req, res) => {
  const { exam, course } = req.body;
  console.log(exam + ' ' + course);
  return res.json(testdata3);
})
app.get('/api/exam', (req, res) => {
  return res.json(testdata1)
})
app.get('/api/course', (req, res) => {
  return res.json(testdata2)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
